import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import Reveal from '../components/common/Reveal';

export default function Bridge() {
  const { connected, connect } = useWallet();
  const [fromChain, setFromChain] = useState('Ethereum');
  const [toChain, setToChain] = useState('Exbotix');
  const [amount, setAmount] = useState('');
  const [asset, setAsset] = useState('EXBT');

  const chains = ['Ethereum', 'BNB Chain', 'Polygon', 'Arbitrum', 'Exbotix'];

  const handleFlip = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  const pickChain = (which) => {
    const current = which === 'from' ? fromChain : toChain;
    const other = which === 'from' ? toChain : fromChain;
    const currentIndex = chains.indexOf(current);
    let nextIndex = (currentIndex + 1) % chains.length;
    let next = chains[nextIndex];

    if (next === other) {
      nextIndex = (nextIndex + 1) % chains.length;
      next = chains[nextIndex];
    }

    if (which === 'from') {
      setFromChain(next);
    } else {
      setToChain(next);
    }
  };

  const fee = (parseFloat(amount) || 0) * 0.001;
  const received = (parseFloat(amount) || 0) - fee;

  return (
    <>
      <header className="page-hero">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <Reveal><span className="eyebrow" style={{ justifyContent: 'center' }}>Exbotix Bridge</span></Reveal>
          <Reveal delay={1}><h1 style={{ marginTop: '14px' }}>Move assets in, build everywhere</h1></Reveal>
          <Reveal delay={2}><p className="lead" style={{ margin: '18px auto 0' }}>Bridge EXBT and major assets between Exbotix and the chains you already use. Fast, transparent, and non-custodial.</p></Reveal>
        </div>
      </header>

      <section style={{ padding: '40px 0 90px' }}>
        <div className="wrap app-shell">
          <div className="app-card reveal">
            {/* Chain selector */}
            <div className="field" style={{ border: 0, padding: 0, background: 'none' }}>
              <div className="chain-select">
                <div className="chain-box" onClick={() => pickChain('from')}>
                  <div className="t">From</div>
                  <div className="n">
                    <span className="dot"></span>
                    <span>{fromChain}</span>
                  </div>
                </div>
                <button className="chain-flip" onClick={handleFlip} aria-label="Swap direction">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 4v13M7 17l-3-3M7 17l3-3M17 20V7M17 7l-3 3M17 7l3 3"/>
                  </svg>
                </button>
                <div className="chain-box" onClick={() => pickChain('to')}>
                  <div className="t">To</div>
                  <div className="n">
                    <span className="dot" style={{ background: 'var(--accent-2)', boxShadow: '0 0 12px var(--accent-2)' }}></span>
                    <span>{toChain}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amount */}
            <div className="field" style={{ marginTop: '14px' }}>
              <div className="lab">
                <span>You send</span>
                <span>Balance: —</span>
              </div>
              <div className="row">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button className="asset-pill">
                  <span className="glyph">E</span>
                  <span>{asset}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              </div>
              <div className="pct-row">
                <button>25%</button>
                <button>50%</button>
                <button>75%</button>
                <button>MAX</button>
              </div>
            </div>

            {/* Summary */}
            <div className="kvs">
              <div className="kv">
                <span className="k">You receive</span>
                <span className="v accent">{received.toFixed(4)} {asset}</span>
              </div>
              <div className="kv">
                <span className="k">Bridge fee (0.1%)</span>
                <span className="v">{fee.toFixed(4)} {asset}</span>
              </div>
              <div className="kv">
                <span className="k">Est. arrival</span>
                <span className="v">~2 min</span>
              </div>
              <div className="kv">
                <span className="k">Route</span>
                <span className="v">{fromChain} → {toChain}</span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => !connected && connect()}
              style={{ width: '100%', justifyContent: 'center', marginTop: '18px', padding: '15px' }}
            >
              {connected ? 'Bridge ' + asset : 'Connect Wallet to Bridge'}
            </button>
          </div>

          <div className="grid cols-3 reveal" style={{ marginTop: '28px', gap: '14px' }}>
            <div className="card" style={{ padding: '18px' }}>
              <div className="mono accent" style={{ fontSize: '12px' }}>NON-CUSTODIAL</div>
              <p className="text-dim" style={{ fontSize: '13.5px', marginTop: '6px' }}>
                You hold your keys. The bridge never takes custody of your funds.
              </p>
            </div>
            <div className="card" style={{ padding: '18px' }}>
              <div className="mono accent" style={{ fontSize: '12px' }}>AUDITED</div>
              <p className="text-dim" style={{ fontSize: '13.5px', marginTop: '6px' }}>
                Smart contracts independently reviewed before mainnet.
              </p>
            </div>
            <div className="card" style={{ padding: '18px' }}>
              <div className="mono accent" style={{ fontSize: '12px' }}>TRANSPARENT</div>
              <p className="text-dim" style={{ fontSize: '13.5px', marginTop: '6px' }}>
                Every transfer is verifiable on the Exbotix explorer.
              </p>
            </div>
          </div>
          <Reveal>
            <p className="text-mute" style={{ textAlign: 'center', fontSize: '13px', marginTop: '24px' }}>
              Testnet demo — transactions are simulated. Connect a wallet to try the full flow.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
