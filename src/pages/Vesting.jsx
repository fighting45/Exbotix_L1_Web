import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../context/WalletContext';
import Reveal from '../components/common/Reveal';
import vestingAbi from '../contracts/vestingAbi.json';
import { getVestingAddress } from '../contracts/vestingConfig';
import { NETWORKS } from '../utils/constants';

export default function Vesting() {
  const { address, connect, connected } = useWallet();

  // Contract stats
  const [contractBalance, setContractBalance] = useState('—');
  const [period, setPeriod] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [beneficiariesCount, setBeneficiariesCount] = useState('—');
  const [adminAddress, setAdminAddress] = useState(null);

  // User allocation
  const [hasSchedule, setHasSchedule] = useState(false);
  const [allocation, setAllocation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([]);

  const [claimLoading, setClaimLoading] = useState(false);

  const CHAIN_ID = 11211; // Testnet
  const vestingAddress = getVestingAddress(CHAIN_ID);
  const currentNetwork = NETWORKS.testnet;

  // Helper functions
  const formatEther = (value) => {
    try {
      const num = Number(ethers.formatEther(value));
      return num.toLocaleString(undefined, { maximumFractionDigits: 4 });
    } catch {
      return '0';
    }
  };

  const formatEtherShort = (value, decimals = 2) => {
    try {
      const num = Number(ethers.formatEther(value));
      return num.toLocaleString(undefined, { maximumFractionDigits: decimals });
    } catch {
      return '0';
    }
  };

  const shortAddress = (addr) => {
    if (!addr) return '—';
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  };

  const dateStr = (timestamp) => {
    if (!timestamp) return '—';
    const d = new Date(Number(timestamp) * 1000);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const humanPeriod = (seconds) => {
    if (!seconds) return '—';
    const days = Number(seconds) / 86400;
    if (days >= 1) return `${Math.round(days * 10) / 10} day${days >= 2 ? 's' : ''}`;
    const hours = Number(seconds) / 3600;
    if (hours >= 1) return `${Math.round(hours * 10) / 10} hours`;
    return `${Math.round(Number(seconds) / 60)} min`;
  };

  // Get read-only provider
  const getReadProvider = () => {
    return new ethers.JsonRpcProvider(currentNetwork.rpcUrls[0]);
  };

  // Get contract for reading
  const getReadContract = () => {
    const provider = getReadProvider();
    return new ethers.Contract(vestingAddress, vestingAbi, provider);
  };

  // Get contract for writing
  const getWriteContract = async () => {
    if (!window.ethereum) return null;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(vestingAddress, vestingAbi, signer);
  };

  // Load public contract data
  const loadPublicData = async () => {
    try {
      const contract = getReadContract();
      const [balance, periodVal, paused, benefsList, admin] = await Promise.all([
        contract.contractBalance(),
        contract.PERIOD(),
        contract.paused(),
        contract.getBeneficiaries(),
        contract.admin()
      ]);

      setContractBalance(formatEtherShort(balance, 2) + ' EXBT');
      setPeriod(Number(periodVal));
      setIsPaused(paused);
      setBeneficiariesCount(benefsList.length.toLocaleString());
      setAdminAddress(admin);

      // Check if user is admin
      if (address && admin) {
        setIsAdmin(address.toLowerCase() === admin.toLowerCase());
      }

      // Load beneficiaries for admin
      if (address && admin && address.toLowerCase() === admin.toLowerCase()) {
        loadBeneficiaries(contract, benefsList);
      }
    } catch (error) {
      console.error('Error loading public data:', error);
    }
  };

  // Load beneficiaries list (admin only)
  const loadBeneficiaries = async (contract, benefsList) => {
    try {
      const benData = await Promise.all(
        benefsList.map(async (addr) => {
          const [vestData, releasable] = await Promise.all([
            contract.vestings(addr),
            contract.releasable(addr)
          ]);
          return {
            address: addr,
            totalAllocation: vestData.totalAllocation,
            released: vestData.released,
            releasable
          };
        })
      );
      setBeneficiaries(benData);
    } catch (error) {
      console.error('Error loading beneficiaries:', error);
    }
  };

  // Load user allocation
  const loadUserAllocation = async () => {
    if (!address) {
      setLoading(false);
      setHasSchedule(false);
      return;
    }

    try {
      const contract = getReadContract();
      const [vestData, vestedAmount, releasable] = await Promise.all([
        contract.vestings(address),
        contract.vestedAmount(address),
        contract.releasable(address)
      ]);

      if (!vestData.exists) {
        setHasSchedule(false);
        setLoading(false);
        return;
      }

      // Calculate values
      const totalAllocation = vestData.totalAllocation;
      const released = vestData.released;
      const start = Number(vestData.startTime);
      const cliffPeriods = Number(vestData.cliffPeriods);
      const vestingPeriods = Number(vestData.vestingPeriods);
      const tgePercent = Number(vestData.tgePercent);

      const periodSeconds = period || Number(await contract.PERIOD());
      const cliffEnd = start + cliffPeriods * periodSeconds;
      const vestEnd = start + (cliffPeriods + vestingPeriods) * periodSeconds;

      // Calculate percentages
      const totalN = Number(ethers.formatEther(totalAllocation));
      const releasedN = Number(ethers.formatEther(released));
      const releasableN = Number(ethers.formatEther(releasable));
      const vestedN = Number(ethers.formatEther(vestedAmount));
      const lockedN = Math.max(totalN - vestedN, 0);

      const claimedPct = totalN ? (releasedN / totalN) * 100 : 0;
      const releasablePct = totalN ? (releasableN / totalN) * 100 : 0;
      const vestedPct = totalN ? Math.round((vestedN / totalN) * 100) : 0;

      // Next unlock
      const now = Math.floor(Date.now() / 1000);
      let nextUnlock = '—';
      if (now < cliffEnd) {
        nextUnlock = `Cliff ends ${dateStr(cliffEnd)}`;
      } else if (now >= vestEnd) {
        nextUnlock = 'Fully vested';
      } else {
        const elapsed = now - start;
        const nextPeriod = Math.ceil(elapsed / periodSeconds);
        const next = Math.min(start + nextPeriod * periodSeconds, vestEnd);
        nextUnlock = `Next unlock ${dateStr(next)}`;
      }

      setAllocation({
        totalAllocation,
        released,
        releasable,
        vestedAmount,
        tgePercent,
        cliffPeriods,
        vestingPeriods,
        start,
        cliffEnd,
        vestEnd,
        periodSeconds,
        claimedPct,
        releasablePct,
        vestedPct,
        releasableN,
        lockedN: totalAllocation - vestedAmount,
        nextUnlock
      });

      setHasSchedule(true);
      setLoading(false);
    } catch (error) {
      console.error('Error loading allocation:', error);
      setHasSchedule(false);
      setLoading(false);
    }
  };

  // Claim tokens
  const handleClaim = async () => {
    if (!address || !allocation || allocation.releasableN <= 0) return;

    setClaimLoading(true);
    try {
      const contract = await getWriteContract();
      const tx = await contract.claim();

      window.toast?.('Transaction sent', 'Waiting for confirmation');
      await tx.wait();

      window.toast?.('Claimed', 'EXBT released to your wallet');

      // Refresh data
      await loadPublicData();
      await loadUserAllocation();
    } catch (error) {
      console.error('Claim error:', error);
      const reason = error.reason || error.message || 'Transaction failed';
      window.toast?.('Claim failed', reason);
    } finally {
      setClaimLoading(false);
    }
  };

  // Add vesting (admin only)
  const handleAddVesting = async (e) => {
    e.preventDefault();
    const form = e.target;
    const beneficiary = form.beneficiary.value.trim();
    const allocationStr = form.allocation.value.trim();
    const tge = form.tge.value.trim();
    const cliff = form.cliff.value.trim();
    const vesting = form.vesting.value.trim();

    if (!ethers.isAddress(beneficiary)) {
      window.toast?.('Invalid address', '');
      return;
    }

    if (!allocationStr || tge === '' || cliff === '' || vesting === '') {
      window.toast?.('Fill all fields', '');
      return;
    }

    try {
      const contract = await getWriteContract();
      const allocationWei = ethers.parseEther(allocationStr);
      const tx = await contract.addVesting(beneficiary, allocationWei, tge, cliff, vesting);

      window.toast?.('Transaction sent', '');
      await tx.wait();

      window.toast?.('Vesting added', `${shortAddress(beneficiary)} · ${allocationStr} EXBT`);

      form.reset();
      await loadPublicData();
    } catch (error) {
      console.error('Add vesting error:', error);
      const reason = error.reason || error.message || 'Transaction failed';
      window.toast?.('addVesting failed', reason);
    }
  };

  // Pause/unpause
  const handlePause = async (pause) => {
    try {
      const contract = await getWriteContract();
      const tx = pause ? await contract.pause() : await contract.unpause();

      window.toast?.('Transaction sent', '');
      await tx.wait();

      window.toast?.(pause ? 'Contract paused' : 'Contract resumed', '');
      await loadPublicData();
    } catch (error) {
      console.error('Pause error:', error);
      const reason = error.reason || error.message || 'Transaction failed';
      window.toast?.('Action failed', reason);
    }
  };

  // Effects
  useEffect(() => {
    loadPublicData();
    const interval = setInterval(loadPublicData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [address]);

  useEffect(() => {
    loadUserAllocation();
  }, [address, period]);

  return (
    <>
      <style>{vestingStyles}</style>

      <header className="page-hero">
        <div className="wrap">
          <Reveal><span className="eyebrow">Token Vesting</span></Reveal>
          <div className="page-hero-row" style={{ marginTop: '14px' }}>
            <Reveal delay={1}>
              <h1>Your <span className="gradtext">EXBT</span>,<br/>unlocked on schedule.</h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="lead" style={{ maxWidth: '44ch' }}>
                Track your allocation, watch it vest period by period, and claim what's released — straight from the on-chain vesting contract.
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      {/* CONNECT BAR */}
      <section className="wrap" style={{ marginTop: '8px' }}>
        <Reveal>
          <div className="vest-bar">
            <div className="vest-bar-left">
              <span className="vest-net">
                <span className="dot test live"></span>
                <span>{currentNetwork.chainName}</span>
              </span>
              <span className="vest-addrstate ok">
                <a href={`${currentNetwork.blockExplorerUrls[0]}address/${vestingAddress}`} target="_blank" rel="noopener">
                  {shortAddress(vestingAddress)} ↗
                </a>
              </span>
            </div>
            <div className="vest-bar-right">
              {connected ? (
                <button className="chip" type="button">
                  <span className="dot live"></span>{shortAddress(address)}
                </button>
              ) : (
                <button className="btn btn-primary btn-sm" onClick={connect}>Connect Wallet</button>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* CONTRACT STATS */}
      <section className="wrap" style={{ marginTop: '26px' }}>
        <Reveal>
          <div className="vest-stats">
            <div className="vest-stat">
              <div className="vs-k">Contract Balance</div>
              <div className="vs-v">{contractBalance}</div>
            </div>
            <div className="vest-stat">
              <div className="vs-k">Vesting Period</div>
              <div className="vs-v">{humanPeriod(period)}</div>
            </div>
            <div className="vest-stat">
              <div className="vs-k">Status</div>
              <div className="vs-v">
                {isPaused ? (
                  <span className="vest-pill paused"><span className="dot"></span>Paused</span>
                ) : (
                  <span className="vest-pill live"><span className="dot live"></span>Active</span>
                )}
              </div>
            </div>
            <div className="vest-stat">
              <div className="vs-k">Beneficiaries</div>
              <div className="vs-v">{beneficiariesCount}</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ALLOCATION */}
      <section className="section-pad" style={{ padding: '46px 0 0' }}>
        <div className="wrap">
          <div className="vest-cols">
            {/* Claimable */}
            <Reveal>
              <div className="card vest-claim">
                <div className="corner"></div>
                <div className="vc-head">
                  <span className="eyebrow" style={{ color: 'var(--accent-3)' }}>Claimable now</span>
                  <span className="chip mono">{hasSchedule && allocation ? allocation.nextUnlock : '—'}</span>
                </div>

                {!connected ? (
                  <div className="vest-gate">
                    <p className="text-dim">Connect your wallet to view your EXBT allocation and claim released tokens.</p>
                    <button className="btn btn-primary" onClick={connect}>Connect Wallet</button>
                  </div>
                ) : !hasSchedule ? (
                  <div className="vest-gate">
                    <div className="vest-none-ic">∅</div>
                    <p className="text-dim">No vesting schedule found for {shortAddress(address)}.</p>
                  </div>
                ) : allocation ? (
                  <div>
                    <div className="vc-amount">
                      <span className="num gradtext">{formatEther(allocation.releasable)}</span>
                      <span className="unit">EXBT</span>
                    </div>
                    <button
                      className="btn btn-primary vc-claim-btn"
                      onClick={handleClaim}
                      disabled={allocation.releasableN <= 0 || claimLoading}
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/>
                      </svg>
                      {claimLoading ? 'Claiming…' : 'Claim EXBT'}
                    </button>

                    <div className="vc-progress">
                      <div className="vcp-bar">
                        <span className="seg claimed" style={{ width: `${allocation.claimedPct}%` }}></span>
                        <span className="seg releasable" style={{ width: `${allocation.releasablePct}%` }}></span>
                      </div>
                      <div className="vcp-legend">
                        <span><i className="lg claimed"></i>Claimed</span>
                        <span><i className="lg releasable"></i>Claimable</span>
                        <span><i className="lg locked"></i>Locked</span>
                        <span className="vcp-pct">{allocation.vestedPct}%</span> vested
                      </div>
                    </div>

                    <div className="vc-keys">
                      <div className="vk">
                        <span className="vk-k">Total allocation</span>
                        <span className="vk-v">{formatEtherShort(allocation.totalAllocation)}</span>
                      </div>
                      <div className="vk">
                        <span className="vk-k">Released</span>
                        <span className="vk-v">{formatEtherShort(allocation.released)}</span>
                      </div>
                      <div className="vk">
                        <span className="vk-k">Vested to date</span>
                        <span className="vk-v">{formatEtherShort(allocation.vestedAmount)}</span>
                      </div>
                      <div className="vk">
                        <span className="vk-k">Still locked</span>
                        <span className="vk-v">{formatEtherShort(allocation.lockedN)}</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </Reveal>

            {/* Schedule */}
            <Reveal delay={1}>
              <div className="card vest-sched">
                <span className="eyebrow">Your schedule</span>
                {hasSchedule && allocation ? (
                  <>
                    <div className="vs-rows">
                      <div className="vs-row">
                        <span className="k">TGE unlock</span>
                        <span className="v">{allocation.tgePercent}%</span>
                      </div>
                      <div className="vs-row">
                        <span className="k">Cliff</span>
                        <span className="v">{allocation.cliffPeriods} × {humanPeriod(allocation.periodSeconds)}</span>
                      </div>
                      <div className="vs-row">
                        <span className="k">Linear vesting</span>
                        <span className="v">{allocation.vestingPeriods} × {humanPeriod(allocation.periodSeconds)}</span>
                      </div>
                      <div className="vs-row">
                        <span className="k">Start</span>
                        <span className="v">{dateStr(allocation.start)}</span>
                      </div>
                      <div className="vs-row">
                        <span className="k">Cliff ends</span>
                        <span className="v">{dateStr(allocation.cliffEnd)}</span>
                      </div>
                      <div className="vs-row">
                        <span className="k">Fully vested</span>
                        <span className="v">{dateStr(allocation.vestEnd)}</span>
                      </div>
                    </div>
                    <p className="vs-foot text-mute">
                      Amounts unlock once per period after the cliff. TGE is released up front at start.
                    </p>
                  </>
                ) : (
                  <div className="vs-rows">
                    <div className="vs-row"><span className="k">TGE unlock</span><span className="v">—</span></div>
                    <div className="vs-row"><span className="k">Cliff</span><span className="v">—</span></div>
                    <div className="vs-row"><span className="k">Linear vesting</span><span className="v">—</span></div>
                    <div className="vs-row"><span className="k">Start</span><span className="v">—</span></div>
                    <div className="vs-row"><span className="k">Cliff ends</span><span className="v">—</span></div>
                    <div className="vs-row"><span className="k">Fully vested</span><span className="v">—</span></div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ADMIN PANEL */}
      {isAdmin && (
        <section className="section-pad" style={{ padding: '56px 0 0' }}>
          <div className="wrap">
            <Reveal>
              <div className="vest-admin">
                <div className="va-head">
                  <div>
                    <span className="eyebrow" style={{ color: 'var(--warn)' }}>Admin controls</span>
                    <h2 className="h-md" style={{ marginTop: '10px' }}>Manage vesting</h2>
                  </div>
                  <div className="va-actions">
                    <span className="chip mono">admin · {shortAddress(adminAddress)}</span>
                    {isPaused ? (
                      <button className="btn btn-ghost btn-sm" onClick={() => handlePause(false)}>Resume</button>
                    ) : (
                      <button className="btn btn-ghost btn-sm" onClick={() => handlePause(true)}>Pause</button>
                    )}
                  </div>
                </div>

                <div className="va-grid">
                  <form className="card va-form" onSubmit={handleAddVesting}>
                    <h3 style={{ fontSize: '18px' }}>Add vesting</h3>
                    <label className="vest-field">
                      <span>Beneficiary address</span>
                      <input name="beneficiary" type="text" placeholder="0x…" spellCheck="false" required />
                    </label>
                    <div className="va-form-row">
                      <label className="vest-field">
                        <span>Allocation (EXBT)</span>
                        <input name="allocation" type="text" inputMode="decimal" placeholder="100000" required />
                      </label>
                      <label className="vest-field">
                        <span>TGE %</span>
                        <input name="tge" type="number" min="0" max="100" placeholder="10" required />
                      </label>
                    </div>
                    <div className="va-form-row">
                      <label className="vest-field">
                        <span>Cliff (periods)</span>
                        <input name="cliff" type="number" min="0" placeholder="6" required />
                      </label>
                      <label className="vest-field">
                        <span>Vesting (periods)</span>
                        <input name="vesting" type="number" min="1" placeholder="24" required />
                      </label>
                    </div>
                    <button className="btn btn-primary" type="submit">Add vesting schedule</button>
                  </form>

                  <div className="card va-benef">
                    <h3 style={{ fontSize: '18px' }}>Beneficiaries</h3>
                    <div className="ben-head">
                      <span>Address</span>
                      <span>Allocation</span>
                      <span>Released</span>
                      <span>Claimable</span>
                    </div>
                    <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
                      {beneficiaries.length === 0 ? (
                        <div className="vest-empty">No beneficiaries yet.</div>
                      ) : (
                        beneficiaries.map((ben) => (
                          <div key={ben.address} className="ben-row">
                            <a
                              className="ben-addr mono"
                              href={`${currentNetwork.blockExplorerUrls[0]}address/${ben.address}`}
                              target="_blank"
                              rel="noopener"
                            >
                              {shortAddress(ben.address)}
                            </a>
                            <span className="ben-num">{formatEtherShort(ben.totalAllocation, 0)}</span>
                            <span className="ben-num dim">{formatEtherShort(ben.released, 0)}</span>
                            <span className="ben-num accent">{formatEtherShort(ben.releasable, 2)}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section-pad" style={{ padding: '64px 0 0' }}>
        <div className="wrap"><div className="divider"></div></div>
      </section>
    </>
  );
}

// All vesting styles (ported from the HTML)
const vestingStyles = `
.vest-bar { display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;
  padding:14px 18px; border:1px solid var(--line-2); border-radius:var(--r-lg);
  background:linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.01)); }
.vest-bar-left, .vest-bar-right { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
.vest-net { display:inline-flex; align-items:center; gap:8px; font-family:var(--font-mono); font-size:13px; color:var(--text-dim); }
.vest-addrstate { font-family:var(--font-mono); font-size:12px; letter-spacing:.04em; padding:5px 11px; border-radius:999px; border:1px solid var(--line-2); }
.vest-addrstate.warn { color:var(--warn); border-color:var(--net-test-line); background:var(--net-test-soft); }
.vest-addrstate.ok { color:var(--accent-3); border-color:var(--net-main-line); background:var(--net-main-soft); }
.vest-addrstate.ok a { color:inherit; }

.vest-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
.vest-stat { border:1px solid var(--line); border-radius:var(--r); padding:18px 20px;
  background:linear-gradient(180deg, rgba(255,255,255,.03), transparent); }
.vs-k { font-family:var(--font-mono); font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--text-mute); margin-bottom:10px; }
.vs-v { font-family:var(--font-display); font-weight:600; font-size:24px; letter-spacing:-.02em; }
.vest-pill { display:inline-flex; align-items:center; gap:8px; font-family:var(--font-mono); font-size:14px; }
.vest-pill.live { color:var(--ok); } .vest-pill.live .dot { background:var(--ok); box-shadow:0 0 10px var(--ok); }
.vest-pill.paused { color:var(--warn); } .vest-pill.paused .dot { background:var(--warn); box-shadow:0 0 10px var(--warn); }
@media (max-width:820px){ .vest-stats { grid-template-columns:repeat(2,1fr);} }

.vest-cols { display:grid; grid-template-columns:1.5fr 1fr; gap:22px; align-items:start; }
@media (max-width:900px){ .vest-cols { grid-template-columns:1fr; } }

.vest-claim { padding:30px 30px 28px; }
.vc-head { display:flex; align-items:center; justify-content:space-between; gap:14px; margin-bottom:20px; }
.vest-gate { display:flex; flex-direction:column; align-items:flex-start; gap:18px; padding:30px 0 16px; }
.vest-none-ic { font-size:40px; color:var(--text-mute); line-height:1; }

.vc-amount { display:flex; align-items:baseline; gap:12px; }
.vc-amount .num { font-family:var(--font-display); font-weight:700; font-size:clamp(46px,7vw,72px); letter-spacing:-.04em; line-height:1; }
.vc-amount .unit { font-family:var(--font-mono); font-size:18px; color:var(--text-dim); }
.vc-claim-btn { margin-top:22px; }
.vc-claim-btn:disabled { opacity:.45; cursor:not-allowed; box-shadow:none; transform:none; }

.vc-progress { margin-top:28px; }
.vcp-bar { height:12px; border-radius:999px; background:rgba(255,255,255,.05); border:1px solid var(--line); overflow:hidden; display:flex; }
.vcp-bar .seg { height:100%; display:block; transition:width .6s cubic-bezier(.2,.8,.2,1); }
.seg.claimed { background:linear-gradient(90deg, var(--accent-2), var(--accent)); }
.seg.releasable { background:repeating-linear-gradient(45deg, var(--accent-3), var(--accent-3) 5px, rgba(214,180,255,.55) 5px, rgba(214,180,255,.55) 10px); }
.vcp-legend { display:flex; align-items:center; gap:16px; flex-wrap:wrap; margin-top:14px; font-size:13px; color:var(--text-dim); }
.vcp-legend span { display:inline-flex; align-items:center; gap:7px; }
.vcp-legend .lg { width:11px; height:11px; border-radius:3px; }
.lg.claimed { background:var(--accent); } .lg.releasable { background:var(--accent-3); } .lg.locked { background:rgba(255,255,255,.12); }
.vcp-pct { margin-left:auto; font-family:var(--font-mono); color:var(--accent-3); }

.vc-keys { display:grid; grid-template-columns:repeat(2,1fr); gap:1px; margin-top:26px; background:var(--line); border:1px solid var(--line); border-radius:var(--r); overflow:hidden; }
.vk { background:var(--bg-2); padding:16px 18px; }
.vk-k { display:block; font-family:var(--font-mono); font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--text-mute); margin-bottom:7px; }
.vk-v { font-family:var(--font-display); font-weight:600; font-size:22px; letter-spacing:-.02em; }
.vk-v::after { content:" EXBT"; font-family:var(--font-mono); font-size:11px; font-weight:400; color:var(--text-mute); }

.vest-sched { padding:28px; }
.vs-rows { margin-top:18px; }
.vs-row { display:flex; align-items:center; justify-content:space-between; gap:14px; padding:13px 0; border-top:1px solid var(--line); }
.vs-row:first-child { border-top:0; }
.vs-row .k { font-size:14px; color:var(--text-dim); }
.vs-row .v { font-family:var(--font-mono); font-size:14px; color:var(--text); }
.vs-foot { font-size:12.5px; margin-top:16px; }

.va-head { display:flex; align-items:flex-end; justify-content:space-between; gap:18px; flex-wrap:wrap; margin-bottom:24px; }
.va-actions { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.va-grid { display:grid; grid-template-columns:1fr 1.1fr; gap:22px; align-items:start; }
@media (max-width:900px){ .va-grid { grid-template-columns:1fr; } }
.va-form { display:flex; flex-direction:column; gap:14px; padding:26px; }
.va-form-row { display:flex; gap:14px; }
.va-form .btn { margin-top:6px; }
.va-benef { padding:26px; }
.ben-head, .ben-row { display:grid; grid-template-columns:1.3fr 1fr 1fr 1fr; gap:10px; align-items:center; }
.ben-head { font-family:var(--font-mono); font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--text-mute); padding:16px 0 12px; border-bottom:1px solid var(--line); }
.ben-row { padding:13px 0; border-bottom:1px solid var(--line); font-size:13px; }
.ben-addr { color:var(--accent-3); }
.ben-num { font-family:var(--font-mono); font-size:13px; text-align:right; }
.ben-num.dim { color:var(--text-mute); } .ben-num.accent { color:var(--accent-3); }
.vest-empty { color:var(--text-mute); font-size:14px; padding:18px 0; }

.vest-field { display:flex; flex-direction:column; gap:7px; flex:1; min-width:180px; }
.vest-field span { font-family:var(--font-mono); font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--text-mute); }
.vest-field input, .vest-field select {
  font-family:var(--font-mono); font-size:14px; color:var(--text);
  background:rgba(255,255,255,.03); border:1px solid var(--line-2); border-radius:10px; padding:11px 13px;
  transition:border-color .2s, box-shadow .2s; }
.vest-field input:focus, .vest-field select:focus { outline:none; border-color:var(--accent); box-shadow:0 0 0 3px var(--net-main-soft); }
`;
