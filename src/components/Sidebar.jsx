import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/numerology', label: 'Mi numerología' },
  { to: '/readings', label: 'Lecturas IA' },
  { to: '/history', label: 'Historial' },
  { to: '/compatibility', label: 'Compatibilidad' },
  { to: '/profile', label: 'Perfil' },
];

export default function Sidebar({ open, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <Logo />

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
