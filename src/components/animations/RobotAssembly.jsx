import { useEffect, useRef, useState } from 'react';

export default function RobotAssembly() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate progress (0 to 1)
      const start = rect.top;
      const range = sectionHeight - viewportHeight;
      const scrolled = -start;
      const p = Math.max(0, Math.min(1, scrolled / range));

      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity for each part based on progress
  const getPartOpacity = (threshold) => {
    return progress >= threshold ? 1 : 0.08;
  };

  const getPartTransform = (threshold, translateY = 0) => {
    const opacity = getPartOpacity(threshold);
    if (opacity < 1) {
      return `translateY(${translateY}px) scale(0.95)`;
    }
    return 'translateY(0) scale(1)';
  };

  return (
    <section className="assembly" ref={sectionRef}>
      <div className="assembly-sticky">
        <div className="assembly-head">
          <span className="eyebrow">Engineered to assemble</span>
          <h2 className="h-lg" style={{ marginTop: '14px' }}>Scroll to build the machine</h2>
        </div>
        <div className="assembly-stage">
          {/* LEFT callouts */}
          <div className="callout left" style={{ top: '34%' }}>
            <div className="c-num">01 / CORE</div>
            <div className="c-title">EVM Equivalence <span className="dot"></span></div>
            <div className="c-desc">Deploy any Solidity contract unchanged. Your existing tooling, wallets and audits just work.</div>
          </div>
          <div className="callout left" style={{ top: '60%' }}>
            <div className="c-num">03 / SECURITY</div>
            <div className="c-title">Proof-of-Work secured</div>
            <div className="c-desc">Battle-tested consensus anchoring every block on a transparent, permissionless network.</div>
          </div>

          {/* RIGHT callouts */}
          <div className="callout right" style={{ top: '30%' }}>
            <div className="c-num">02 / FABRIC</div>
            <div className="c-title">Unified ecosystem</div>
            <div className="c-desc">AI agents, CEX rails, DeFi and SocialFi share one settlement layer and one gas token — EXBT.</div>
          </div>
          <div className="callout right" style={{ top: '62%' }}>
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
                  <stop offset="100%" stopColor="#5B3CC4" />
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
              <g id="r-base" style={{ opacity: getPartOpacity(0), transform: getPartTransform(0, 20), transformOrigin: 'center', transition: 'all 0.4s ease-out' }}>
                <ellipse cx="260" cy="510" rx="150" ry="26" fill="#140C28" stroke="var(--line-2)" strokeWidth="1" />
                <path d="M150 505 L260 480 L370 505 L260 528 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="1.5" />
              </g>

              {/* TORSO */}
              <g id="r-torso" style={{ opacity: getPartOpacity(0.15), transform: getPartTransform(0.15, 30), transformOrigin: 'center', transition: 'all 0.4s ease-out' }}>
                <path d="M180 300 L340 300 L320 470 L200 470 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="2" />
                <path d="M210 330 H310 M205 370 H315 M212 410 H308" stroke="rgba(185,140,255,.35)" strokeWidth="1.5" />
                <path d="M232 440 L288 440 L280 462 L240 462 Z" fill="#140C28" stroke="rgba(185,140,255,.4)" strokeWidth="1.5" />
              </g>

              {/* CORE / REACTOR */}
              <g id="r-core" filter="url(#glow)" style={{ opacity: getPartOpacity(0.3), transform: getPartTransform(0.3), transformOrigin: 'center', transition: 'all 0.4s ease-out' }}>
                <circle cx="260" cy="360" r="34" fill="url(#reactor)" />
                <circle cx="260" cy="360" r="44" fill="none" stroke="url(#edge)" strokeWidth="2.5" />
                <circle cx="260" cy="360" r="44" fill="none" stroke="#B98CFF" strokeWidth="1" strokeDasharray="6 10">
                  <animateTransform attributeName="transform" type="rotate" from="0 260 360" to="360 260 360" dur="9s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* SHOULDERS */}
              <g id="r-shoulderL" style={{ opacity: getPartOpacity(0.45), transform: getPartTransform(0.45, 15), transformOrigin: 'center', transition: 'all 0.4s ease-out' }}>
                <path d="M120 305 L195 295 L188 350 L130 358 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="2" />
              </g>
              <g id="r-shoulderR" style={{ opacity: getPartOpacity(0.45), transform: getPartTransform(0.45, 15), transformOrigin: 'center', transition: 'all 0.4s ease-out' }}>
                <path d="M400 305 L325 295 L332 350 L390 358 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="2" />
              </g>

              {/* ARMS */}
              <g id="r-armL" style={{ opacity: getPartOpacity(0.55), transform: getPartTransform(0.55, 25), transformOrigin: 'center', transition: 'all 0.4s ease-out' }}>
                <path d="M118 320 L160 330 L150 455 L108 445 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="2" />
                <circle cx="129" cy="450" r="14" fill="#140C28" stroke="url(#edge)" strokeWidth="2" />
              </g>
              <g id="r-armR" style={{ opacity: getPartOpacity(0.55), transform: getPartTransform(0.55, 25), transformOrigin: 'center', transition: 'all 0.4s ease-out' }}>
                <path d="M402 320 L360 330 L370 455 L412 445 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="2" />
                <circle cx="391" cy="450" r="14" fill="#140C28" stroke="url(#edge)" strokeWidth="2" />
              </g>

              {/* NECK */}
              <g id="r-neck" style={{ opacity: getPartOpacity(0.65), transform: getPartTransform(0.65, 10), transformOrigin: 'center', transition: 'all 0.4s ease-out' }}>
                <path d="M235 280 H285 L278 305 H242 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="1.5" />
              </g>

              {/* HEAD */}
              <g id="r-head" style={{ opacity: getPartOpacity(0.75), transform: getPartTransform(0.75, 20), transformOrigin: 'center', transition: 'all 0.4s ease-out' }}>
                <path d="M205 165 L315 165 L330 225 L300 280 L220 280 L190 225 Z" fill="url(#metal)" stroke="url(#edge)" strokeWidth="2.5" />
                <rect x="218" y="200" width="84" height="34" rx="8" fill="#0A0613" stroke="rgba(185,140,255,.5)" strokeWidth="1.5" />
                <circle className="r-eye" cx="240" cy="217" r="7" fill="#B98CFF" style={{ opacity: progress >= 0.85 ? 1 : 0.12, transition: 'opacity .4s' }} />
                <circle className="r-eye" cx="280" cy="217" r="7" fill="#B98CFF" style={{ opacity: progress >= 0.85 ? 1 : 0.12, transition: 'opacity .4s' }} />
                <path d="M212 250 H308" stroke="rgba(185,140,255,.4)" strokeWidth="1.5" />
              </g>

              {/* ANTENNA */}
              <g id="r-antenna" style={{ opacity: getPartOpacity(0.9), transform: getPartTransform(0.9, 15), transformOrigin: 'center', transition: 'all 0.4s ease-out' }}>
                <path d="M250 160 L260 110 L270 160" fill="none" stroke="url(#edge)" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="260" cy="106" r="6" fill="#B98CFF" filter="url(#glow)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
