function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function ReadingCard({ reading, onView }) {
  return (
    <div className="card reading-card">
      <div className="reading-meta">
        <span className="reading-type">{reading.type}</span>
        <span className="reading-date">{formatDate(reading.date)}</span>
      </div>
      <p className="reading-summary">{reading.response}</p>
      <button className="btn btn-secondary" onClick={() => onView(reading)}>
        Ver lectura
      </button>
    </div>
  );
}
