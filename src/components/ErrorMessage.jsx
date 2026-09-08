export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <div className="status-message status-error">{message}</div>;
}
