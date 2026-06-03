import { useEffect, useRef, useState } from 'react';

const PARTS = [
  { id: "r-core",      s: 0.00, e: 0.18, x: 0,    y: 0,   r: -180, sc: 0.2 },
  { id: "r-torso",     s: 0.06, e: 0.30, x: 0,    y: 120, r: 0,    sc: 0.8 },
  { id: "r-shoulderL", s: 0.18, e: 0.42, x: -160, y: 0,   r: -40,  sc: 1 },
  { id: "r-shoulderR", s: 0.18, e: 0.42, x: 160,  y: 0,   r: 40,   sc: 1 },
  { id: "r-armL",      s: 0.30, e: 0.54, x: -220, y: 80,  r: -25,  sc: 1 },
  { id: "r-armR",      s: 0.30, e: 0.54, x: 220,  y: 80,  r: 25,   sc: 1 },
  { id: "r-neck",      s: 0.40, e: 0.58, x: 0,    y: 40,  r: 0,    sc: 1 },
  { id: "r-head",      s: 0.46, e: 0.70, x: 0,    y: -180,r: 0,    sc: 1 },
  { id: "r-antenna",   s: 0.64, e: 0.82, x: 0,    y: -60, r: 0,    sc: 0.4 },
  { id: "r-base",      s: 0.10, e: 0.32, x: 0,    y: 160, r: 0,    sc: 1 },
];

const CALLOUTS = [0.22, 0.42, 0.62, 0.82];

function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
function lerp(a, b, t) { return a + (b - a) * t; }

export default function RobotAssembly() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [partStates, setPartStates] = useState({});
  const [calloutStates, setCalloutStates] = useState([false, false, false, false]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = clamp(-rect.top / total, 0, 1);

      setProgress(p);

      // Calculate transforms for each part
      const states = {};
      for (const part of PARTS) {
        const local = easeOut(clamp((p - part.s) / (part.e - part.s), 0, 1));
        const x = lerp(part.x, 0, local);
        const y = lerp(part.y, 0, local);
        const r = lerp(part.r, 0, local);
        const sc = lerp(part.sc, 1, local);
        states[part.id] = {
          transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${r.toFixed(1)}deg) scale(${sc.toFixed(3)})`,
          opacity: clamp(local * 1.6, 0, 1)
        };
      }
      setPartStates(states);

      // Update callouts
      setCalloutStates(CALLOUTS.map(threshold => p >= threshold));
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const getPartStyle = (id) => partStates[id] || { transform: 'none', opacity: 0.08 };

  return (
    <section className="assembly" ref={sectionRef}>
      <div className="assembly-sticky">
        <div className="assembly-head">
          <span className="eyebrow">Engineered to assemble</span>
          <h2 className="h-lg" style={{ marginTop: '14px' }}>Scroll to build the machine</h2>
        </div>
        <div className="assembly-stage">
          {/* LEFT callouts */}
          <div className={`callout left ${calloutStates[0] ? 'show' : ''}`} style={{ top: '34%' }}>
            <div className="c-num">01 / CORE</div>
            <div className="c-title">EVM Equivalence <span className="dot"></span></div>
            <div className="c-desc">Deploy any Solidity contract unchanged. Your existing tooling, wallets and audits just work.</div>
          </div>
          <div className={`callout left ${calloutStates[2] ? 'show' : ''}`} style={{ top: '60%' }}>
            <div className="c-num">03 / SECURITY</div>
            <div className="c-title">Proof-of-Work secured</div>
            <div className="c-desc">Battle-tested consensus anchoring every block on a transparent, permissionless network.</div>
          </div>

          {/* RIGHT callouts */}
          <div className={`callout right ${calloutStates[1] ? 'show' : ''}`} style={{ top: '30%' }}>
            <div className="c-num">02 / FABRIC</div>
            <div className="c-title">Unified ecosystem</div>
            <div className="c-desc">AI agents, CEX rails, DeFi and SocialFi share one settlement layer and one gas token — EXBT.</div>
          </div>
          <div className={`callout right ${calloutStates[3] ? 'show' : ''}`} style={{ top: '62%' }}>
            <div className="c-num">04 / PEOPLE</div>
            <div className="c-title">Community governed</div>
            <div className="c-desc">For the community, by the community. Holders steer the treasury, grants and roadmap.</div>
          </div>

          {/* ROBOT */}
          <div className="robot-wrap">
            <svg viewBox="0 0 520 560" aria-label="Exbotix mech assembling">
              <defs>
                <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#2A1D4A" />
                  <stop offset="1" stopColor="#140C28" />
                </linearGradient>
                <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#B98CFF" />
                  <stop offset="1" stopColor="#7A5CFF" />
                </linearGradient>
                <radialGradient id="reactor" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="#F3E8FF" />
                  <stop offset="35%" stopColor="#B98CFF" />
                  <stop offset="100" stopColor="#5B3CC4" />
                </radialGradient>
                <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="7" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* BASE */}
              <g id="r-base" style={getPartStyle('r-base')}>
                <ellipse cx="260" cy="510" rx="150" ry="26" fill="#140C28" stroke="var(--line-2)" strokeWidth="1" />
                <path d="M150 505 L260 480 L370 505 L260 528 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="1.5" />
              </g>

              {/* TORSO */}
              <g id="r-torso" style={getPartStyle('r-torso')}>
                <path d="M180 300 L340 300 L320 470 L200 470 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="2" />
                <path d="M210 330 H310 M205 370 H315 M212 410 H308" stroke="rgba(185,140,255,.35)" strokeWidth="1.5" />
                <path d="M232 440 L288 440 L280 462 L240 462 Z" fill="#140C28" stroke="rgba(185,140,255,.4)" strokeWidth="1.5" />
              </g>

              {/* CORE / REACTOR */}
              <g id="r-core" filter="url(#glow)" style={getPartStyle('r-core')}>
                <circle cx="260" cy="360" r="34" fill="url(#reactor)" />
                <circle cx="260" cy="360" r="44" fill="none" stroke="url(#edge)" strokeWidth="2.5" />
                <circle cx="260" cy="360" r="44" fill="none" stroke="#B98CFF" strokeWidth="1" strokeDasharray="6 10">
                  <animateTransform attributeName="transform" type="rotate" from="0 260 360" to="360 260 360" dur="9s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* SHOULDERS */}
              <g id="r-shoulderL" style={getPartStyle('r-shoulderL')}>
                <path d="M120 305 L195 295 L188 350 L130 358 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="2" />
              </g>
              <g id="r-shoulderR" style={getPartStyle('r-shoulderR')}>
                <path d="M400 305 L325 295 L332 350 L390 358 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="2" />
              </g>

              {/* ARMS */}
              <g id="r-armL" style={getPartStyle('r-armL')}>
                <path d="M118 320 L160 330 L150 455 L108 445 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="2" />
                <circle cx="129" cy="450" r="14" fill="#140C28" stroke="url(#edge)" strokeWidth="2" />
              </g>
              <g id="r-armR" style={getPartStyle('r-armR')}>
                <path d="M402 320 L360 330 L370 455 L412 445 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="2" />
                <circle cx="391" cy="450" r="14" fill="#140C28" stroke="url(#edge)" strokeWidth="2" />
              </g>

              {/* NECK */}
              <g id="r-neck" style={getPartStyle('r-neck')}>
                <path d="M235 280 H285 L278 305 H242 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="1.5" />
              </g>

              {/* HEAD */}
              <g id="r-head" style={getPartStyle('r-head')}>
                <path d="M205 165 L315 165 L330 225 L300 280 L220 280 L190 225 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="2.5" />
                <rect x="218" y="200" width="84" height="34" rx="8" fill="#0A0613" stroke="rgba(185,140,255,.5)" strokeWidth="1.5" />
                <circle className="r-eye" cx="240" cy="217" r="7" fill="#B98CFF" style={{ opacity: progress > 0.68 ? 1 : 0.12, transition: 'opacity .4s' }} />
                <circle className="r-eye" cx="280" cy="217" r="7" fill="#B98CFF" style={{ opacity: progress > 0.68 ? 1 : 0.12, transition: 'opacity .4s' }} />
                <path d="M212 250 H308" stroke="rgba(185,140,255,.4)" strokeWidth="1.5" />
              </g>

              {/* ANTENNA */}
              <g id="r-antenna" style={getPartStyle('r-antenna')}>
                <path d="M260 165 V120" stroke="url(#edge)" strokeWidth="2.5" />
                <circle cx="260" cy="114" r="6" fill="#B98CFF" filter="url(#glow)" />
              </g>
            </svg>
          </div>
        </div>
        <div className="assembly-progress-line">
          <i style={{ width: `${(progress * 100).toFixed(1)}%` }}></i>
        </div>
      </div>
    </section>
  );
}
