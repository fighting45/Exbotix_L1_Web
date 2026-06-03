import { Link } from 'react-router-dom';
import Reveal from '../components/common/Reveal';

export default function Mission() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <Reveal><span className="eyebrow">Mission & Vision</span></Reveal>
          <Reveal delay={1}>
            <h1 style={{ marginTop: '16px', maxWidth: '18ch' }}>For the community,<br/>by the community</h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="lead" style={{ marginTop: '18px' }}>
              Exbotix exists to give builders a single, modern home for the next era of decentralized apps — where AI, exchanges, DeFi and SocialFi finally share one efficient settlement layer.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Mission / Vision */}
      <section className="section-pad" style={{ paddingTop: '50px' }}>
        <div className="wrap grid cols-2" style={{ gap: '24px' }}>
          <Reveal>
            <div className="card" style={{ padding: '42px' }}>
              <span className="eyebrow">Our mission</span>
              <h2 className="h-md" style={{ margin: '16px 0 14px' }}>Make building powerful dApps effortless</h2>
              <p className="text-dim" style={{ fontSize: '16px' }}>
                We give developers a modern, efficient EVM blockchain where they can ship ambitious applications without fighting fragmented infrastructure. One chain, every primitive, owned by its users.
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="card" style={{ padding: '42px' }}>
              <span className="eyebrow">Our vision</span>
              <h2 className="h-md" style={{ margin: '16px 0 14px' }}>A converged on-chain world</h2>
              <p className="text-dim" style={{ fontSize: '16px' }}>
                A future where AI agents, CEX-grade liquidity, DeFi and social all live together on Exbotix — interoperable by default, governed by the people who use it, and accessible to everyone.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div style={{ marginBottom: '34px' }}>
              <span className="eyebrow">What we stand for</span>
              <h2 className="h-lg" style={{ marginTop: '14px' }}>Principles that guide us</h2>
            </div>
          </Reveal>
          <div className="grid cols-3">
            <Reveal delay={1}>
              <div className="card value-card">
                <div className="n">01</div>
                <h3>Community first</h3>
                <p>Decisions, treasury and direction belong to EXBT holders — not a closed foundation.</p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="card value-card">
                <div className="n">02</div>
                <h3>Radical compatibility</h3>
                <p>EVM-equivalent so the world's developers can build here on day one, with zero relearning.</p>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="card value-card">
                <div className="n">03</div>
                <h3>Convergence</h3>
                <p>AI, finance, social and gaming shouldn't live on islands. We unite them on one layer.</p>
              </div>
            </Reveal>
            <Reveal delay={4}>
              <div className="card value-card">
                <div className="n">04</div>
                <h3>Transparency</h3>
                <p>Every allocation, transaction and upgrade is verifiable on-chain. No black boxes.</p>
              </div>
            </Reveal>
            <Reveal delay={5}>
              <div className="card value-card">
                <div className="n">05</div>
                <h3>Efficiency</h3>
                <p>A lean, modern stack that keeps fees low and the experience fast for everyone.</p>
              </div>
            </Reveal>
            <Reveal delay={6}>
              <div className="card value-card">
                <div className="n">06</div>
                <h3>Longevity</h3>
                <p>Aligned incentives and thoughtful vesting built for years, not a single cycle.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div style={{ marginBottom: '44px' }}>
              <span className="eyebrow">The journey</span>
              <h2 className="h-lg" style={{ marginTop: '14px' }}>Roadmap</h2>
            </div>
          </Reveal>
          <div className="timeline">
            <Reveal>
              <div className="tl-item">
                <div className="q">Q1 2026 · Done</div>
                <h3>Genesis & whitepaper</h3>
                <p>Core protocol design finalized, EXBT tokenomics published, and the founding community assembled.</p>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="tl-item">
                <div className="q">Q2 2026 · Now</div>
                <h3>Public testnet</h3>
                <p>Exbotix Testnet live on Chain ID 11211 with block explorer, faucet and the first developer toolkit.</p>
                <div className="tag-row">
                  <span className="chip">Chain ID 11211</span>
                  <span className="chip">Explorer</span>
                  <span className="chip">Faucet</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="tl-item">
                <div className="q">Q3 2026 · Next</div>
                <h3>Bridge & staking</h3>
                <p>Cross-chain bridge for EXBT and major assets, plus native staking at 8% APY with non-custodial rewards.</p>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="tl-item">
                <div className="q">Q4 2026</div>
                <h3>Ecosystem ignition</h3>
                <p>Grants program launches alongside the first wave of AI, DeFi, SocialFi and Web3 gaming dApps. Mainnet candidate.</p>
              </div>
            </Reveal>
            <Reveal delay={4}>
              <div className="tl-item">
                <div className="q">2027</div>
                <h3>Mainnet & governance</h3>
                <p>Mainnet launch, on-chain governance handed to the community, and the RWA settlement layer goes live.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div>
                <h2 className="h-md">Help shape Exbotix</h2>
                <p className="text-dim" style={{ marginTop: '8px' }}>Governance is open. Bring your ideas to the community.</p>
              </div>
              <div className="hero-cta">
                <Link to="/community" className="btn btn-primary">Join the community</Link>
                <Link to="/docs" className="btn btn-ghost">Read the docs</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
