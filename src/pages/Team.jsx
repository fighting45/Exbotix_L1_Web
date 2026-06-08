import { Link } from 'react-router-dom';
import Reveal from '../components/common/Reveal';

const TEAM_MEMBERS = {
  founders: [
    {
      name: 'Bilal Ashfaq',
      role: 'Founder',
      image: 'bilal-ashfaq.jpeg',
      bgSize: '136%',
      bgPosition: '50% 13%'
    },
    {
      name: 'Reza Nedjatian',
      role: 'Co-Founder',
      image: 'reza-nedjatian.jpeg',
      bgSize: '118%',
      bgPosition: '50% 12%'
    }
  ],
  leadership: [
    {
      name: 'Lou Yong Liang, Noel',
      role: 'Chief Technology Officer',
      image: 'noel-lou.jpeg',
      bgSize: '140%',
      bgPosition: '50% 15%'
    },
    {
      name: 'Korina Villanueva',
      role: 'Chief Operating Officer',
      image: 'korina-villanueva.jpeg',
      bgSize: '150%',
      bgPosition: '50% 6%'
    },
    {
      name: 'Hussnain Junaid',
      role: 'Chief Marketing Officer',
      image: 'hussnain-junaid.jpeg',
      bgSize: '290%',
      bgPosition: '50% 2%'
    }
  ],
  growth: [
    {
      name: 'Muhammad Afzaal Khan',
      role: 'Business Development Manager',
      image: 'afzaal-khan.jpeg',
      bgSize: '140%',
      bgPosition: '50% 17%'
    },
    {
      name: 'H M Adeel Siddique',
      role: 'Business Development Manager',
      image: 'adeel-siddique.jpeg',
      bgSize: '150%',
      bgPosition: '47% 13%'
    },
    {
      name: 'Patrycja Murawska',
      role: 'PR Manager',
      image: 'patrycja-murawska.jpeg',
      bgSize: '120%',
      bgPosition: '50% 8%'
    }
  ]
};

export default function Team() {
  return (
    <>
      <style>{`
        .tm-section { position: relative; padding: 48px 0 110px; overflow: hidden; }
        .tm-wave {
          position: absolute; top: 40px; left: 50%; transform: translateX(-50%);
          width: 1600px; max-width: none; height: 100%;
          z-index: 0; pointer-events: none;
          opacity: .55;
          filter: drop-shadow(0 0 14px rgba(157,92,255,.35));
        }
        .tm-section .wrap { position: relative; z-index: 1; }

        .tm-grouphead { display: flex; align-items: center; gap: 18px; margin: 46px 0 36px; }
        .tm-grouphead:first-child { margin-top: 8px; }
        .tm-kicker {
          font-family: var(--font-mono); font-size: 12px; letter-spacing: .26em;
          text-transform: uppercase; color: var(--accent-3); white-space: nowrap;
        }
        .tm-line { flex: 1; height: 1px; background: linear-gradient(90deg, var(--line-2), transparent); }

        .tm-row { display: grid; gap: 30px 26px; justify-items: center; }
        .tm-row-founders { grid-template-columns: repeat(2, minmax(0, 280px)); justify-content: center; gap: 30px 80px; margin-bottom: 8px; }
        .tm-row-3 { grid-template-columns: repeat(3, 1fr); margin-bottom: 8px; }

        .tm { display: flex; flex-direction: column; align-items: center; text-align: center; margin: 0; max-width: 260px; }
        .tm-ring {
          --ring: 192px;
          width: var(--ring); height: var(--ring);
          border-radius: 50%;
          padding: 3px;
          background:
            conic-gradient(from 150deg, var(--accent), var(--accent-2) 40%, rgba(157,92,255,.15) 62%, var(--accent-mag) 88%, var(--accent));
          box-shadow: 0 0 0 1px rgba(157,92,255,.18), 0 22px 48px -22px rgba(0,0,0,.85);
          transition: transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s, filter .45s;
        }
        .tm-lg .tm-ring { --ring: 224px; }
        .tm-photo {
          width: 100%; height: 100%;
          border-radius: 50%;
          background-color: #f4f1fb;
          background-repeat: no-repeat;
          position: relative;
          box-shadow: inset 0 0 0 4px var(--bg);
        }
        .tm-photo::after {
          content: ""; position: absolute; inset: 0; border-radius: 50%;
          background: linear-gradient(180deg, transparent 58%, rgba(10,6,19,.34));
          pointer-events: none;
        }
        .tm:hover .tm-ring {
          transform: translateY(-8px);
          box-shadow: 0 0 0 1px rgba(157,92,255,.4), 0 0 46px -6px var(--accent-glow), 0 30px 60px -26px rgba(0,0,0,.9);
          filter: saturate(1.08);
        }

        .tm figcaption { margin-top: 20px; }
        .tm-name {
          font-family: var(--font-display); font-weight: 600; font-size: 18px;
          letter-spacing: -.02em; color: var(--text);
          transition: color .3s; line-height: 1.18;
        }
        .tm-lg .tm-name { font-size: 21px; }
        .tm:hover .tm-name { color: var(--accent-3); }
        .tm-role {
          margin-top: 6px;
          font-family: var(--font-mono); font-size: 12px; letter-spacing: .03em;
          color: var(--text-mute); text-wrap: balance;
        }
        .tm-lg .tm-role { color: var(--text-dim); font-size: 12.5px; }

        @media (max-width: 860px){
          .tm-row-3 { grid-template-columns: repeat(2, 1fr); gap: 36px 20px; }
          .tm-ring { --ring: 168px; }
          .tm-lg .tm-ring { --ring: 188px; }
          .tm-wave { opacity: .4; }
        }
        @media (max-width: 560px){
          .tm-row-founders { grid-template-columns: 1fr; gap: 36px; }
          .tm-row-3 { grid-template-columns: 1fr; }
          .tm-ring { --ring: 176px; }
        }
      `}</style>

      <header className="page-hero">
        <div className="wrap">
          <Reveal><span className="eyebrow">People</span></Reveal>
          <div className="page-hero-row" style={{ marginTop: '14px' }}>
            <Reveal delay={1}>
              <h1>The minds<br/>behind <span className="gradtext">Exbotix</span>.</h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="lead" style={{ maxWidth: '46ch' }}>
                Eight operators across engineering, growth and community — building one Layer&nbsp;1 where AI, DeFi, CEX and SocialFi converge.
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="tm-section">
        <svg className="tm-wave" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#9D5CFF" stopOpacity="0"/>
              <stop offset="0.5" stopColor="#9D5CFF" stopOpacity="0.9"/>
              <stop offset="1" stopColor="#D14BFF" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="waveGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#6E54F2" stopOpacity="0"/>
              <stop offset="0.5" stopColor="#6E54F2" stopOpacity="0.7"/>
              <stop offset="1" stopColor="#9D5CFF" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M-40 250 C 280 120, 460 380, 760 300 S 1240 140, 1500 280" fill="none" stroke="url(#waveGrad)" strokeWidth="1.5"/>
          <path d="M-40 300 C 300 180, 480 440, 780 360 S 1260 210, 1500 340" fill="none" stroke="url(#waveGrad2)" strokeWidth="1"/>
          <path d="M-40 620 C 320 520, 520 760, 820 660 S 1280 520, 1500 640" fill="none" stroke="url(#waveGrad)" strokeWidth="1.4"/>
          <path d="M-40 670 C 300 580, 540 820, 840 720 S 1300 590, 1500 700" fill="none" stroke="url(#waveGrad2)" strokeWidth="1"/>
        </svg>

        <div className="wrap">
          {/* FOUNDERS */}
          <div className="tm-grouphead reveal">
            <span className="tm-kicker">Founders</span>
            <span className="tm-line"></span>
          </div>
          <div className="tm-row tm-row-founders">
            {TEAM_MEMBERS.founders.map((member, i) => (
              <Reveal key={member.name} delay={i + 1}>
                <figure className="tm tm-lg">
                  <div className="tm-ring">
                    <div
                      className="tm-photo"
                      style={{
                        backgroundImage: `url('/assets/img/team/${member.image}')`,
                        backgroundSize: member.bgSize,
                        backgroundPosition: member.bgPosition
                      }}
                    ></div>
                  </div>
                  <figcaption>
                    <div className="tm-name">{member.name}</div>
                    <div className="tm-role">{member.role}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {/* LEADERSHIP */}
          <div className="tm-grouphead reveal">
            <span className="tm-kicker">Leadership</span>
            <span className="tm-line"></span>
          </div>
          <div className="tm-row tm-row-3">
            {TEAM_MEMBERS.leadership.map((member, i) => (
              <Reveal key={member.name} delay={i + 1}>
                <figure className="tm">
                  <div className="tm-ring">
                    <div
                      className="tm-photo"
                      style={{
                        backgroundImage: `url('/assets/img/team/${member.image}')`,
                        backgroundSize: member.bgSize,
                        backgroundPosition: member.bgPosition
                      }}
                    ></div>
                  </div>
                  <figcaption>
                    <div className="tm-name">{member.name}</div>
                    <div className="tm-role">{member.role}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {/* GROWTH & COMMUNICATIONS */}
          <div className="tm-grouphead reveal">
            <span className="tm-kicker">Growth &amp; Communications</span>
            <span className="tm-line"></span>
          </div>
          <div className="tm-row tm-row-3">
            {TEAM_MEMBERS.growth.map((member, i) => (
              <Reveal key={member.name} delay={i + 1}>
                <figure className="tm">
                  <div className="tm-ring">
                    <div
                      className="tm-photo"
                      style={{
                        backgroundImage: `url('/assets/img/team/${member.image}')`,
                        backgroundSize: member.bgSize,
                        backgroundPosition: member.bgPosition
                      }}
                    ></div>
                  </div>
                  <figcaption>
                    <div className="tm-name">{member.name}</div>
                    <div className="tm-role">{member.role}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ paddingTop: '24px' }}>
        <div className="wrap">
          <Reveal>
            <div className="cta-final">
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Join us</span>
              <h2 className="h-lg" style={{ margin: '16px 0 14px' }}>Build the next chapter with us</h2>
              <p className="lead" style={{ margin: '0 auto 28px' }}>
                We're growing the team across engineering, ecosystem and community. If you want to ship at the frontier of on-chain AI, let's talk.
              </p>
              <div className="hero-cta" style={{ justifyContent: 'center' }}>
                <Link to="/community" className="btn btn-primary">See open roles</Link>
                <Link to="/ecosystem" className="btn btn-ghost">Explore the ecosystem</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
