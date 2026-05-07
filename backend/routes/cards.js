const express = require('express');
const router = express.Router();

const {
  validateCreateCard,
  validateId,
} = require("../middlewares/validation");

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateId, deleteCard);

// likes
router.put('/:cardId/likes', validateId, likeCard);
router.delete('/:cardId/likes', validateId, dislikeCard);

module.exports = router;