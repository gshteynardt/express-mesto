const router = require('express').Router();
const {
  getCards,
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  idCardValidation,
  validationDataCard,
} = require('../middlewares/validation');

router.get('/cards', getCards);
router.get('/cards/:id', idCardValidation, getCard);
router.post('/cards', validationDataCard, createCard);
router.delete('/cards/:id', idCardValidation, deleteCard);
router.put('/cards/:id/likes', idCardValidation, likeCard);
router.delete('/cards/:id/likes', idCardValidation, dislikeCard);

module.exports = router;
