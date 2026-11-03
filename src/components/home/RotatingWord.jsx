import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

const WORDS = ['AI Agents', 'DeFi', 'SocialFi', 'RWA'];

export default function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState('');
  const spanRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setPhase('out');
      setTimeout(() => {
        // flushSync forces React to commit the new word + pre class to the DOM synchronously
        flushSync(() => {
          setIndex(i => (i + 1) % WORDS.length);
          setPhase('pre');
        });
        // Force a reflow so the browser sees the pre position before we remove it
        if (spanRef.current) void spanRef.current.offsetWidth;
        // Now remove pre — CSS transition kicks in and animates the word into view
        setPhase('');
      }, 360);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <span ref={spanRef} className={['rot', phase].filter(Boolean).join(' ')}>
      {WORDS[index]}
    </span>
  );
}
