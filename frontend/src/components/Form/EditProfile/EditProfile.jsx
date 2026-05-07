import React, { useState, useContext, useEffect } from "react";
import close from "../../../assets/images/close.png";
// AJUSTA ESTA RUTA según tu estructura de carpetas:
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfile({ onUpdateUser, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
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
        <h2 className="form__title">Edit profile</h2>

        <input
          type="text"
          className="form__placeholder"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          className="form__placeholder"
          placeholder="About me"
          minLength="2"
          maxLength="200"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" className="form__submit">
          Save
        </button>
      </form>
    </div>
  );
}
