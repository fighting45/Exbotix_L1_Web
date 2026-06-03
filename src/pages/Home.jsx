import Reveal from '../components/common/Reveal';
import HeroRobot from '../components/animations/HeroRobot';
import RotatingHeadline from '../components/animations/RotatingHeadline';
import RobotAssembly from '../components/animations/RobotAssembly';

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
            <a href="/staking" className="btn btn-orbit">
              Launch App{' '}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="/docs" className="btn btn-primary">Start Building</a>
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
          <span className="chip">Proof of Work</span>
          <span className="chip">Solidity Ready</span>
        </div>
      </div>

      <RobotAssembly />

      <section className="section-pad">
        <div className="wrap">
          <Reveal>
            <h2 className="h-xl" style={{ textAlign: 'center', maxWidth: '24ch', margin: '0 auto 48px' }}>
              Six verticals.<br />One unified chain.
            </h2>
          </Reveal>

          <div className="grid cols-3" style={{ gap: '20px' }}>
            <Reveal delay={1}>
              <div className="card feat">
                <div className="feat-icon ai">⬡</div>
                <h3>AI Agents</h3>
                <p className="text-dim">Autonomous agents with on-chain memory and native token support.</p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="card feat">
                <div className="feat-icon cex">◈</div>
                <h3>CEX Integration</h3>
                <p className="text-dim">Centralized exchange infrastructure with instant settlement.</p>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="card feat">
                <div className="feat-icon defi">◉</div>
                <h3>DeFi</h3>
                <p className="text-dim">AMMs, lending markets and derivatives with deep liquidity.</p>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="card feat">
                <div className="feat-icon social">◊</div>
                <h3>SocialFi</h3>
                <p className="text-dim">Creator economies and reputation systems built on-chain.</p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="card feat">
                <div className="feat-icon games">⬢</div>
                <h3>Web3 Games</h3>
                <p className="text-dim">High-throughput gaming with player-owned economies.</p>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="card feat">
                <div className="feat-icon rwa">◈</div>
                <h3>Real World Assets</h3>
                <p className="text-dim">Tokenized real estate, commodities and financial instruments.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-final reveal">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>For the community, by the community</span>
            <h2 className="h-xl" style={{ margin: '18px 0 16px' }}>Build the future on Exbotix</h2>
            <p className="lead" style={{ margin: '0 auto 30px' }}>
              Join the builders, stakers and dreamers shaping a chain where AI, finance and social finally live in one place.
            </p>
            <div className="hero-cta" style={{ justifyContent: 'center' }}>
              <a href="/staking" className="btn btn-primary">Launch App</a>
              <a href="/community" className="btn btn-ghost">Join the community</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
