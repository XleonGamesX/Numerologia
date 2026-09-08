import AppShell from '../components/AppShell';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <AppShell>
      <h1 style={{ fontSize: 28, marginBottom: 32 }}>Perfil</h1>

      <div className="card" style={{ maxWidth: 480 }}>
        <div style={{ marginBottom: 20 }}>
          <span className="label" style={{ display: 'block', marginBottom: 4 }}>NOMBRE</span>
          <p style={{ color: 'var(--text-primary)', fontSize: 16 }}>{user?.name}</p>
        </div>

        <div>
          <span className="label" style={{ display: 'block', marginBottom: 4 }}>EMAIL</span>
          <p style={{ color: 'var(--text-primary)', fontSize: 16 }}>{user?.email}</p>
        </div>
      </div>
    </AppShell>
  );
}
