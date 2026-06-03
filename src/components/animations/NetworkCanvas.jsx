import { useEffect, useRef } from 'react';

export default function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h, dpr, nodes = [], raf;
    const COUNT = window.innerWidth < 760 ? 26 : 54;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    }

    function make() {
      nodes = [];
      for (let i = 0; i < COUNT; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.12 * dpr,
          vy: (Math.random() - 0.5) * 0.12 * dpr,
          r: (Math.random() * 1.6 + 0.6) * dpr,
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      const LINK = 150 * dpr;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);

          if (d < LINK) {
            ctx.strokeStyle = `rgba(157,92,255,${(0.16 * (1 - d / LINK)).toFixed(3)})`;
            ctx.lineWidth = dpr * 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = 'rgba(190,150,255,0.6)';
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, 6.283);
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    }

    resize();
    make();
    step();

    const handleResize = () => {
      cancelAnimationFrame(raf);
      resize();
      make();
      step();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="net" />;
}
