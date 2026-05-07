const Card = require("../models/card");

// GET /cards — obtener todas las tarjetas
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// POST /cards — crear tarjeta
const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
      }

      next(err);
    });
};

// DELETE /cards/:cardId — borrar tarjeta
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      // 🔒 comprobar propietario
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).send({
          message: "Acceso denegado",
        });
      }

      return Card.findByIdAndDelete(req.params.cardId)
        .then(() => res.send({
          message: "Tarjeta eliminada",
        }));
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
      }

      if (err.name === "CastError") {
        err.statusCode = 400;
      }

      next(err);
    });
};

// PUT /cards/:cardId/likes — dar like
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
      }

      if (err.name === "CastError") {
        err.statusCode = 400;
      }

      next(err);
    });
};

// DELETE /cards/:cardId/likes — quitar like
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
      }

      if (err.name === "CastError") {
        err.statusCode = 400;
      }

      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};