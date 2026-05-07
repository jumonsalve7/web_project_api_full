export default function Cards({ cards, currentUser, onCardLike, onCardDelete }) {
  return (
    <section className="cards">
      {cards.map((card) => (
        <Card
          key={card._id}
          card={card}
          currentUser={currentUser}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />
      ))}
    </section>
  );
}