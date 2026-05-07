import { useState } from "react";
import close from "../../../assets/images/close.png";
import { useEffect } from "react"

export default function NewCard({ onAddPlaceSubmit, onClose }) {
  // 1. Estados para los inputs
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  // 2. Manejador del envío
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({ name, link });
    // Limpiamos los campos después de enviar
    setName("");
    setLink("");
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
    <div className="formadd__container" onClick={(e) => e.stopPropagation()}>
      <button type="button" className="formadd__close" onClick={onClose}>
        <img src={close} alt="close icon" />
      </button>
      
      <form className="formadd__group" onSubmit={handleSubmit}>
        <h2 className="formadd__title">New place</h2>
        
        <input
          type="text"
          placeholder="Title"
          className="form__placeholder"
          required
          value={name} // Vinculamos al estado
          onChange={(e) => setName(e.target.value)} // Actualizamos al escribir
        />
        
        <input
          type="url"
          placeholder="Image URL"
          className="form__placeholder"
          required
          value={link} // Vinculamos al estado
          onChange={(e) => setLink(e.target.value)} // Actualizamos al escribir
        />
        
        <button type="submit" className="form__submit">
          Save
        </button>
      </form>
    </div>
  );
}