import { useEffect, useRef } from 'react';

function countUp(el, target, { dec = 0, suf = '' }) {
  const duration = 1200;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = (target * ease).toFixed(dec) + suf;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function StatusStrip() {
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        ref.current?.querySelectorAll('[data-count]').forEach(el => {
          countUp(el, parseFloat(el.dataset.count), {
            dec: parseInt(el.dataset.dec || '0'),
            suf: el.dataset.suf || '',
          });
        });
        io.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className="x-status" ref={ref}>
      <div>
        <div className="mono-k">Throughput</div>
        <div className="v"><span data-count="100" data-suf=" TPS">100 TPS</span></div>
      </div>
      <div>
        <div className="mono-k">Block time</div>
        <div className="v"><span data-count="12.8" data-dec="1" data-suf="s">12.8s</span></div>
      </div>
      <div>
        <div className="mono-k">Max supply</div>
        <div className="v"><span data-count="92" data-suf="M EXBT">92M EXBT</span></div>
      </div>
      <div>
        <div className="mono-k">Staking APY</div>
        <div className="v" style={{ color: 'var(--accent)' }}>
          <span data-count="8" data-suf="%">8%</span>
        </div>
      </div>
      <div>
        <div className="mono-k">Consensus</div>
        <div className="v">Proof of Work</div>
      </div>
    </div>
  );
}
