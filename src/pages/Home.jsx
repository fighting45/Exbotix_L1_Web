import { Link } from 'react-router-dom';
import Reveal from '../components/common/Reveal';
import HeroRobot from '../components/animations/HeroRobot';
import RotatingHeadline from '../components/animations/RotatingHeadline';
import RobotAssembly from '../components/animations/RobotAssembly';
import LiveStats from '../components/home/LiveStats';

export default function Home() {
  return (
    <>
      <header className="hero-portal">
        <div className="hero-crown" aria-hidden="true"></div>
        <div className="portal" aria-hidden="true">
          <div className="swirl a"></div>
          <div className="swirl b"></div>
          <div className="swirl c"></div>
          <div className="core-glow"></div>
        </div>

        <div className="hero-content wrap">
          <RotatingHeadline />
          <p className="lead">
            Exbotix is a modern, efficient Layer 1 that converges AI, exchange infrastructure,
            decentralized finance and social into one programmable ecosystem. Built for the
            community, by the community.
          </p>
          <div className="hero-cta">
            <a href="https://exbotix.com" className="btn btn-orbit">
              Launch App{' '}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <Link to="/docs" className="btn btn-primary">Start Building</Link>
            <Link to="/faucet" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'none' }}>
              <span style={{ fontSize: '20px' }}>🪂</span>
              Testnet Airdrop
            </Link>
          </div>
        </div>

        <HeroRobot />

        <div className="hero-stats">
          <div>
            <div className="s-val" style={{ color: 'var(--accent-3)' }}>100</div>
            <div className="s-lab">TPS Throughput</div>
          </div>
          <div>
            <div className="s-val">12.8s</div>
            <div className="s-lab">Block Time</div>
          </div>
          <div>
            <div className="s-val">92M</div>
            <div className="s-lab">EXBT Supply</div>
          </div>
          <div>
            <div className="s-val">8%</div>
            <div className="s-lab">Staking APY</div>
          </div>
        </div>
      </header>

      <div className="wrap" style={{ marginTop: '48px' }}>
        <div className="trust-bar">
          <span className="chip net-test">
            <span className="dot test live"></span>Testnet Live · 11211
          </span>
          <span className="chip net-main"><span className="dot"></span>Mainnet · 11311</span>
          <span className="chip">EVM Equivalent</span>
          <span className="chip">EXBT Gas Token</span>
          <span className="chip">Solidity Ready</span>
        </div>
      </div>

      <RobotAssembly />

      {/* Live Stats */}
      <LiveStats />

      {/* Ecosystem */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap', marginBottom: '42px' }}>
              <div>
                <span className="eyebrow">One settlement layer</span>
                <h2 className="h-lg" style={{ marginTop: '14px', maxWidth: '16ch' }}>Every frontier, converged</h2>
              </div>
              <Link to="/ecosystem" className="btn btn-ghost">Explore ecosystem</Link>
            </div>
          </Reveal>
          <div className="grid cols-3">
            <Reveal delay={1}>
              <div className="card eco-card">
                <div className="eco-icon">⬡</div>
                <div>
                  <h3>AI Agents</h3>
                  <p>On-chain inference markets, agent wallets and autonomous compute settling natively in EXBT.</p>
                </div>
                <div className="stat">// intelligence layer</div>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="card eco-card">
                <div className="eco-icon">⇄</div>
                <div>
                  <h3>CEX Rails</h3>
                  <p>Exchange-grade liquidity and order infrastructure bridged directly into the chain.</p>
                </div>
                <div className="stat">// liquidity layer</div>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="card eco-card">
                <div className="eco-icon">◈</div>
                <div>
                  <h3>DeFi</h3>
                  <p>AMMs, lending and perps with EVM equivalence — fork your favorite protocol day one.</p>
                </div>
                <div className="stat">// finance layer</div>
              </div>
            </Reveal>
            <Reveal delay={4}>
              <div className="card eco-card">
                <div className="eco-icon">◎</div>
                <div>
                  <h3>SocialFi</h3>
                  <p>Creator economies, social graphs and reputation owned by users, not platforms.</p>
                </div>
                <div className="stat">// social layer</div>
              </div>
            </Reveal>
            <Reveal delay={5}>
              <div className="card eco-card">
                <div className="eco-icon">▲</div>
                <div>
                  <h3>Web3 Games</h3>
                  <p>Low-friction in-game economies and true asset ownership for studios of any size.</p>
                </div>
                <div className="stat">// play layer</div>
              </div>
            </Reveal>
            <Reveal delay={6}>
              <div className="card eco-card">
                <div className="eco-icon">◧</div>
                <div>
                  <h3>RWA</h3>
                  <p>Tokenize and settle real-world assets with transparent, auditable provenance.</p>
                </div>
                <div className="stat">// asset layer</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Token Preview */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="token-panel">
              <div className="left">
                <span className="eyebrow">The EXBT token</span>
                <h2 className="h-md" style={{ margin: '16px 0 12px' }}>Gas, staking &amp; governance in one asset</h2>
                <p className="lead" style={{ fontSize: '16px' }}>
                  EXBT powers every transaction, secures the network through staking, and gives the community a direct say in where Exbotix goes next.
                </p>
                <div className="hero-cta" style={{ marginTop: '26px' }}>
                  <Link to="/tokenomics" className="btn btn-primary">View tokenomics</Link>
                  <Link to="/staking" className="btn btn-ghost">Stake EXBT</Link>
                </div>
              </div>
              <div className="right">
                <div className="token-line"><span className="k">Token</span><span className="v">Exbotix · EXBT</span></div>
                <div className="token-line"><span className="k">Max supply</span><span className="v">92,000,000</span></div>
                <div className="token-line"><span className="k">Utility</span><span className="v">Gas · Staking · Governance</span></div>
                <div className="token-line"><span className="k">Staking reward</span><span className="v accent">8% APY</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Build Section */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap grid cols-2" style={{ alignItems: 'center', gap: '48px' }}>
          <Reveal>
            <div>
              <span className="eyebrow">Built for builders</span>
              <h2 className="h-lg" style={{ margin: '14px 0 16px' }}>Ship in minutes,<br />not migrations</h2>
              <p className="lead">
                If you can build on Ethereum, you can build on Exbotix. Point your tooling at our RPC, keep your Solidity, and deploy to a chain designed for the next wave of apps.
              </p>
              <div className="tag-row" style={{ marginTop: '24px' }}>
                <span className="chip">Hardhat</span>
                <span className="chip">Foundry</span>
                <span className="chip">ethers.js</span>
                <span className="chip">MetaMask</span>
                <span className="chip">Remix</span>
              </div>
              <Link to="/docs" className="btn btn-primary" style={{ marginTop: '28px' }}>
                Read the docs{' '}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="code-card">
              <div className="code-head">
                <span className="d" style={{ background: '#FF5F57' }}></span>
                <span className="d" style={{ background: '#FEBC2E' }}></span>
                <span className="d" style={{ background: '#28C840' }}></span>
                <span className="mono" style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--text-mute)' }}>hardhat.config.js</span>
              </div>
              <pre className="code-body"><span className="cm">// Exbotix Mainnet · 11311  —  Testnet · 11211</span>
{'\n'}<span className="kw">module</span>.exports = {'{'}
{'\n'}  networks: {'{'}
{'\n'}    <span className="fn">exbotix</span>: {'{'}           <span className="cm">// Mainnet</span>
{'\n'}      url: <span className="st">"https://rpc.exbotix.net/"</span>,
{'\n'}      chainId: <span className="st">11311</span>,
{'\n'}      accounts: [process.env.<span className="fn">PRIVATE_KEY</span>],
{'\n'}    {'},'}
{'\n'}    <span className="fn">exbotixTestnet</span>: {'{'}    <span className="cm">// Testnet</span>
{'\n'}      url: <span className="st">"https://testnet_rpc.exbotix.net"</span>,
{'\n'}      chainId: <span className="st">11211</span>,
{'\n'}      accounts: [process.env.<span className="fn">PRIVATE_KEY</span>],
{'\n'}    {'},'}
{'\n'}  {'},'}
{'\n'}{'};'}
{'\n'}
{'\n'}<span className="cm">// Deploy as usual</span>
{'\n'}<span className="st">$</span> npx hardhat run deploy.js <span className="kw">--network</span> exbotix</pre>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Roadmap Teaser */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <div>
                <span className="eyebrow">Where we're headed</span>
                <h2 className="h-lg" style={{ marginTop: '14px' }}>The road ahead</h2>
              </div>
              <Link to="/mission" className="btn btn-ghost">Full roadmap &amp; mission</Link>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <div className="rm-row">
                <div className="q">Now<small>Q2 2026</small></div>
                <div>
                  <h4>Testnet &amp; core infrastructure</h4>
                  <p>Public testnet live on Chain ID 11211, block explorer, faucet and the first developer toolkit.</p>
                </div>
              </div>
              <div className="rm-row">
                <div className="q">Next<small>Q3 2026</small></div>
                <div>
                  <h4>Bridge &amp; staking go live</h4>
                  <p>Cross-chain bridge for EXBT and assets, plus native staking at 8% APY with non-custodial rewards.</p>
                </div>
              </div>
              <div className="rm-row">
                <div className="q">Soon<small>Q4 2026</small></div>
                <div>
                  <h4>Ecosystem ignition</h4>
                  <p>Grants program, first wave of AI, DeFi and SocialFi dApps, and mainnet candidate.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="cta-final">
              <span className="eyebrow" style={{ justifyContent: 'center' }}>For the community, by the community</span>
              <h2 className="h-xl" style={{ margin: '18px 0 16px' }}>Build the future on Exbotix</h2>
              <p className="lead" style={{ margin: '0 auto 30px' }}>
                Join the builders, stakers and dreamers shaping a chain where AI, finance and social finally live in one place.
              </p>
              <div className="hero-cta" style={{ justifyContent: 'center' }}>
                <a href="https://exbotix.com" className="btn btn-primary">Launch App</a>
                <Link to="/community" className="btn btn-ghost">Join the community</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
