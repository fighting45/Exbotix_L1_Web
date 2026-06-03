import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Reveal from '../components/common/Reveal';

export default function Staking() {
  const { connected, connect } = useWallet();
  const [tab, setTab] = useState('stake');
  const [amount, setAmount] = useState('');
  const [balance] = useLocalStorage('exbt_bal', '1240.50');
  const [staked] = useLocalStorage('exbt_staked', '0');
  const [rewards] = useLocalStorage('exbt_rewards', '0');

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
              Non-custodial, no lockups on the testnet — unstake whenever you like.
            </p>
          </Reveal>
        </div>
      </header>

      <section style={{ padding: '30px 0 50px' }}>
        <div className="wrap app-shell" style={{ maxWidth: '560px' }}>
          <Reveal>
            <div className="stake-stats">
              <div className="b">
                <div className="v accent">8%</div>
                <div className="l">APY</div>
              </div>
              <div className="b">
                <div className="v">14.2M</div>
                <div className="l">EXBT staked</div>
              </div>
              <div className="b">
                <div className="v">1,840</div>
                <div className="l">Stakers</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="app-card">
              {!connected ? (
                <div className="gate">
                  <div className="ic">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="6" width="18" height="13" rx="3" />
                      <path d="M3 10h18" />
                    </svg>
                  </div>
                  <h3 className="h-md" style={{ fontSize: '24px' }}>Connect your wallet</h3>
                  <p className="text-dim" style={{ margin: '10px auto 22px', maxWidth: '34ch' }}>
                    Connect a wallet to stake EXBT and start earning 8% APY.
                  </p>
                  <button
                    className="btn btn-primary"
                    style={{ padding: '14px 26px' }}
                    onClick={() => connect()}
                  >
                    Connect Wallet
                  </button>
                </div>
              ) : (
                <div>
                  <div className="app-tabs">
                    <button
                      className={tab === 'stake' ? 'active' : ''}
                      onClick={() => setTab('stake')}
                    >
                      Stake
                    </button>
                    <button
                      className={tab === 'unstake' ? 'active' : ''}
                      onClick={() => setTab('unstake')}
                    >
                      Unstake
                    </button>
                  </div>

                  <div className="kvs" style={{ marginTop: 0, borderStyle: 'solid', background: 'rgba(157,92,255,.04)' }}>
                    <div className="kv">
                      <span className="k">Your staked</span>
                      <span className="v accent">{parseFloat(staked).toFixed(2)} EXBT</span>
                    </div>
                    <div className="kv">
                      <span className="k">Pending rewards</span>
                      <span className="v" style={{ color: 'var(--ok)' }}>
                        {parseFloat(rewards).toFixed(6)} EXBT
                      </span>
                    </div>
                    <div className="kv">
                      <span className="k">Available</span>
                      <span className="v">{parseFloat(balance).toFixed(2)} EXBT</span>
                    </div>
                  </div>

                  <div className="field" style={{ marginTop: '16px' }}>
                    <div className="lab">
                      <span>{tab === 'stake' ? 'Amount to stake' : 'Amount to unstake'}</span>
                      <span>
                        Max: {tab === 'stake' ? parseFloat(balance).toFixed(2) : parseFloat(staked).toFixed(2)}
                      </span>
                    </div>
                    <div className="row">
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <span className="asset-pill" style={{ cursor: 'default' }}>
                        <span className="glyph">E</span>EXBT
                      </span>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '16px', padding: '15px' }}
                  >
                    {tab === 'stake' ? 'Stake' : 'Unstake'} EXBT
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
