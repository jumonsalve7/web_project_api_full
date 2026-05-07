import { useState } from "react";
import NewCard from "../Form/NewCard/NewCard";
import edit from "../../assets/images/edit.png";
import pencil from "../../assets/images/pencil.png";
import add from "../../assets/images/add.png";
import Popup from "./components/Popup/Popup";
import ImagePopup from "../ImagePopup/ImagePopup";
import EditProfile from "../Form/EditProfile/EditProfile";
import EditAvatar from "../Form/EditAvatar/EditAvatar";
import Card from "../Card/Card";

export default function Main(props) {
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // 1. EXTRAEMOS LAS PROPS (Añadí onUpdateUser y onUpdateAvatar)
  const {
    cards,
    currentUser,
    onCardDelete,
    onCardLike,
    onAddPlaceSubmit,
    onUpdateUser, // Viene de App.jsx
    onUpdateAvatar, // Viene de App.jsx
  } = props;

  // Funciones auxiliares para cerrar
  function handleClosePopup() {
    setPopup(null);
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // 2. CONFIGURACIÓN DE POPUPS (Corregidas para usar las props)
  const newProfilePopup = {
    title: "Edit Profile",
    children: (
      <EditProfile
        onUpdateUser={(data) => {
          onUpdateUser(data); // Usamos la prop que extrajimos arriba
          handleClosePopup();
        }}
        onClose={handleClosePopup}
      />
    ),
  };

  // Main.jsx

const editAvatar = {
  title: "Change profile picture",
  children: (
    <EditAvatar 
      onUpdateAvatar={(data) => {
        onUpdateAvatar(data);
        handleClosePopup();
      }} 
      onClose={handleClosePopup} 
    />
  ),
};
  const newCardPopup = {
    title: "Nuevo lugar",
    children: (
      <NewCard
        onAddPlaceSubmit={(data) => {
          onAddPlaceSubmit(data);
          handleClosePopup();
        }}
        onClose={handleClosePopup}
      />
    ),
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__edit-photo">
          <img
            src={currentUser.avatar}
            alt="profile"
            className="profile__avatar"
          />
          <img
            src={pencil}
            alt="edit avatar"
            className="profile__edit-pencil"
            onClick={() => handleOpenPopup(editAvatar)}
          />
        </div>

        <div className="profile__container">
          <h2 className="profile__name">{currentUser.name}</h2>
          <h3 className="profile__profession">{currentUser.about}</h3>
        </div>

        <button
          className="profile__edit-button"
          onClick={() => handleOpenPopup(newProfilePopup)}
        >
          <img src={edit} className="profile__edit-image" alt="edit profile" />
        </button>

        <button
          className="profile__add-button"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          <img src={add} className="profile__add-image" alt="add card" />
        </button>

        {popup && (
          <Popup onClose={handleClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )}
      </section>

      <section className="cards">
        <div className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              currentUser={currentUser}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
      </section>

      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </main>
  );
}
