// Símbolo textual + marca abstracta: una órbita con un punto de dato,
// evocando constelaciones/números sin usar imaginería genérica de tarot.
export default function Logo() {
  return (
    <span className="logo">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="11" stroke="url(#logoGrad)" strokeWidth="1.4" opacity="0.6" />
        <ellipse cx="13" cy="13" rx="11" ry="4.5" stroke="url(#logoGrad)" strokeWidth="1.4" transform="rotate(35 13 13)" opacity="0.9" />
        <circle cx="13" cy="13" r="2.4" fill="url(#logoGrad)" />
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="26" y2="26">
            <stop stopColor="#a855f7" />
            <stop offset="1" stopColor="#e879f9" />
          </linearGradient>
        </defs>
      </svg>
      NUMERIA
    </span>
  );
}
