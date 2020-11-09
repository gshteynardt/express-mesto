const router = require('express').Router();
const {
  getCards,
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.get('/cards/:id', getCard);
router.post('/cards/create', createCard);
router.delete('/cards/:id', deleteCard);

router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard)

module.exports = router;
