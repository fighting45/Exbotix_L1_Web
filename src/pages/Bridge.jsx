import Reveal from '../components/common/Reveal';

export default function Bridge() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <Reveal><span className="eyebrow" style={{ justifyContent: 'center' }}>Exbotix Bridge</span></Reveal>
          <Reveal delay={1}><h1 style={{ marginTop: '14px' }}>Cross-Chain Bridge</h1></Reveal>
          <Reveal delay={2}>
            <p className="lead" style={{ margin: '18px auto 0', maxWidth: '50ch' }}>
              Move assets seamlessly between Exbotix and other major blockchain networks.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section-pad" style={{ paddingTop: '50px', paddingBottom: '90px' }}>
        <div className="wrap">
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <Reveal>
              <div className="card" style={{ padding: '60px 40px', textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '24px' }}>🌉</div>
                <h2 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--text)' }}>
                  Coming Soon
                </h2>
                <p style={{ fontSize: '18px', color: 'var(--text-mute)', lineHeight: '1.6', marginBottom: '32px' }}>
                  You will be able to cross bridge tokens on Exbotix network soon!
                </p>
                <div style={{ display: 'inline-block', padding: '12px 24px', background: 'rgba(157, 92, 255, 0.1)', border: '1px solid rgba(157, 92, 255, 0.3)', borderRadius: 'var(--r-md)' }}>
                  <span style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: '500' }}>
                    Bridge launching Q3 2026
                  </span>
                </div>
              </div>
            </Reveal>

            <div className="grid cols-3" style={{ marginTop: '48px', gap: '20px' }}>
              <Reveal delay={1}>
                <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚡</div>
                  <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Fast Transfers</h3>
                  <p className="text-dim" style={{ fontSize: '13px' }}>
                    Bridge assets between chains in under 2 minutes
                  </p>
                </div>
              </Reveal>
              <Reveal delay={2}>
                <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔒</div>
                  <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Non-Custodial</h3>
                  <p className="text-dim" style={{ fontSize: '13px' }}>
                    You always retain full control of your assets
                  </p>
                </div>
              </Reveal>
              <Reveal delay={3}>
                <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔗</div>
                  <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Multi-Chain</h3>
                  <p className="text-dim" style={{ fontSize: '13px' }}>
                    Support for Ethereum, BSC, Polygon, and more
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
