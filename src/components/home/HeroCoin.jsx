import { useEffect, useRef } from 'react';

export default function HeroCoin() {
  const tiltRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const handleMouseMove = (e) => {
      if (!tiltRef.current) return;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      tiltRef.current.style.transform =
        `perspective(900px) rotateY(${(x * 22).toFixed(1)}deg) rotateX(${(-y * 18).toFixed(1)}deg) translate(${(x * 18).toFixed(1)}px,${(y * 14).toFixed(1)}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="x-coin" aria-hidden="true">
      <div className="ring"></div>
      <div className="ring r2"></div>
      <div className="glow"></div>
      <div className="tilt" ref={tiltRef}>
        <img src="/assets/img/exbt-coin.png" alt="" />
      </div>
    </div>
  );
}
