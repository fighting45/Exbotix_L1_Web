import { useReveal } from '../../hooks/useReveal';

export default function Reveal({ children, delay = 0, className = '', ...props }) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-d={delay}
      {...props}
    >
      {children}
    </div>
  );
}
