import { useState } from 'react';
import Reveal from '../components/common/Reveal';

export default function Community() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.indexOf('@') > 0) {
      // Show toast (would use toast system)
      setEmail('');
      alert('Subscribed! Welcome to the Exbotix community');
    } else {
      alert('Enter a valid email');
    }
  };

  return (
    <>
      <header className="page-hero">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <Reveal><span className="eyebrow" style={{ justifyContent: 'center' }}>Community</span></Reveal>
          <Reveal delay={1}>
            <h1 style={{ marginTop: '14px' }}>Built by everyone,<br/>owned by everyone</h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="lead" style={{ margin: '18px auto 0' }}>
              Join thousands of builders, stakers and believers shaping Exbotix. Jump into the conversation, follow the latest, and help govern the chain.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="hero-cta" style={{ justifyContent: 'center', marginTop: '26px' }}>
              <a href="https://www.linkedin.com/company/exbotix/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Join LinkedIn</a>
              <a href="https://x.com/exbotix" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Follow on X</a>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Community Stats */}
      <section className="wrap" style={{ marginTop: '30px' }}>
        <Reveal>
          <div className="stat-strip" style={{ borderRadius: 'var(--r-lg)' }}>
            <div className="statbox"><div className="big">38K</div><div className="lab">LinkedIn followers</div></div>
            <div className="statbox"><div className="big">62K</div><div className="lab">X followers</div></div>
            <div className="statbox"><div className="big">1,840</div><div className="lab">Stakers</div></div>
            <div className="statbox"><div className="big">90+</div><div className="lab">Countries</div></div>
          </div>
        </Reveal>
      </section>

      {/* Channels */}
      <section className="section-pad">
        <div className="wrap">
          <Reveal>
            <div style={{ marginBottom: '34px' }}>
              <span className="eyebrow">Where we gather</span>
              <h2 className="h-lg" style={{ marginTop: '14px' }}>Find your channel</h2>
            </div>
          </Reveal>
          <div className="grid cols-4">
            <Reveal delay={1}>
              <a href="https://x.com/exbotix" target="_blank" rel="noopener noreferrer" className="card" style={{ padding: '28px', display: 'block' }}>
                <div className="eco-icon" style={{ width: '46px', height: '46px' }}>✕</div>
                <h3 style={{ fontSize: '19px', marginTop: '16px' }}>X / Twitter</h3>
                <p className="text-dim" style={{ fontSize: '14px', marginTop: '6px' }}>
                  News, alpha and announcements.
                </p>
              </a>
            </Reveal>
            <Reveal delay={2}>
              <a href="https://www.linkedin.com/company/exbotix/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="card" style={{ padding: '28px', display: 'block' }}>
                <div className="eco-icon" style={{ width: '46px', height: '46px' }}>◓</div>
                <h3 style={{ fontSize: '19px', marginTop: '16px' }}>LinkedIn</h3>
                <p className="text-dim" style={{ fontSize: '14px', marginTop: '6px' }}>
                  Professional network and updates.
                </p>
              </a>
            </Reveal>
            <Reveal delay={3}>
              <a href="#" className="card" style={{ padding: '28px', display: 'block' }}>
                <div className="eco-icon" style={{ width: '46px', height: '46px' }}>✈</div>
                <h3 style={{ fontSize: '19px', marginTop: '16px' }}>Telegram</h3>
                <p className="text-dim" style={{ fontSize: '14px', marginTop: '6px' }}>
                  Real-time community discussion.
                </p>
              </a>
            </Reveal>
            <Reveal delay={4}>
              <a href="#" className="card" style={{ padding: '28px', display: 'block' }}>
                <div className="eco-icon" style={{ width: '46px', height: '46px' }}>⬡</div>
                <h3 style={{ fontSize: '19px', marginTop: '16px' }}>Governance</h3>
                <p className="text-dim" style={{ fontSize: '14px', marginTop: '6px' }}>
                  Propose and vote on the future.
                </p>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap', marginBottom: '34px' }}>
              <div>
                <span className="eyebrow">From the blog</span>
                <h2 className="h-lg" style={{ marginTop: '14px' }}>Latest updates</h2>
              </div>
              <a href="#" className="btn btn-ghost">View all posts</a>
            </div>
          </Reveal>
          <div className="grid cols-3">
            <Reveal delay={1}>
              <a href="#" className="card post-card">
                <div className="thumb"><span className="glyph">⬡</span></div>
                <div className="body">
                  <div className="meta">Announcement · May 2026</div>
                  <h3>Exbotix Testnet is live on Chain ID 11211</h3>
                  <p>Our public testnet is open. Add the network, grab faucet EXBT, and deploy your first contract today.</p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={2}>
              <a href="#" className="card post-card">
                <div className="thumb"><span className="glyph">◈</span></div>
                <div className="body">
                  <div className="meta">Deep dive · May 2026</div>
                  <h3>Why we converged AI, DeFi and SocialFi</h3>
                  <p>The thesis behind a single settlement layer for the next generation of on-chain apps.</p>
                </div>
              </a>
            </Reveal>
            <Reveal delay={3}>
              <a href="#" className="card post-card">
                <div className="thumb"><span className="glyph">🔒</span></div>
                <div className="body">
                  <div className="meta">Product · Apr 2026</div>
                  <h3>Staking design: earning 8% APY safely</h3>
                  <p>How non-custodial staking secures Exbotix and rewards long-term holders.</p>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div>
                <h2 className="h-md">Stay in the loop</h2>
                <p className="text-dim" style={{ marginTop: '8px' }}>
                  Monthly updates on releases, grants and ecosystem launches.
                </p>
              </div>
              <form className="hero-cta" style={{ gap: '10px' }} onSubmit={handleSubscribe}>
                <input
                  className="field"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: '13px 18px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'var(--text)',
                    minWidth: '240px'
                  }}
                />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
