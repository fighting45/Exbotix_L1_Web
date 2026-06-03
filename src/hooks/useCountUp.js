import { useEffect, useRef } from 'react';

export const useCountUp = (target, options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const duration = options.duration || 1600;
    const decimals = options.decimals || 0;
    const suffix = options.suffix || '';
    const prefix = options.prefix || '';

    const start = performance.now();

    const tick = (timestamp) => {
      const progress = Math.min(1, (timestamp - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      const currentValue = target * eased;
      element.textContent = prefix +
        currentValue.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        }) + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [target, options.duration, options.decimals, options.suffix, options.prefix]);

  return ref;
};
