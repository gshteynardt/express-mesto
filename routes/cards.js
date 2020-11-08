const router = require('express').Router();
const {
  getCards,
  getCard,
  createCard,
  deleteCard
} = require('../controllers/cards');

router.get('/cards', getCards);
router.get('/cards/:id', getCard);
router.post('/cards/create', createCard);
router.delete('/cards/:id', deleteCard)

module.exports = router;
