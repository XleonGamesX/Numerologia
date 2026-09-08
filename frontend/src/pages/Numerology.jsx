import { useEffect, useState } from 'react';
import AppShell from '../components/AppShell';
import NumberCard from '../components/NumberCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { calculateProfile, getProfile } from '../services/numerologyService';
import { getErrorMessage } from '../services/api';

export default function Numerology() {
  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(() => setProfile(null))
      .finally(() => setIsLoadingProfile(false));
  }, []);

  async function handleCalculate(event) {
    event.preventDefault();
    setError('');
    setIsCalculating(true);

    try {
      const result = await calculateProfile(fullName, birthDate);
      setProfile(result);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsCalculating(false);
    }
  }

  return (
    <AppShell>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Mi numerología</h1>
      <p style={{ marginBottom: 32 }}>Calcula o actualiza tu perfil numerológico.</p>

      {isLoadingProfile ? (
        <Loading text="Cargando tu perfil..." />
      ) : profile ? (
        <div className="numbers-grid" style={{ marginBottom: 40 }}>
          <NumberCard label="CAMINO DE VIDA" value={profile.numero_vida} />
          <NumberCard label="EXPRESIÓN" value={profile.numero_expresion} />
          <NumberCard label="ALMA" value={profile.numero_alma} />
        </div>
      ) : (
        <p style={{ marginBottom: 32 }}>Aún no tienes un perfil calculado.</p>
      )}

      <div className="card" style={{ maxWidth: 480 }}>
        <h3 style={{ fontSize: 18, marginBottom: 20 }}>Calcular perfil</h3>
        <ErrorMessage message={error} />

        <form onSubmit={handleCalculate}>
          <div className="field">
            <label htmlFor="fullName">Nombre completo</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="birthDate">Fecha de nacimiento</label>
            <input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isCalculating}>
            {isCalculating ? 'Calculando perfil...' : 'Calcular mi perfil'}
          </button>
        </form>
      </div>
    </AppShell>
  );
}
