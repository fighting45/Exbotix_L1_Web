import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/common/Reveal';

const APPS = [
  { n: "NeuralSwap", c: "ai", g: "⬡", d: "AI-routed DEX aggregator finding the best execution across pools.", s: "Live · Testnet" },
  { n: "AgentVault", c: "ai", g: "◉", d: "Autonomous agent wallets with on-chain spending policies.", s: "In build" },
  { n: "ExDEX", c: "defi", g: "◈", d: "Native AMM with concentrated liquidity and EXBT incentives.", s: "Live · Testnet" },
  { n: "LendBotix", c: "defi", g: "▣", d: "Over-collateralized lending and borrowing markets.", s: "In build" },
  { n: "Perptual", c: "defi", g: "∿", d: "Decentralized perpetuals with up to 20x leverage.", s: "Coming soon" },
  { n: "ExBridge CEX", c: "cex", g: "⇄", d: "Exchange-grade order books bridged into Exbotix.", s: "In build" },
  { n: "Plaza", c: "social", g: "◎", d: "Creator economy and social graph owned by users.", s: "In build" },
  { n: "RepID", c: "social", g: "◍", d: "Portable on-chain reputation and identity.", s: "Coming soon" },
  { n: "BotixArena", c: "games", g: "▲", d: "On-chain mech battler with true asset ownership.", s: "In build" },
  { n: "LootForge", c: "games", g: "◆", d: "Cross-game item marketplace and minting toolkit.", s: "Coming soon" },
  { n: "RealVault", c: "rwa", g: "◧", d: "Tokenized real-world assets with verifiable provenance.", s: "Coming soon" },
  { n: "YieldRWA", c: "rwa", g: "▦", d: "On-chain access to tokenized treasury yields.", s: "Coming soon" },
];

export default function Ecosystem() {
  const [filter, setFilter] = useState('all');

  const filteredApps = filter === 'all' ? APPS : APPS.filter(app => app.c === filter);

  const getStatusColor = (status) => {
    if (status.startsWith('Live')) return 'var(--ok)';
    if (status.startsWith('Coming')) return 'var(--text-mute)';
    return 'var(--warn)';
  };

  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <Reveal><span className="eyebrow">Ecosystem</span></Reveal>
          <div className="page-hero-row" style={{ marginTop: '14px' }}>
            <Reveal delay={1}><h1>One chain.<br/>Every category.</h1></Reveal>
            <Reveal delay={2}>
              <p className="lead" style={{ maxWidth: '42ch' }}>
                Exbotix is built to host the full spectrum of on-chain apps. Here's what's live on testnet, what's in build, and where you can plug in.
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      {/* Filter */}
      <section className="wrap" style={{ marginTop: '24px' }}>
        <Reveal>
          <div className="tag-row" id="filters">
            <button
              className={`chip filter ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >All</button>
            <button
              className={`chip filter ${filter === 'ai' ? 'active' : ''}`}
              onClick={() => setFilter('ai')}
            >AI</button>
            <button
              className={`chip filter ${filter === 'defi' ? 'active' : ''}`}
              onClick={() => setFilter('defi')}
            >DeFi</button>
            <button
              className={`chip filter ${filter === 'cex' ? 'active' : ''}`}
              onClick={() => setFilter('cex')}
            >CEX</button>
            <button
              className={`chip filter ${filter === 'social' ? 'active' : ''}`}
              onClick={() => setFilter('social')}
            >SocialFi</button>
            <button
              className={`chip filter ${filter === 'games' ? 'active' : ''}`}
              onClick={() => setFilter('games')}
            >Games</button>
            <button
              className={`chip filter ${filter === 'rwa' ? 'active' : ''}`}
              onClick={() => setFilter('rwa')}
            >RWA</button>
          </div>
        </Reveal>
      </section>

      <section className="section-pad" style={{ paddingTop: '36px' }}>
        <div className="wrap">
          <div className="grid cols-3">
            {filteredApps.map((app, i) => {
              const statusColor = getStatusColor(app.s);
              return (
                <Reveal key={i}>
                  <div className="card eco-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div className="eco-icon">{app.g}</div>
                      <span
                        className="chip"
                        style={{ color: statusColor, borderColor: statusColor + '33' }}
                      >
                        <span
                          className="dot"
                          style={{ background: statusColor, boxShadow: `0 0 10px ${statusColor}` }}
                        ></span>
                        {app.s}
                      </span>
                    </div>
                    <div>
                      <h3 style={{ marginTop: '18px' }}>{app.n}</h3>
                      <p>{app.d}</p>
                    </div>
                    <div className="stat">// {app.c.toUpperCase()}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Build CTA */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="cta-final">
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Builders wanted</span>
              <h2 className="h-lg" style={{ margin: '16px 0 14px' }}>Bring your dApp to Exbotix</h2>
              <p className="lead" style={{ margin: '0 auto 28px' }}>
                Grants, technical support and a community of early adopters are waiting. If you can build on Ethereum, you can build here.
              </p>
              <div className="hero-cta" style={{ justifyContent: 'center' }}>
                <Link to="/docs" className="btn btn-primary">Start building</Link>
                <Link to="/community" className="btn btn-ghost">Apply for a grant</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .filter {
          cursor: pointer;
          background: rgba(255,255,255,.02);
          transition: all .2s;
        }
        .filter:hover {
          border-color: var(--accent);
          color: var(--accent);
        }
        .filter.active {
          background: rgba(157,92,255,.12);
          border-color: var(--accent);
          color: var(--accent);
        }
      `}</style>
    </>
  );
}
