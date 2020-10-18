const readFile = require('../utils/read-file.js');
const path = require('path');
const jsonDataPathToCards = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res, next) => {
  readFile(jsonDataPathToCards)
    .then(data => {
      res.send(data)
    })
    .catch(err => res.status(500).send(err));
  next();
}

module.exports = getCards;