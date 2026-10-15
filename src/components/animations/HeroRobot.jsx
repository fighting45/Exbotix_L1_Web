export default function HeroRobot() {
  return (
    <div className="hero-robot">
      <div className="orbit o1">
        <div className="coin top"><span>₿</span></div>
        <div className="coin right"><span>Ξ</span></div>
        <div className="coin bottom"><span>◎</span></div>
        <div className="coin left"><span>₮</span></div>
      </div>
      <div className="orbit o3">
        <div className="coin top"><span>E</span></div>
        <div className="coin bottom"><span>◈</span></div>
      </div>
      <svg viewBox="0 0 320 360" aria-label="ExBeast robot">
        <defs>
          <linearGradient id="hmetal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#222A1A"/>
            <stop offset="1" stopColor="#10140C"/>
          </linearGradient>
          <linearGradient id="hedge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#D6FF66"/>
            <stop offset="1" stopColor="#8FCC00"/>
          </linearGradient>
          <radialGradient id="hcore" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#F4FAE6"/>
            <stop offset="35%" stopColor="#C8F23A"/>
            <stop offset="100%" stopColor="#557F00"/>
          </radialGradient>
          <filter id="hglow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="b"/>
            <feMerge>
              <feMergeNode in="b"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* shoulders / arms */}
        <path d="M44 196 L96 184 L92 250 L52 262 Z" fill="url(#hmetal)" stroke="url(#hedge)" strokeWidth="2"/>
        <path d="M276 196 L224 184 L228 250 L268 262 Z" fill="url(#hmetal)" stroke="url(#hedge)" strokeWidth="2"/>
        <circle cx="58" cy="258" r="13" fill="#10140C" stroke="url(#hedge)" strokeWidth="2"/>
        <circle cx="262" cy="258" r="13" fill="#10140C" stroke="url(#hedge)" strokeWidth="2"/>

        {/* torso */}
        <path d="M96 188 L224 188 L208 320 L112 320 Z" fill="url(#hmetal)" stroke="url(#hedge)" strokeWidth="2.5"/>
        <path d="M120 214 H200 M116 246 H204" stroke="rgba(200,242,58,.3)" strokeWidth="1.5"/>

        {/* core */}
        <g filter="url(#hglow)">
          <circle cx="160" cy="244" r="26" fill="url(#hcore)"/>
          <circle cx="160" cy="244" r="34" fill="none" stroke="url(#hedge)" strokeWidth="2.5"/>
          <circle cx="160" cy="244" r="34" fill="none" stroke="#D6FF66" strokeWidth="1" strokeDasharray="5 9">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 160 244"
              to="360 160 244"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* neck */}
        <path d="M142 170 H178 L172 190 H148 Z" fill="url(#hmetal)" stroke="url(#hedge)" strokeWidth="1.5"/>

        {/* head */}
        <path d="M118 78 L202 78 L216 124 L194 170 L126 170 L104 124 Z" fill="url(#hmetal)" stroke="url(#hedge)" strokeWidth="2.5"/>
        <rect x="128" y="106" width="64" height="28" rx="7" fill="#080A06" stroke="rgba(200,242,58,.5)" strokeWidth="1.5"/>
        <circle className="hr-eye" cx="146" cy="120" r="6.5" fill="#D6FF66" filter="url(#hglow)"/>
        <circle className="hr-eye" cx="174" cy="120" r="6.5" fill="#D6FF66" filter="url(#hglow)"/>
        <path d="M124 150 H196" stroke="rgba(200,242,58,.4)" strokeWidth="1.5"/>

        {/* antenna */}
        <path d="M160 78 V48" stroke="url(#hedge)" strokeWidth="2.5"/>
        <circle cx="160" cy="42" r="5.5" fill="#D6FF66" filter="url(#hglow)"/>
      </svg>
    </div>
  );
}
