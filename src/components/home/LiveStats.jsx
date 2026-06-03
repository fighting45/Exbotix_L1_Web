import { useState, useEffect, useRef } from 'react';
import Reveal from '../common/Reveal';
import { useCountUp } from '../../hooks/useCountUp';

export default function LiveStats() {
  const [isVisible, setIsVisible] = useState(false);
  const stripRef = useRef(null);
  const revealRef = useRef(null);

  // Create refs for each stat using the countUp hook
  const tpsRef = useCountUp(100, { trigger: isVisible, suffix: '' });
  const blockTimeRef = useCountUp(12.8, { trigger: isVisible, decimals: 1, suffix: 's' });
  const supplyRef = useCountUp(92, { trigger: isVisible, suffix: 'M' });
  const apyRef = useCountUp(8, { trigger: isVisible, suffix: '%' });

  useEffect(() => {
    const element = stripRef.current;
    const revealElement = revealRef.current;

    if (!element || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      if (revealElement) {
        revealElement.classList.add('in');
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (revealElement) {
            revealElement.classList.add('in');
          }
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="section-pad">
      <div className="wrap">
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Network at a glance</span>
            <h2 className="h-lg" style={{ marginTop: '14px' }}>Numbers that compound</h2>
          </div>
        </Reveal>
        <div className="reveal" ref={revealRef}>
          <div className="stat-strip" ref={stripRef}>
            <div className="statbox">
              <div className="big" ref={tpsRef}>0</div>
              <div className="lab">Transactions / sec</div>
            </div>
            <div className="statbox">
              <div className="big" ref={blockTimeRef}>0</div>
              <div className="lab">Avg block time</div>
            </div>
            <div className="statbox">
              <div className="big" ref={supplyRef}>0</div>
              <div className="lab">Max EXBT supply</div>
            </div>
            <div className="statbox">
              <div className="big" ref={apyRef}>0</div>
              <div className="lab">Staking APY</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
