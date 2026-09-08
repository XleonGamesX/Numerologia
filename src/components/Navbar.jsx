import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="nav-links">
          <a href="#hero">Inicio</a>
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#numerologia">Numerología</a>
          <a href="#inteligencia-artificial">Inteligencia artificial</a>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="btn btn-secondary">Iniciar sesión</Link>
          <Link to="/register" className="btn btn-primary">Crear mi perfil</Link>
        </div>

        <button
          className="nav-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="container" style={{ paddingBottom: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <a href="#hero" onClick={() => setMenuOpen(false)}>Inicio</a>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
          <a href="#numerologia" onClick={() => setMenuOpen(false)}>Numerología</a>
          <a href="#inteligencia-artificial" onClick={() => setMenuOpen(false)}>Inteligencia artificial</a>
          <Link to="/login" className="btn btn-secondary btn-block">Iniciar sesión</Link>
          <Link to="/register" className="btn btn-primary btn-block">Crear mi perfil</Link>
        </div>
      )}
    </header>
  );
}
