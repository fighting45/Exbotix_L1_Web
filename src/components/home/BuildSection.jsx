import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';

const codeHtml = `<span class="cm">// ExBeast Mainnet · 11311  —  Testnet · 11211</span>
<span class="kw">module</span>.exports = {
  networks: {
    <span class="fn">exbeast</span>: {           <span class="cm">// Mainnet</span>
      url: <span class="st">"https://rpc.exbtnetwork.com/"</span>,
      chainId: <span class="st">11311</span>,
      accounts: [process.env.<span class="fn">PRIVATE_KEY</span>],
    },
    <span class="fn">exbeastTestnet</span>: {    <span class="cm">// Testnet</span>
      url: <span class="st">"https://testnet_rpc.exbtnetwork.com"</span>,
      chainId: <span class="st">11211</span>,
      accounts: [process.env.<span class="fn">PRIVATE_KEY</span>],
    },
  },
};

<span class="cm">// Deploy as usual</span>
<span class="st">$</span> npx hardhat run deploy.js <span class="kw">--network</span> exbeast`;

export default function BuildSection() {
  return (
    <section className="x-sec" style={{ paddingTop: 0 }}>
      <div className="wrap x-build">
        <Reveal>
          <span className="x-idx">04 / BUILD</span>
          <h2>Ship in minutes,<br />not migrations</h2>
          <p className="lead">
            If you can build on Ethereum, you can build on ExBeast. Point your tooling at our RPC, keep your Solidity, and deploy to a chain designed for the next wave of apps.
          </p>
          <div className="tag-row" style={{ marginTop: '24px' }}>
            {['Hardhat', 'Foundry', 'ethers.js', 'MetaMask', 'Remix'].map(t => (
              <span className="chip" key={t}>{t}</span>
            ))}
          </div>
          <Link to="/docs" className="btn btn-primary" style={{ marginTop: '28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Read the docs
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        </Reveal>
        <Reveal delay={1} className="x-code">
          <div className="x-code-head">
            <span className="d" style={{ background: '#FF5F57' }}></span>
            <span className="d" style={{ background: '#FEBC2E' }}></span>
            <span className="d" style={{ background: '#28C840' }}></span>
            <span className="mono" style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--text-mute)' }}>
              hardhat.config.js
            </span>
          </div>
          <pre dangerouslySetInnerHTML={{ __html: codeHtml }} />
        </Reveal>
      </div>
    </section>
  );
}
