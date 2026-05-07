import close from "../../../../assets/images/close.png";
import '../../../../../blocks/popup.css';

export default function Popup({ onClose, title, children }) {
  return (
    <section className="popup">
      <div className="popup__overlay" onClick={onClose}>

      <div className="popup__container">
        <button type="button" onClick={onClose} className="popup__close">
          <img src={close} alt="Cerrar" />
        </button>

        <h3 className="popup__message">{title}</h3>
        {children}
      </div>
      </div>
    </section>
  );
}
