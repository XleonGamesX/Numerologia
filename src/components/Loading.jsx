export default function Loading({ text = 'Cargando...' }) {
  return (
    <div className="loading-row">
      <span className="spinner" />
      <span>{text}</span>
    </div>
  );
}
