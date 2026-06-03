import Reveal from '../components/common/Reveal';

export default function Docs() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <span className="eyebrow reveal">Developer Documentation</span>
          <div className="page-hero-row" style={{ marginTop: '14px' }}>
            <h1 className="reveal" data-d="1">Build on Exbotix<br />in minutes</h1>
            <p className="lead reveal" data-d="2" style={{ maxWidth: '40ch' }}>
              EVM-equivalent and tooling-compatible. Bring your Solidity, point at our RPC, and deploy.
              Here's everything you need to get started.
            </p>
          </div>
        </div>
      </header>

      <section className="section-pad" style={{ paddingTop: '50px' }}>
        <div className="wrap">
          <Reveal>
            <div className="card" style={{ padding: '32px' }}>
              <h2>Coming Soon</h2>
              <p className="text-dim">Full developer documentation will be available soon.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
