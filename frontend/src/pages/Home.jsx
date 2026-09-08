import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const steps = [
  {
    number: '01',
    title: 'Crea tu perfil',
    text: 'Registra tus datos y fecha de nacimiento.',
  },
  {
    number: '02',
    title: 'Descubre tus números',
    text: 'Obtén tus principales números numerológicos.',
  },
  {
    number: '03',
    title: 'Recibe tu interpretación',
    text: 'La inteligencia artificial genera una lectura personalizada basada en tu perfil.',
  },
];

const coreNumbers = [
  {
    title: 'Camino de vida',
    text: 'Número que representa la dirección general de tu recorrido personal.',
    value: 4,
  },
  {
    title: 'Número de expresión',
    text: 'Relacionado con la forma en que expresas tus capacidades y personalidad.',
    value: 4,
  },
  {
    title: 'Número del alma',
    text: 'Relacionado con motivaciones y aspectos internos.',
    value: 8,
  },
];

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section id="hero" className="section" style={{ paddingTop: 100, position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 20% 20%, rgba(124,58,237,0.16), transparent 45%), radial-gradient(circle at 80% 60%, rgba(232,121,249,0.10), transparent 45%)',
            zIndex: -1,
          }}
        />
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 60, alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 52, maxWidth: 560 }}>
              Descubre lo que tus números dicen sobre ti.
            </h1>
            <p style={{ fontSize: 18, maxWidth: 480, margin: '22px 0 34px' }}>
              Explora tu perfil numerológico y recibe interpretaciones personalizadas
              impulsadas por inteligencia artificial.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-primary">Descubrir mi numerología</Link>
              <a href="#como-funciona" className="btn btn-secondary">Cómo funciona</a>
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="section">
        <div className="container">
          <h2 style={{ fontSize: 34, maxWidth: 520, marginBottom: 48 }}>
            Tu perfil. Tus números. Tu interpretación.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {steps.map((step) => (
              <div className="card" key={step.number}>
                <span style={{ color: 'var(--accent-1)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  {step.number}
                </span>
                <h3 style={{ fontSize: 19, margin: '10px 0 8px' }}>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NUMEROS CENTRALES */}
      <section id="numerologia" className="section" style={{ background: 'var(--bg-1)' }}>
        <div className="container">
          <h2 style={{ fontSize: 34, maxWidth: 560, marginBottom: 12 }}>
            Los números que forman tu perfil
          </h2>
          <p style={{ maxWidth: 560, marginBottom: 48 }}>
            Valores demostrativos. Cuando inicies sesión, estos números se calculan a partir de tus propios datos.
          </p>
          <div className="numbers-grid">
            {coreNumbers.map((item) => (
              <div className="card number-card" key={item.title}>
                <div className="glow" />
                <span className="label">{item.title.toUpperCase()}</span>
                <div className="value">{item.value}</div>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IA */}
      <section id="inteligencia-artificial" className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 34, marginBottom: 16 }}>Una interpretación creada para ti.</h2>
            <p style={{ marginBottom: 20 }}>
              A partir de tu perfil numerológico, generamos una lectura personalizada. El panel de la
              derecha es solo una demostración visual del proceso.
            </p>
            <Link to="/register" className="btn btn-primary">Crear mi perfil</Link>
          </div>

          <div className="terminal">
            <div className="terminal-dots">
              <span /><span /><span />
            </div>
            <div className="dim">ANÁLISIS NUMEROLÓGICO</div>
            <div className="dim">---------------------</div>
            <br />
            <div>Perfil identificado</div>
            <br />
            <div>Camino de Vida: <span className="highlight">4</span></div>
            <div>Expresión: <span className="highlight">4</span></div>
            <div>Alma: <span className="highlight">8</span></div>
            <br />
            <div className="dim">Analizando patrones...</div>
            <div className="dim">Interpretación generada por IA (demostración)</div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 0', textAlign: 'center' }}>
        <p>NUMERIA — Análisis numerológico impulsado por inteligencia artificial.</p>
      </footer>
    </div>
  );
}

// Composición abstracta: números, órbitas y tarjetas flotantes.
// Puramente decorativo — no representa datos de un usuario real.
function HeroVisual() {
  const floating = [11, 7, 4, 8, 3];
  return (
    <div style={{ position: 'relative', height: 420 }}>
      <svg width="100%" height="100%" viewBox="0 0 420 420">
        <circle cx="210" cy="210" r="150" stroke="var(--border)" strokeWidth="1" fill="none" />
        <ellipse cx="210" cy="210" rx="150" ry="60" stroke="url(#orbit)" strokeWidth="1.2" fill="none" transform="rotate(20 210 210)" />
        <ellipse cx="210" cy="210" rx="150" ry="60" stroke="url(#orbit)" strokeWidth="1.2" fill="none" transform="rotate(-30 210 210)" opacity="0.6" />
        <circle cx="210" cy="210" r="6" fill="var(--accent-1)" />
        <defs>
          <linearGradient id="orbit" x1="0" y1="0" x2="420" y2="420">
            <stop stopColor="#7c3aed" />
            <stop offset="1" stopColor="#e879f9" />
          </linearGradient>
        </defs>
      </svg>

      {floating.map((num, i) => (
        <div
          key={num}
          className="card"
          style={{
            position: 'absolute',
            padding: '10px 16px',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 20,
            top: `${12 + i * 18}%`,
            left: i % 2 === 0 ? '4%' : '76%',
            boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          }}
        >
          {num}
        </div>
      ))}
    </div>
  );
}
