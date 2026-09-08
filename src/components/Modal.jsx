export default function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
        <h3 style={{ marginBottom: 16, fontSize: 20 }}>{title}</h3>
        {children}
      </div>
    </div>
  );
}
