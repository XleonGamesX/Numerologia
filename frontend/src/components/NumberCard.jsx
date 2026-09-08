export default function NumberCard({ label, value, description }) {
  return (
    <div className="card number-card">
      <div className="glow" />
      <span className="label">{label}</span>
      <div className="value">{value ?? '—'}</div>
      {description && <p>{description}</p>}
    </div>
  );
}
