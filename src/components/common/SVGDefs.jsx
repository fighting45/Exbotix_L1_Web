export default function SVGDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B98CFF" />
          <stop offset="1" stopColor="#7A5CFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
