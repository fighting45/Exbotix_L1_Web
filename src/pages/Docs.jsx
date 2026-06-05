import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import Reveal from '../components/common/Reveal';

export default function Docs() {
  const { addNetwork } = useWallet();

  const handleAddNetwork = (networkKey) => {
    addNetwork(networkKey);
  };

  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <Reveal><span className="eyebrow">Developer Documentation</span></Reveal>
          <div className="page-hero-row" style={{ marginTop: '14px' }}>
            <Reveal delay={1}><h1>Build on Exbotix<br/>in minutes</h1></Reveal>
            <Reveal delay={2}>
              <p className="lead" style={{ maxWidth: '40ch' }}>
                EVM-equivalent and tooling-compatible. Bring your Solidity, point at our RPC, and deploy. Here's everything you need to get started.
              </p>
            </Reveal>
          </div>
          <Reveal delay={3}>
            <div className="hero-cta" style={{ marginTop: '24px' }}>
              <button className="btn btn-primary" onClick={() => handleAddNetwork('mainnet')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg> Add Mainnet to wallet
              </button>
              <button className="btn btn-ghost">Get testnet EXBT</button>
            </div>
          </Reveal>
        </div>
      </header>

      <section className="section-pad" style={{ paddingTop: '50px' }}>
        <div className="wrap docs-layout">
          <aside className="docs-side reveal">
            <h6>Get started</h6>
            <a href="#overview" className="active">Overview</a>
            <a href="#network">Network parameters</a>
            <a href="#wallet">Connect a wallet</a>
            <h6>Build</h6>
            <a href="#quickstart">Quickstart</a>
            <a href="#deploy">Deploy a contract</a>
            <a href="#rpc">RPC methods</a>
            <h6>Resources</h6>
            <a href="#faucet-sec">Faucet & explorer</a>
          </aside>

          <div className="docs-main">
            <h2 id="overview">Overview</h2>
            <p>Exbotix is an EVM-compatible Layer 1 blockchain that converges AI, exchange infrastructure, DeFi and SocialFi into a single programmable ecosystem. Because Exbotix is EVM-equivalent, any contract, tool, or wallet that works with Ethereum works here with no code changes.</p>
            <ul>
              <li><b>Gas token:</b> EXBT</li>
              <li><b>Block time:</b> ~12.8 seconds · ~100 TPS</li>
              <li><b>Compatibility:</b> Solidity, Hardhat, Foundry, ethers.js, web3.js, MetaMask, Remix</li>
            </ul>

            <h2 id="network">Network parameters</h2>
            <p>Exbotix runs two networks. Use <b style={{ color: 'var(--accent-3)' }}>Mainnet</b> for production deployments and real value, and <b style={{ color: 'var(--net-test)' }}>Testnet</b> for free, risk-free experimentation. Add either to any EVM wallet with the values below.</p>
            <div className="net-grid">
              <div className="net-card">
                <div className="net-head">
                  <span className="net-name"><span className="dot"></span>Exbotix Mainnet</span>
                  <span className="net-badge main">Mainnet</span>
                </div>
                <div className="net-row"><span className="k">Chain ID</span><span className="v">11311</span></div>
                <div className="net-row"><span className="k">Currency</span><span className="v">EXBT</span></div>
                <div className="net-row"><span className="k">RPC URL</span><span className="v">https://rpc.exbotix.net/</span></div>
                <div className="net-row"><span className="k">Explorer</span><span className="v"><a href="https://scan.exbotix.net/" target="_blank" rel="noopener">scan.exbotix.net</a></span></div>
                <button className="btn btn-primary btn-sm" onClick={() => handleAddNetwork('mainnet')}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14"/>
                  </svg> Add Mainnet
                </button>
              </div>
              <div className="net-card is-test">
                <div className="net-head">
                  <span className="net-name"><span className="dot test live"></span>Exbotix Testnet</span>
                  <span className="net-badge test">Testnet</span>
                </div>
                <div className="net-row"><span className="k">Chain ID</span><span className="v">11211</span></div>
                <div className="net-row"><span className="k">Currency</span><span className="v">EXBT (test)</span></div>
                <div className="net-row"><span className="k">RPC URL</span><span className="v">https://testnet_rpc.exbotix.net</span></div>
                <div className="net-row"><span className="k">Explorer</span><span className="v"><a href="https://testnet_explorer.exbotix.net" target="_blank" rel="noopener">testnet_explorer.exbotix.net</a></span></div>
                <button className="btn btn-ghost btn-sm" onClick={() => handleAddNetwork('testnet')}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14"/>
                  </svg> Add Testnet
                </button>
              </div>
            </div>

            <h2 id="wallet">Connect a wallet</h2>
            <p>Click a button below to add the network automatically, or enter the parameters above manually in MetaMask under <span className="mono">Settings → Networks → Add Network</span>. Make sure you select the right one — <b style={{ color: 'var(--accent-3)' }}>Mainnet (11311)</b> for production, <b style={{ color: 'var(--net-test)' }}>Testnet (11211)</b> for testing.</p>
            <div className="hero-cta" style={{ margin: '12px 0' }}>
              <button className="btn btn-primary btn-sm" onClick={() => handleAddNetwork('mainnet')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg> Add Mainnet
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => handleAddNetwork('testnet')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg> Add Testnet
              </button>
            </div>

            <h2 id="quickstart">Quickstart</h2>
            <p>Configure your project to target Exbotix in seconds.</p>
            <div className="code-card" style={{ margin: '14px 0' }}>
              <div className="code-head">
                <span className="d" style={{ background: '#FF5F57' }}></span>
                <span className="d" style={{ background: '#FEBC2E' }}></span>
                <span className="d" style={{ background: '#28C840' }}></span>
                <span className="mono" style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--text-mute)' }}>terminal</span>
              </div>
              <pre className="code-body"><span className="st">$</span> npm install <span className="kw">--save-dev</span> hardhat{'\n'}<span className="st">$</span> npx hardhat init</pre>
            </div>

            <h2 id="deploy">Deploy a contract</h2>
            <p>Add Exbotix to your <span className="mono">hardhat.config.js</span> and deploy exactly as you would on any EVM chain.</p>
            <div className="code-card" style={{ margin: '14px 0' }}>
              <div className="code-head">
                <span className="d" style={{ background: '#FF5F57' }}></span>
                <span className="d" style={{ background: '#FEBC2E' }}></span>
                <span className="d" style={{ background: '#28C840' }}></span>
                <span className="mono" style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--text-mute)' }}>hardhat.config.js</span>
              </div>
              <pre className="code-body"><span className="kw">module</span>.exports = {'{'}{'\n'}  solidity: <span className="st">"0.8.24"</span>,{'\n'}  networks: {'{'}{'\n'}    <span className="cm">// Mainnet — Chain ID 11311</span>{'\n'}    <span className="fn">exbotix</span>: {'{'}{'\n'}      url: <span className="st">"https://rpc.exbotix.net/"</span>,{'\n'}      chainId: <span className="st">11311</span>,{'\n'}      accounts: [process.env.<span className="fn">PRIVATE_KEY</span>],{'\n'}    {'},'}{'\n'}    <span className="cm">// Testnet — Chain ID 11211</span>{'\n'}    <span className="fn">exbotixTestnet</span>: {'{'}{'\n'}      url: <span className="st">"https://testnet_rpc.exbotix.net"</span>,{'\n'}      chainId: <span className="st">11211</span>,{'\n'}      accounts: [process.env.<span className="fn">PRIVATE_KEY</span>],{'\n'}    {'},'}{'\n'}  {'},'}{'\n'}{'};'}</pre>
            </div>
            <div className="code-card" style={{ margin: '14px 0' }}>
              <div className="code-head">
                <span className="d" style={{ background: '#FF5F57' }}></span>
                <span className="d" style={{ background: '#FEBC2E' }}></span>
                <span className="d" style={{ background: '#28C840' }}></span>
                <span className="mono" style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--text-mute)' }}>deploy</span>
              </div>
              <pre className="code-body"><span className="st">$</span> npx hardhat run scripts/deploy.js <span className="kw">--network</span> exbotix{'\n'}<span className="cm">// ✓ Contract deployed to 0x9f… on Exbotix Mainnet</span>{'\n\n'}<span className="st">$</span> npx hardhat run scripts/deploy.js <span className="kw">--network</span> exbotixTestnet{'\n'}<span className="cm">// ✓ Contract deployed to 0x9f… on Exbotix Testnet</span></pre>
            </div>

            <h2 id="rpc">RPC methods</h2>
            <p>Exbotix supports the standard Ethereum JSON-RPC API on both networks — point at <span className="mono">rpc.exbotix.net</span> for Mainnet or <span className="mono">testnet_rpc.exbotix.net</span> for Testnet. A few common calls:</p>
            <div className="code-card" style={{ margin: '14px 0' }}>
              <div className="code-head">
                <span className="d" style={{ background: '#FF5F57' }}></span>
                <span className="d" style={{ background: '#FEBC2E' }}></span>
                <span className="d" style={{ background: '#28C840' }}></span>
                <span className="mono" style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--text-mute)' }}>curl</span>
              </div>
              <pre className="code-body"><span className="cm"># Mainnet</span>{'\n'}<span className="st">$</span> curl https://rpc.exbotix.net/ \{'\n'}  -X POST -H <span className="st">"Content-Type: application/json"</span> \{'\n'}  -d <span className="st">'{`{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}`}'</span>{'\n'}<span className="cm">{'// → { "result": "0x2c2f" }  (11311)'}</span>{'\n\n'}<span className="cm"># Testnet → https://testnet_rpc.exbotix.net</span>{'\n'}<span className="cm">{'// → { "result": "0x2bcb" }  (11211)'}</span></pre>
            </div>
            <ul>
              <li><span className="mono">eth_blockNumber</span> — latest block height</li>
              <li><span className="mono">eth_getBalance</span> — EXBT balance of an address</li>
              <li><span className="mono">eth_sendRawTransaction</span> — broadcast a signed tx</li>
              <li><span className="mono">eth_call</span> — read contract state</li>
            </ul>

            <h2 id="faucet-sec">Faucet & explorer</h2>
            <p>Grab free <b style={{ color: 'var(--net-test)' }}>Testnet</b> EXBT to start experimenting, and track activity on the block explorer for whichever network you're using.</p>
            <div className="grid cols-2" style={{ marginTop: '16px', gap: '20px' }}>
              <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '24px' }}>🪂</span>
                  <h3 style={{ fontSize: '18px' }}>Testnet Faucet</h3>
                  <span className="net-badge test">Testnet</span>
                </div>
                <p className="text-dim" style={{ fontSize: '14px', margin: '8px 0 14px' }}>
                  Get 5-20 free testnet EXBT tokens per day on Chain ID 11211 for development.
                </p>
                <Link to="/faucet" className="btn btn-primary btn-sm">
                  Get Testnet Tokens
                </Link>
              </div>
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '6px' }}>Block Explorers</h3>
                <p className="text-dim" style={{ fontSize: '14px', margin: '8px 0 14px' }}>
                  Search blocks, transactions and contracts.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a className="btn btn-primary btn-sm mono" href="https://scan.exbotix.net/" target="_blank" rel="noopener">
                    Mainnet · scan.exbotix.net
                  </a>
                  <a className="btn btn-ghost btn-sm mono" href="https://testnet_explorer.exbotix.net" target="_blank" rel="noopener">
                    Testnet · testnet_explorer.exbotix.net
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
