const router = require('express').Router();
const getCards = require('../controllers/cards');

router.get('/cards', getCards);

module.exports = router;
