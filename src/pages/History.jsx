import { useEffect, useState } from 'react';
import AppShell from '../components/AppShell';
import ReadingCard from '../components/ReadingCard';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getHistory } from '../services/readingService';
import { getErrorMessage } from '../services/api';

export default function History() {
  const [readings, setReadings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReading, setSelectedReading] = useState(null);

  useEffect(() => {
    getHistory()
      .then(setReadings)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AppShell>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Historial</h1>
      <p style={{ marginBottom: 32 }}>Tus lecturas generadas anteriormente.</p>

      <ErrorMessage message={error} />

      {isLoading ? (
        <Loading text="Cargando historial..." />
      ) : readings.length === 0 ? (
        <p>Todavía no tienes lecturas generadas.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {readings.map((reading) => (
            <ReadingCard key={reading._id} reading={reading} onView={setSelectedReading} />
          ))}
        </div>
      )}

      {selectedReading && (
        <Modal title={`Lectura · ${selectedReading.type}`} onClose={() => setSelectedReading(null)}>
          <p>{selectedReading.response}</p>
        </Modal>
      )}
    </AppShell>
  );
}
