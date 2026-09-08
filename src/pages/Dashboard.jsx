import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import NumberCard from '../components/NumberCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getProfile } from '../services/numerologyService';
import { getHistory } from '../services/readingService';
import { getErrorMessage } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [lastReading, setLastReading] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch {
        // El usuario aún no tiene un perfil calculado; no es un error crítico.
        setProfile(null);
      }

      try {
        const history = await getHistory();
        setLastReading(history?.[0] ?? null);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <AppShell>
      <h1 style={{ fontSize: 28 }}>Hola, {user?.name}</h1>
      <p style={{ marginTop: 6, marginBottom: 32 }}>Este es tu perfil numerológico.</p>

      <ErrorMessage message={error} />

      {isLoading ? (
        <Loading text="Cargando tu perfil..." />
      ) : profile ? (
        <div className="numbers-grid">
          <NumberCard label="CAMINO DE VIDA" value={profile.numero_vida} description="Tu dirección general." />
          <NumberCard label="EXPRESIÓN" value={profile.numero_expresion} description="Cómo expresas tus capacidades." />
          <NumberCard label="ALMA" value={profile.numero_alma} description="Tus motivaciones internas." />
        </div>
      ) : (
        <div className="card">
          <p style={{ marginBottom: 16 }}>Todavía no has calculado tu perfil numerológico.</p>
          <Link to="/numerology" className="btn btn-primary">Calcular mi perfil</Link>
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <h3 style={{ fontSize: 18, marginBottom: 16 }}>Tu última lectura</h3>
        {lastReading ? (
          <div className="card reading-card">
            <div className="reading-meta">
              <span className="reading-type">{lastReading.type}</span>
              <span className="reading-date">
                {new Date(lastReading.date).toLocaleDateString('es-ES')}
              </span>
            </div>
            <p className="reading-summary">{lastReading.response}</p>
          </div>
        ) : (
          <p>Aún no has generado ninguna lectura.</p>
        )}
        <Link to="/readings" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>
          Generar nueva lectura
        </Link>
      </div>
    </AppShell>
  );
}
