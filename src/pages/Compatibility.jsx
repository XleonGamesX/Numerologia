import { useState } from 'react';
import AppShell from '../components/AppShell';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { checkCompatibility } from '../services/compatibilityService';
import { getErrorMessage } from '../services/api';

export default function Compatibility() {
  const [userId2, setUserId2] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setResult(null);
    setIsLoading(true);

    try {
      const data = await checkCompatibility(userId2);
      setResult(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppShell>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Compatibilidad</h1>
      <p style={{ marginBottom: 32 }}>Calcula la compatibilidad numerológica con otro usuario.</p>

      <div className="card" style={{ maxWidth: 480, marginBottom: 32 }}>
        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="userId2">ID del usuario</label>
            <input
              id="userId2"
              type="text"
              value={userId2}
              onChange={(event) => setUserId2(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
            {isLoading ? 'Calculando compatibilidad...' : 'Calcular compatibilidad'}
          </button>
        </form>
      </div>

      {isLoading && <Loading text="Calculando compatibilidad..." />}

      {result && (
        <div className="card" style={{ maxWidth: 480, textAlign: 'center' }}>
          <ScoreRing score={result.score} />
          <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: 8 }}>
            {result.score}% de compatibilidad
          </p>
          <p style={{ marginBottom: 16 }}>{result.interpretation}</p>
          <p style={{ fontSize: 12 }}>
            Usuarios: {result.user1} — {result.user2}
          </p>
        </div>
      )}
    </AppShell>
  );
}

function ScoreRing({ score }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <svg className="score-ring" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={radius} stroke="var(--surface-2)" strokeWidth="10" fill="none" />
      <circle
        cx="70"
        cy="70"
        r={radius}
        stroke="url(#scoreGrad)"
        strokeWidth="10"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 70 70)"
      />
      <text x="70" y="78" textAnchor="middle" fontSize="26" fontWeight="800" fill="#fff">
        {score}%
      </text>
      <defs>
        <linearGradient id="scoreGrad" x1="0" y1="0" x2="140" y2="140">
          <stop stopColor="#7c3aed" />
          <stop offset="1" stopColor="#e879f9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
