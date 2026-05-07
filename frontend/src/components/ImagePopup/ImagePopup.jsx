import close from "../../assets/images/close.png";

export default function ImagePopup({ card, onClose }) {
  if (!card) return null; 

  return (
    <div className="popup__overlay" onClick={onClose}>
      <div className="popup__image-container" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="popup__close" onClick={onClose}>
          <img src={close} alt="Cerrar" />
        </button>
        <img
          src={card.link}
          alt={card.name || "Imagen"}
          className="popup-active"
        />
      </div>
    </div>
  );
}