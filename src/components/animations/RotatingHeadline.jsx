import { useState, useEffect } from 'react';

export default function RotatingHeadline() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const words = ["AI Agents", "DeFi", "SocialFi", "RWA", "Web3 Games"];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setAnimating(false);
      }, 360);
    }, 2300);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="hero-rotate">
      <span className="fixed-line">One chain for</span>
      <span className="rotor">
        <span className={`rotor-item gradtext ${animating ? 'out' : 'in'}`}>
          {words[index]}
        </span>
      </span>
    </h1>
  );
}
