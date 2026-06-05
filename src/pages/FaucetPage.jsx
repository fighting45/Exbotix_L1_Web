import { Link } from 'react-router-dom';
import Reveal from '../components/common/Reveal';
import Faucet from '../components/common/Faucet';

export default function FaucetPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <Reveal>
            <div style={{ fontSize: '96px', marginBottom: '16px' }}>🪂</div>
          </Reveal>
          <Reveal delay={1}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Testnet Faucet</span>
          </Reveal>
          <Reveal delay={2}>
            <h1 style={{ marginTop: '14px' }}>Get Free Testnet EXBT</h1>
          </Reveal>
          <Reveal delay={3}>
            <p className="lead" style={{ margin: '18px auto 0', maxWidth: '50ch' }}>
              Request up to 20 testnet EXBT tokens for free. Perfect for developers testing smart contracts, building dApps, or experimenting with Exbotix features on Chain ID 11211.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section-pad" style={{ paddingTop: '50px' }}>
        <div className="wrap">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Reveal>
              <Faucet />
            </Reveal>
          </div>

          {/* Info Cards */}
          <div className="grid cols-3" style={{ marginTop: '60px', gap: '20px' }}>
            <Reveal delay={1}>
              <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏱️</div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>24h Cooldown</h3>
                <p className="text-dim" style={{ fontSize: '14px' }}>
                  Each address can request tokens once every 24 hours to prevent abuse.
                </p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚡</div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Instant Delivery</h3>
                <p className="text-dim" style={{ fontSize: '14px' }}>
                  Tokens are sent immediately to your address with real-time confirmation.
                </p>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔗</div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Testnet Only</h3>
                <p className="text-dim" style={{ fontSize: '14px' }}>
                  These tokens have no real value and work only on Chain ID 11211.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Quick Links */}
          <Reveal>
            <div className="cta-final" style={{ marginTop: '60px' }}>
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Need More Resources?</span>
              <h2 className="h-lg" style={{ margin: '16px 0 14px' }}>Explore Developer Tools</h2>
              <p className="lead" style={{ margin: '0 auto 28px', maxWidth: '50ch' }}>
                Check out our documentation for network parameters, deployment guides, and more testnet resources.
              </p>
              <div className="hero-cta" style={{ justifyContent: 'center' }}>
                <Link to="/docs" className="btn btn-primary">
                  Developer Docs
                </Link>
                <a
                  href="https://testnet_explorer.exbotix.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Block Explorer
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
