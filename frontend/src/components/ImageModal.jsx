export default function ImageModal({ image, title, onClose }) {
  if (!image) return null;

  return (
    <div className="modal" onMouseDown={onClose}>
      <div className="modal-content image-modal-content" onMouseDown={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close">×</button>
        <img src={image} alt={title} />
      </div>
    </div>
  );
}
