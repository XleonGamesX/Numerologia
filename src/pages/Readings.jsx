import { useState } from 'react';
import AppShell from '../components/AppShell';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { generateReading } from '../services/readingService';
import { getErrorMessage } from '../services/api';

export default function Readings() {
  const [reading, setReading] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerate() {
    setError('');
    setIsGenerating(true);
    setReading(null);

    try {
      const result = await generateReading('general');
      setReading(result);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <AppShell>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Lecturas IA</h1>
      <p style={{ marginBottom: 32 }}>
        Genera una interpretación personalizada a partir de tu perfil numerológico.
      </p>

      <ErrorMessage message={error} />

      <button className="btn btn-primary" onClick={handleGenerate} disabled={isGenerating}>
        {isGenerating ? 'Generando interpretación...' : 'Generar nueva lectura'}
      </button>

      <div style={{ marginTop: 32 }}>
        {isGenerating && <Loading text="Analizando tu perfil numerológico..." />}

        {reading && !isGenerating && (
          <div className="card reading-card" style={{ maxWidth: 640 }}>
            <div className="reading-meta">
              <span className="reading-type">{reading.type}</span>
              <span className="reading-date">
                {new Date(reading.date).toLocaleDateString('es-ES')}
              </span>
            </div>
            <p>{reading.response}</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
