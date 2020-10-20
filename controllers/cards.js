const path = require('path');
const readFile = require('../utils/read-file.js');

const jsonDataPathToCards = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  readFile(jsonDataPathToCards)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log('err= ', err.message);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = getCards;
