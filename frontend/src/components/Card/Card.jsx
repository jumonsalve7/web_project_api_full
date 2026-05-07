// Card.jsx
const Card = ({ card, currentUser, onCardLike, onCardDelete }) => {
  // 1. Extraemos 'isLiked' directamente de la card
  const { name, link, isLiked } = card;

  const cardLikeButtonClassName = `cards__content-like ${
    isLiked ? "cards__content-like_active" : ""
  }`;
  return (
    <div className="cards__content">
      <img
        src={link} // <-- Aquí es donde fallaba porque no encontraba 'link'
        alt={name}
        className="cards__content-image"
        onClick={() => {
          /* tu lógica de abrir imagen */
        }}
      />

      <button
        type="button"
        className="cards__content-trash"
        onClick={() => onCardDelete(card)}
      ></button>

      <div className="cards__content-block">
        <h2 className="cards__content-description">{name}</h2>

        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => onCardLike(card)}
        ></button>
      </div>
    </div>
  );
};

export default Card;
