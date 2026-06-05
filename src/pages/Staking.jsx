import { Link } from 'react-router-dom';
import Reveal from '../components/common/Reveal';

export default function Staking() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <Reveal>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Staking</span>
          </Reveal>
          <Reveal delay={1}>
            <h1 style={{ marginTop: '14px' }}>
              Earn <span className="gradtext">8% APY</span>.<br />
              Secure the network.
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="lead" style={{ margin: '18px auto 0' }}>
              Stake EXBT to help secure Exbotix and earn rewards in real time.
              Non-custodial, no lockups — unstake whenever you like.
            </p>
          </Reveal>
        </div>
      </header>

      <section style={{ padding: '30px 0 100px' }}>
        <div className="wrap" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <Reveal>
            <div className="app-card" style={{ padding: '60px 40px', textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 24px',
                background: 'linear-gradient(135deg, rgba(157,92,255,0.2), rgba(199,125,255,0.1))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(157,92,255,0.3)'
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>

              <h2 className="h-lg" style={{ marginBottom: '16px' }}>
                Coming Soon to Mainnet
              </h2>

              <p className="lead" style={{
                fontSize: '18px',
                color: 'var(--text-mute)',
                maxWidth: '46ch',
                margin: '0 auto 32px',
                lineHeight: '1.6'
              }}>
                Staking on Exbotix Mainnet will be available soon. Earn 8% APY while securing the network. Stay tuned for updates!
              </p>

              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '32px'
              }}>
                <Link to="/community" className="btn btn-primary">
                  Join Community
                </Link>
                <Link to="/tokenomics" className="btn btn-ghost">
                  Learn More
                </Link>
              </div>

              <div style={{
                marginTop: '40px',
                padding: '20px',
                background: 'rgba(157,92,255,0.05)',
                border: '1px solid rgba(157,92,255,0.2)',
                borderRadius: 'var(--r-md)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '20px'
                }}>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--accent)' }}>8%</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-mute)', marginTop: '4px' }}>Expected APY</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text)' }}>92M</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-mute)', marginTop: '4px' }}>Total EXBT</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text)' }}>Q3 2026</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-mute)', marginTop: '4px' }}>Launch Date</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
