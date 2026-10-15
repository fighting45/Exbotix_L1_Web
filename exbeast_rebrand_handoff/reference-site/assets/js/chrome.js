/* ============================================================
   EXBEAST — shared chrome (nav + footer + svg defs)
   Injected so all pages stay consistent. Runs immediately.
   ============================================================ */
(function () {
  "use strict";

  var DEFS =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    '<linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C8F23A"/><stop offset="1" stop-color="#8FCC00"/></linearGradient>' +
    '</defs></svg>';

  var MARK = '<img class="brand-mark" src="assets/img/exbeast-logo.png" alt="ExBeast" />';

  // Canonical explorer URL (mainnet block explorer)
  var EXPLORER_MAIN = "https://scan.exbotix.net/";
  // Canonical exchange URL (LBank EXBT/USDT spot)
  var LBANK_TRADE = "https://www.lbank.com/trade/exbt_usdt";

  // Dropdown groups (ethy-style condensed nav)
  var GROUPS = [
    ["Network", [["tokenomics.html","Tokenomics"],[LBANK_TRADE,"Buy EXBT · LBank"],["staking.html","Staking"],["vesting.html","Vesting"],["bridge.html","Bridge"],[EXPLORER_MAIN,"Block Explorer"]]],
    ["Build", [["docs.html","Developer Docs"],["ecosystem.html","Ecosystem"],["community.html","Grants"]]],
    ["Community", [["mission.html","Mission & Vision"],["team.html","Team"],["mission.html","Roadmap"],["community.html","Blog"]]],
  ];
  var CARET = '<svg class="caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg>';
  function isExt(href) { return /^https?:/.test(href); }
  var navGroups = GROUPS.map(function (g) {
    var items = g[1].map(function (l) {
      var ext = isExt(l[0]) ? ' target="_blank" rel="noopener"' : '';
      return '<a href="' + l[0] + '"' + ext + '>' + l[1] + '</a>';
    }).join("");
    return '<div class="nav-item"><button class="nav-trigger" type="button">' + g[0] + CARET + '</button><div class="nav-menu">' + items + '</div></div>';
  }).join("");
  var navLinks = navGroups + '<a class="nav-link tok" href="tokenomics.html">$EXBT</a>';

  // Block-explorer icon (magnifier over a block) — replaces the old Telegram icon
  var EXPLORE = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>';

  var NAV =
    '<nav class="nav">' +
    '<a class="brand" href="index.html" aria-label="ExBeast home">' + MARK + '</a>' +
    '<div class="nav-links">' + navLinks + '</div>' +
    '<div class="nav-cta">' +
    '<a class="nav-icon" href="' + EXPLORER_MAIN + '" target="_blank" rel="noopener" aria-label="Block Explorer" title="Mainnet Block Explorer">' + EXPLORE + '</a>' +
    '<button class="btn btn-primary btn-sm wallet-btn" data-wallet><span>Connect Wallet</span></button>' +
    '<button class="nav-toggle" aria-label="Menu"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>' +
    '</div></nav>';

  var soc =
    '<div class="socials" style="margin-top:22px">' +
    '<a href="community.html" aria-label="X"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h3l-7 8 8 12h-6l-5-7-5 7H2l8-9L2 2h7l4 6 5-6Z"/></svg></a>' +
    '<a href="community.html" aria-label="Discord"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 5a18 18 0 0 0-4-1l-.3.6A14 14 0 0 1 19 6c-2-1-4-1.5-7-1.5S7 5 5 6a14 14 0 0 1 3.3-1.4L8 4a18 18 0 0 0-4 1C2 8 1 12 1 16a13 13 0 0 0 5 2l1-2-2-1 .5-.4a9 9 0 0 0 11 0L17 15l-2 1 1 2a13 13 0 0 0 5-2c0-4-1-8-1-11ZM9 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/></svg></a>' +
    '<a href="community.html" aria-label="Telegram"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 3 2 11l5 2 2 6 3-4 5 4 5-16ZM9 13l8-5-6 6-2 4-.5-3.5Z"/></svg></a>' +
    '<a href="docs.html" aria-label="GitHub"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3 19.5c.5 0 .7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-1-.6 0-.6 0-.6 1 0 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9 0-.7.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7 0-.3-.4-1.3.2-2.7 0 0 .8-.2 2.7 1a9 9 0 0 1 5 0c1.9-1.2 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .3.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/></svg></a>' +
    '</div>';

  var FOOTER =
    '<footer class="footer"><div class="wrap"><div class="footer-grid">' +
    '<div><a class="brand" href="index.html" style="font-size:22px">' + MARK + '</a>' +
    '<p class="text-dim" style="margin-top:16px;max-width:34ch;font-size:14.5px">A diverse Layer 1 ecosystem converging AI, CEX, DeFi and SocialFi. For the community, by the community.</p>' + soc + '</div>' +
    '<div><h5>Network</h5><div class="footer-links"><a href="tokenomics.html">Tokenomics</a><a href="' + LBANK_TRADE + '" target="_blank" rel="noopener">Buy EXBT · LBank</a><a href="staking.html">Staking</a><a href="vesting.html">Vesting</a><a href="bridge.html">Bridge</a><a href="' + EXPLORER_MAIN + '" target="_blank" rel="noopener">Block Explorer</a></div></div>' +
    '<div><h5>Build</h5><div class="footer-links"><a href="docs.html">Documentation</a><a href="docs.html">RPC &amp; Faucet</a><a href="ecosystem.html">Ecosystem</a><a href="community.html">Grants</a></div></div>' +
    '<div><h5>Community</h5><div class="footer-links"><a href="mission.html">Mission &amp; Vision</a><a href="team.html">Team</a><a href="mission.html">Roadmap</a><a href="community.html">Blog</a></div></div>' +
    '</div><div class="footer-bottom"><span>© 2026 ExBeast. Testnet live — figures illustrative.</span><span class="mono">Mainnet · ID 11311 &nbsp;·&nbsp; Testnet · ID 11211</span></div></div></footer>';

  // Inject defs + nav at top of body, footer at end (before scripts)
  function inject() {
    var slot = document.getElementById("chrome-nav");
    document.body.insertAdjacentHTML("afterbegin", DEFS + NAV);
    var footMount = document.getElementById("chrome-footer");
    if (footMount) footMount.outerHTML = FOOTER;
    else document.body.insertAdjacentHTML("beforeend", FOOTER);
  }

  if (document.body) inject();
  else document.addEventListener("DOMContentLoaded", inject);
})();
