/* ============================================================
   EXBEAST — Vesting dApp logic
   Reads contract state + lets beneficiaries claim.
   Admin panel (addVesting / pause / unpause) shown to admin only.
   Uses ethers v5 (window.ethers). Native EXBT (18 decimals).
   ============================================================ */
(function () {
  "use strict";

  /* ---- Contract ABI (provided) ---- */
  var ABI = [
    { "inputs": [], "stateMutability": "payable", "type": "constructor" },
    { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "beneficiary", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Claimed", "type": "event" },
    { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "EXBTReceived", "type": "event" },
    { "anonymous": false, "inputs": [], "name": "Paused", "type": "event" },
    { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "beneficiary", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "TGEReleased", "type": "event" },
    { "anonymous": false, "inputs": [], "name": "Unpaused", "type": "event" },
    { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "beneficiary", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "VestingAdded", "type": "event" },
    { "stateMutability": "payable", "type": "fallback" },
    { "inputs": [], "name": "PERIOD", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [ { "internalType": "address", "name": "beneficiary", "type": "address" }, { "internalType": "uint256", "name": "allocation", "type": "uint256" }, { "internalType": "uint256", "name": "tgePercent", "type": "uint256" }, { "internalType": "uint256", "name": "cliffPeriods", "type": "uint256" }, { "internalType": "uint256", "name": "vestingPeriods", "type": "uint256" } ], "name": "addVesting", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "admin", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "beneficiaries", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "contractBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "getBeneficiaries", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [], "name": "paused", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "releasable", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "vestedAmount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "vestings", "outputs": [ { "internalType": "uint256", "name": "totalAllocation", "type": "uint256" }, { "internalType": "uint256", "name": "released", "type": "uint256" }, { "internalType": "uint256", "name": "tgePercent", "type": "uint256" }, { "internalType": "uint256", "name": "cliffPeriods", "type": "uint256" }, { "internalType": "uint256", "name": "vestingPeriods", "type": "uint256" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "bool", "name": "exists", "type": "bool" } ], "stateMutability": "view", "type": "function" },
    { "stateMutability": "payable", "type": "receive" }
  ];

  /* ---- Networks ---- */
  var NETS = {
    11311: { name: "Exbotix Mainnet", short: "Mainnet", rpc: "https://rpc.exbotix.net/", explorer: "https://scan.exbotix.net/", hex: "0x2c2f" },
    11211: { name: "Exbotix Testnet", short: "Testnet", rpc: "http://testnet.rpc.exbotix.net", explorer: "http://testnet.explorer.exbotix.net", hex: "0x2bcb" }
  };
  var LS_ADDR = "exbt_vest_addr", LS_NET = "exbt_vest_net";

  var addr = localStorage.getItem(LS_ADDR) || "";
  var netId = Number(localStorage.getItem(LS_NET)) || 11311;

  var provider = null, signer = null, account = null, chainId = null;

  var E = window.ethers;
  var ZERO = "0x0000000000000000000000000000000000000000";
  function $(id) { return document.getElementById(id); }
  function toast(t, m) { if (window.toast) window.toast(t, m || ""); }
  function sh(a) { return a ? a.slice(0, 6) + "…" + a.slice(-4) : "—"; }
  function isAddr(a) { try { return E.utils.isAddress(a); } catch (e) { return false; } }
  function fmt(bn, dp) {
    if (dp === undefined) dp = 4;
    try { var n = Number(E.utils.formatEther(bn)); return n.toLocaleString(undefined, { maximumFractionDigits: dp }); }
    catch (e) { return "0"; }
  }
  function num(bn) { try { return Number(bn.toString()); } catch (e) { return 0; } }
  function dateStr(sec) {
    if (!sec) return "—";
    var d = new Date(sec * 1000);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }
  function humanPeriod(sec) {
    if (!sec) return "—";
    var d = sec / 86400;
    if (d >= 1) return (Math.round(d * 10) / 10) + " day" + (d >= 2 ? "s" : "");
    var h = sec / 3600;
    if (h >= 1) return (Math.round(h * 10) / 10) + " hours";
    return Math.round(sec / 60) + " min";
  }
  function explorerAddr(a) { return (NETS[netId] ? NETS[netId].explorer : "#") + "address/" + a; }

  /* ---- Providers / contract ---- */
  function readProvider() {
    if (provider) return provider;
    try { return new E.providers.JsonRpcProvider(NETS[netId].rpc); } catch (e) { return null; }
  }
  function readContract() {
    var p = readProvider();
    if (!p || !isAddr(addr)) return null;
    return new E.Contract(addr, ABI, p);
  }
  function writeContract() {
    if (!signer || !isAddr(addr)) return null;
    return new E.Contract(addr, ABI, signer);
  }

  /* ---- Wallet ---- */
  async function connect() {
    if (!window.ethereum) {
      toast("No wallet detected", "Install MetaMask to connect on ExBeast " + NETS[netId].short);
      return;
    }
    try {
      provider = new E.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      account = await signer.getAddress();
      var net = await provider.getNetwork();
      chainId = net.chainId;
      window.ethereum.removeAllListeners && window.ethereum.removeAllListeners();
      window.ethereum.on && window.ethereum.on("accountsChanged", function () { location.reload(); });
      window.ethereum.on && window.ethereum.on("chainChanged", function () { location.reload(); });
      toast("Wallet connected", sh(account));
      render();
      refresh();
    } catch (e) { toast("Connection failed", (e && e.message) ? e.message.slice(0, 60) : ""); }
  }

  async function switchNetwork() {
    if (!window.ethereum) return;
    var n = NETS[netId];
    try {
      await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: n.hex }] });
    } catch (e) {
      try {
        await window.ethereum.request({ method: "wallet_addEthereumChain", params: [{
          chainId: n.hex, chainName: n.name,
          nativeCurrency: { name: "Exbotix", symbol: "EXBT", decimals: 18 },
          rpcUrls: [n.rpc], blockExplorerUrls: [n.explorer]
        }]});
      } catch (e2) { toast("Switch failed", ""); }
    }
  }

  /* ---- Render connection / network UI ---- */
  function render() {
    var connected = !!account;
    var wrong = connected && chainId && chainId !== netId;
    $("connectBtn").style.display = connected ? "none" : "";
    $("acctChip").style.display = connected ? "" : "none";
    $("acctChip").innerHTML = '<span class="dot live"></span>' + sh(account);
    $("switchBtn").style.display = wrong ? "" : "none";
    $("netLabel").textContent = NETS[netId].name;
    $("netSel").value = String(netId);
    $("addrInput").value = addr;
    var setEl = $("addrState");
    if (!isAddr(addr)) {
      setEl.textContent = "Not set";
      setEl.className = "vest-addrstate warn";
    } else {
      setEl.innerHTML = '<a href="' + explorerAddr(addr) + '" target="_blank" rel="noopener">' + sh(addr) + ' ↗</a>';
      setEl.className = "vest-addrstate ok";
    }
  }

  /* ---- Refresh all data ---- */
  async function refresh() {
    render();
    await loadPublic();
    await loadAccount();
  }

  async function loadPublic() {
    var c = readContract();
    var ids = ["stBal", "stPeriod", "stStatus", "stBenef"];
    if (!c) {
      ids.forEach(function (i) { $(i).textContent = "—"; });
      if (!isAddr(addr)) { $("cfgRow").classList.add("open"); }
      return;
    }
    try {
      var res = await Promise.all([ c.contractBalance(), c.PERIOD(), c.paused(), c.getBeneficiaries(), c.admin() ]);
      var bal = res[0], period = res[1], isPaused = res[2], bens = res[3], adminAddr = res[4];
      $("stBal").innerHTML = fmt(bal, 2) + ' <span class="u">EXBT</span>';
      $("stPeriod").textContent = humanPeriod(num(period));
      $("stStatus").innerHTML = isPaused
        ? '<span class="vest-pill paused"><span class="dot"></span>Paused</span>'
        : '<span class="vest-pill live"><span class="dot live"></span>Active</span>';
      $("stBenef").textContent = bens.length.toLocaleString();
      window.__period = num(period);
      // admin?
      var amAdmin = account && adminAddr && account.toLowerCase() === adminAddr.toLowerCase();
      $("adminWrap").style.display = amAdmin ? "" : "none";
      $("adminAddr").textContent = sh(adminAddr);
      $("pauseBtn").style.display = isPaused ? "none" : "";
      $("unpauseBtn").style.display = isPaused ? "" : "none";
      if (amAdmin) renderBeneficiaries(c, bens);
    } catch (e) {
      ids.forEach(function (i) { $(i).textContent = "—"; });
    }
  }

  async function renderBeneficiaries(c, bens) {
    var box = $("benList");
    if (!bens.length) { box.innerHTML = '<div class="vest-empty">No beneficiaries yet.</div>'; return; }
    box.innerHTML = '<div class="vest-spin">Loading ' + bens.length + ' beneficiaries…</div>';
    try {
      var rows = await Promise.all(bens.map(function (b) {
        return Promise.all([ c.vestings(b), c.releasable(b) ]).then(function (r) { return { b: b, v: r[0], rel: r[1] }; });
      }));
      box.innerHTML = rows.map(function (r) {
        return '<div class="ben-row"><a class="ben-addr mono" href="' + explorerAddr(r.b) + '" target="_blank" rel="noopener">' + sh(r.b) + '</a>' +
          '<span class="ben-num">' + fmt(r.v.totalAllocation, 0) + '</span>' +
          '<span class="ben-num dim">' + fmt(r.v.released, 0) + '</span>' +
          '<span class="ben-num accent">' + fmt(r.rel, 2) + '</span></div>';
      }).join("");
    } catch (e) { box.innerHTML = '<div class="vest-empty">Could not load beneficiaries.</div>'; }
  }

  async function loadAccount() {
    var gate = $("allocGate"), data = $("allocData"), none = $("allocNone");
    if (!account) { gate.style.display = ""; data.style.display = "none"; none.style.display = "none"; return; }
    gate.style.display = "none";
    var c = readContract();
    if (!c) { none.style.display = ""; data.style.display = "none"; $("noneMsg").textContent = "Set the contract address to view your allocation."; return; }
    try {
      var r = await Promise.all([ c.vestings(account), c.vestedAmount(account), c.releasable(account) ]);
      var v = r[0], vested = r[1], rel = r[2];
      if (!v.exists) { none.style.display = ""; data.style.display = "none"; $("noneMsg").textContent = "No vesting schedule found for " + sh(account) + "."; return; }
      none.style.display = "none"; data.style.display = "";

      var total = v.totalAllocation, released = v.released;
      var totalN = Number(E.utils.formatEther(total));
      var relN = Number(E.utils.formatEther(rel));
      var releasedN = Number(E.utils.formatEther(released));
      var vestedN = Number(E.utils.formatEther(vested));
      var lockedN = Math.max(totalN - vestedN, 0);

      $("claimable").textContent = fmt(rel, 4);
      $("claimBtn").disabled = relN <= 0;
      $("kTotal").textContent = fmt(total, 2);
      $("kReleased").textContent = fmt(released, 2);
      $("kVested").textContent = fmt(vested, 2);
      $("kLocked").textContent = fmt(total.sub(vested), 2);

      // progress segments
      var pClaimed = totalN ? (releasedN / totalN) * 100 : 0;
      var pReleasable = totalN ? (relN / totalN) * 100 : 0;
      $("segClaimed").style.width = pClaimed + "%";
      $("segReleasable").style.width = pReleasable + "%";
      $("pctVested").textContent = (totalN ? Math.round((vestedN / totalN) * 100) : 0) + "%";

      // schedule
      var period = window.__period || num(await c.PERIOD());
      var start = num(v.startTime);
      var cliffP = num(v.cliffPeriods), vestP = num(v.vestingPeriods), tge = num(v.tgePercent);
      var cliffEnd = start + cliffP * period;
      var vestEnd = start + (cliffP + vestP) * period;
      $("sTge").textContent = tge + "%";
      $("sCliff").textContent = cliffP + " × " + humanPeriod(period);
      $("sVest").textContent = vestP + " × " + humanPeriod(period);
      $("sStart").textContent = dateStr(start);
      $("sCliffEnd").textContent = dateStr(cliffEnd);
      $("sFull").textContent = dateStr(vestEnd);

      // next unlock
      var now = Math.floor(Date.now() / 1000);
      var nextEl = $("nextUnlock");
      if (now < cliffEnd) nextEl.textContent = "Cliff ends " + dateStr(cliffEnd);
      else if (now >= vestEnd) nextEl.textContent = "Fully vested";
      else {
        var elapsed = now - start;
        var nextN = Math.ceil(elapsed / period);
        var next = Math.min(start + nextN * period, vestEnd);
        nextEl.textContent = "Next unlock " + dateStr(next);
      }
    } catch (e) {
      none.style.display = ""; data.style.display = "none";
      $("noneMsg").textContent = "Could not read allocation — check the contract address and network.";
    }
  }

  /* ---- Writes ---- */
  async function doClaim() {
    var c = writeContract();
    if (!c) { toast(account ? "Set contract address" : "Connect wallet first", ""); return; }
    var btn = $("claimBtn"); btn.disabled = true; var old = btn.textContent; btn.textContent = "Confirm in wallet…";
    try {
      var tx = await c.claim();
      btn.textContent = "Claiming…";
      toast("Transaction sent", "Waiting for confirmation");
      await tx.wait();
      toast("Claimed", "EXBT released to your wallet");
      refresh();
    } catch (e) { toast("Claim failed", reason(e)); }
    btn.textContent = old; btn.disabled = false;
  }

  async function doPause(pause) {
    var c = writeContract(); if (!c) return;
    try {
      var tx = pause ? await c.pause() : await c.unpause();
      toast("Transaction sent", "");
      await tx.wait();
      toast(pause ? "Contract paused" : "Contract resumed", "");
      refresh();
    } catch (e) { toast("Action failed", reason(e)); }
  }

  async function doAddVesting(ev) {
    ev.preventDefault();
    var c = writeContract();
    if (!c) { toast("Connect wallet first", ""); return; }
    var b = $("avBeneficiary").value.trim();
    if (!isAddr(b)) { toast("Invalid address", ""); return; }
    var allocStr = $("avAllocation").value.trim();
    var tge = $("avTge").value.trim(), cliff = $("avCliff").value.trim(), vest = $("avVesting").value.trim();
    if (!allocStr || tge === "" || cliff === "" || vest === "") { toast("Fill all fields", ""); return; }
    var btn = $("avSubmit"); btn.disabled = true; var old = btn.textContent; btn.textContent = "Confirm in wallet…";
    try {
      var alloc = E.utils.parseEther(allocStr);
      var tx = await c.addVesting(b, alloc, tge, cliff, vest);
      btn.textContent = "Submitting…";
      toast("Transaction sent", "");
      await tx.wait();
      toast("Vesting added", sh(b) + " · " + allocStr + " EXBT");
      $("avForm").reset();
      refresh();
    } catch (e) { toast("addVesting failed", reason(e)); }
    btn.textContent = old; btn.disabled = false;
  }

  function reason(e) {
    if (!e) return "";
    var m = (e.reason || (e.error && e.error.message) || e.message || "").toString();
    return m.replace(/^execution reverted:?/i, "").trim().slice(0, 70);
  }

  /* ---- Config ---- */
  function saveConfig() {
    var a = $("addrInput").value.trim();
    if (a && !isAddr(a)) { toast("Invalid contract address", ""); return; }
    addr = a; localStorage.setItem(LS_ADDR, addr);
    netId = Number($("netSel").value); localStorage.setItem(LS_NET, String(netId));
    provider = null; signer = null; account = null; chainId = null;
    toast("Settings saved", isAddr(addr) ? sh(addr) + " · " + NETS[netId].short : NETS[netId].name);
    $("cfgRow").classList.remove("open");
    refresh();
  }

  /* ---- Init ---- */
  function init() {
    if (!E) { toast("Library failed to load", "ethers.js unavailable"); return; }
    $("connectBtn").addEventListener("click", connect);
    $("switchBtn").addEventListener("click", switchNetwork);
    $("claimBtn").addEventListener("click", doClaim);
    $("pauseBtn").addEventListener("click", function () { doPause(true); });
    $("unpauseBtn").addEventListener("click", function () { doPause(false); });
    $("avForm").addEventListener("submit", doAddVesting);
    $("cfgBtn").addEventListener("click", function () { $("cfgRow").classList.toggle("open"); });
    $("saveCfg").addEventListener("click", saveConfig);
    $("acctChip").addEventListener("click", function () {
      if (account) { navigator.clipboard && navigator.clipboard.writeText(account); toast("Address copied", sh(account)); }
    });
    render();
    refresh();
    // eager reconnect if already authorized
    if (window.ethereum && window.ethereum.selectedAddress) connect();
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
