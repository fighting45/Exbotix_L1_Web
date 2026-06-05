import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/common/Reveal';

const DATA = [
  { nm: "Staking Rewards", pc: 22, c: "#9D5CFF" },
  { nm: "Public Sale", pc: 20, c: "#C77DFF" },
  { nm: "Team", pc: 15, c: "#6E54F2" },
  { nm: "Exchange Partnership", pc: 10, c: "#B14BFF" },
  { nm: "Marketing", pc: 10, c: "#7B6CFF" },
  { nm: "Web3 Games", pc: 10, c: "#D14BFF" },
  { nm: "RWA", pc: 6, c: "#8A6BF0" },
  { nm: "SocialFi", pc: 5, c: "#E59CFF" },
  { nm: "Charity", pc: 1, c: "#CBB4FF" },
  { nm: "Advisory", pc: 1, c: "#7A6FA8" },
];

const SUPPLY = 92000000;

export default function Tokenomics() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const svgRef = useRef(null);

  const fmt = (n) => n.toLocaleString("en-US");

  useEffect(() => {
    if (!svgRef.current) return;

    const R = 120, CX = 160, CY = 160, CIRC = 2 * Math.PI * R;
    let offset = 0;

    svgRef.current.innerHTML = '';

    DATA.forEach((d) => {
      const len = (d.pc / 100) * CIRC;
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("class", "donut-seg");
      c.setAttribute("cx", CX);
      c.setAttribute("cy", CY);
      c.setAttribute("r", R);
      c.setAttribute("stroke", d.c);
      c.setAttribute("stroke-dasharray", `${len.toFixed(2)} ${(CIRC - len).toFixed(2)}`);
      c.setAttribute("stroke-dashoffset", (-offset).toFixed(2));
      c.style.strokeLinecap = "butt";
      svgRef.current.appendChild(c);
      offset += len;
    });
  }, []);

  const selectedData = selectedIndex !== null ? DATA[selectedIndex] : null;

  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <Reveal><span className="eyebrow">Tokenomics · EXBT</span></Reveal>
          <div className="page-hero-row" style={{ marginTop: '14px' }}>
            <Reveal delay={1}><h1>A token built<br/>to power an ecosystem</h1></Reveal>
            <Reveal delay={2}>
              <p className="lead" style={{ maxWidth: '42ch' }}>
                EXBT is the heartbeat of Exbotix — fueling gas, securing the network through staking, and handing governance to the community. A fixed supply, transparently allocated.
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      {/* Supply Stats */}
      <section className="wrap" style={{ marginTop: '0' }}>
        <Reveal>
          <div className="stat-strip" style={{ borderRadius: 'var(--r-lg)' }}>
            <div className="statbox"><div className="big">92M</div><div className="lab">Max supply</div></div>
            <div className="statbox"><div className="big">4.6M</div><div className="lab">Circulating supply</div></div>
            <div className="statbox"><div className="big">EXBT</div><div className="lab">Ticker</div></div>
            <div className="statbox"><div className="big">8%</div><div className="lab">Staking APY</div></div>
          </div>
        </Reveal>
      </section>

      {/* Donut */}
      <section className="section-pad">
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Distribution</span>
              <h2 className="h-lg" style={{ marginTop: '14px' }}>How 92,000,000 EXBT is allocated</h2>
            </div>
          </Reveal>
          <div className="token-grid">
            <Reveal>
              <div className="donut-wrap">
                <svg ref={svgRef} viewBox="0 0 320 320" aria-label="Token allocation donut chart"></svg>
                <div className="donut-center">
                  <div className="pct" style={selectedData ? { color: selectedData.c } : {}}>
                    {selectedData ? `${selectedData.pc}%` : '100%'}
                  </div>
                  <div className="nm">{selectedData ? selectedData.nm : 'Total Supply'}</div>
                  <div className="sub">
                    {selectedData ? fmt(Math.round(SUPPLY * selectedData.pc / 100)) : fmt(SUPPLY)} EXBT
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="legend">
                {DATA.map((d, i) => (
                  <div
                    key={i}
                    className={`legend-row ${selectedIndex === i ? 'active' : ''}`}
                    onMouseEnter={() => setSelectedIndex(i)}
                    onMouseLeave={() => setSelectedIndex(null)}
                  >
                    <span className="sw" style={{ background: d.c }}></span>
                    <span>
                      <span className="nm">{d.nm}</span><br/>
                      <span className="amt">{fmt(Math.round(SUPPLY * d.pc / 100))} EXBT</span>
                    </span>
                    <span className="pc">{d.pc}%</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Utility */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div style={{ marginBottom: '36px' }}>
              <span className="eyebrow">Why EXBT has value</span>
              <h2 className="h-lg" style={{ marginTop: '14px' }}>Three jobs, one token</h2>
            </div>
          </Reveal>
          <div className="grid cols-3">
            <Reveal delay={1}>
              <div className="card util-card">
                <div className="ic">⛽</div>
                <h3>Gas & settlement</h3>
                <p>Every transaction, contract call and dApp interaction on Exbotix is paid in EXBT — creating organic, usage-driven demand.</p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="card util-card">
                <div className="ic">🔒</div>
                <h3>Staking & security</h3>
                <p>Stake EXBT to help secure the network and earn up to 8% APY. The more that's staked, the stronger the chain.</p>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="card util-card">
                <div className="ic">🗳️</div>
                <h3>Governance</h3>
                <p>EXBT holders vote on treasury spend, grants, and protocol upgrades. For the community, by the community.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vesting */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid cols-2" style={{ gap: '48px', alignItems: 'start' }}>
            <Reveal>
              <div>
                <span className="eyebrow">Release schedule</span>
                <h2 className="h-md" style={{ margin: '14px 0 14px' }}>Vesting designed for the long game</h2>
                <p className="lead" style={{ fontSize: '16px' }}>
                  Team and advisory allocations vest over multiple years to keep incentives aligned with the community. Ecosystem and staking rewards unlock gradually as the network grows.
                </p>
                <div className="tag-row" style={{ marginTop: '22px' }}>
                  <span className="chip">Cliff + linear vesting</span>
                  <span className="chip">On-chain & verifiable</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div>
                <div className="vest-row">
                  <div className="lab">Public Sale</div>
                  <div className="track"><div className="fill" style={{ width: '100%' }}></div></div>
                  <div className="val">TGE 100%</div>
                </div>
                <div className="vest-row">
                  <div className="lab">Staking Rewards</div>
                  <div className="track"><div className="fill" style={{ width: '30%' }}></div></div>
                  <div className="val">48 mo</div>
                </div>
                <div className="vest-row">
                  <div className="lab">Team</div>
                  <div className="track"><div className="fill" style={{ width: '15%' }}></div></div>
                  <div className="val">12mo cliff · 36mo</div>
                </div>
                <div className="vest-row">
                  <div className="lab">Exchange Partnership</div>
                  <div className="track"><div className="fill" style={{ width: '55%' }}></div></div>
                  <div className="val">18 mo</div>
                </div>
                <div className="vest-row">
                  <div className="lab">Web3 Games · RWA · SocialFi</div>
                  <div className="track"><div className="fill" style={{ width: '25%' }}></div></div>
                  <div className="val">36 mo</div>
                </div>
                <div className="vest-row">
                  <div className="lab">Advisory</div>
                  <div className="track"><div className="fill" style={{ width: '10%' }}></div></div>
                  <div className="val">6mo cliff · 24mo</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div>
                <h2 className="h-md">Put your EXBT to work</h2>
                <p className="text-dim" style={{ marginTop: '8px' }}>Stake today and earn 8% APY while securing the network.</p>
              </div>
              <div className="hero-cta">
                <Link to="/staking" className="btn btn-primary">Stake EXBT</Link>
                <Link to="/docs" className="btn btn-ghost">Token contract</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
