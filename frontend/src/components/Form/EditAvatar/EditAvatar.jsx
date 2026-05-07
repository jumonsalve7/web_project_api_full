import { useRef } from "react";
import close from "../../../assets/images/close.png";
import { useEffect } from "react";

export default function EditAvatar({ onUpdateAvatar, onClose }) {
  const avatarRef = useRef(); // 1. Creamos la referencia

  function handleSubmit(e) {
    e.preventDefault();
    // 2. Enviamos el valor actual del input
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Escuchamos la tecla
    document.addEventListener("keydown", handleEscClose);

    // Limpiamos al cerrar el componente para no sobrecargar el navegador
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);

  return (
    <div className="form__container" onClick={(e) => e.stopPropagation()}>
      <button type="button" className="form__close" onClick={onClose}>
        <img src={close} alt="close icon" />
      </button>
      <form className="form__group" onSubmit={handleSubmit}>
        <h2 className="form__title">Change profile picture</h2>
        <input
          ref={avatarRef} // 3. IMPORTANTE: Conectar la ref aquí
          type="url"
          className="form__placeholder"
          placeholder="Link to the image"
          required
        />
        <button type="submit" className="form__submit">
          Save
        </button>
      </form>
    </div>
  );
}
