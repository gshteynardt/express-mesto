const path = require('path');
const readFile = require('../utils/read-file.js');

const jsonDataPathToUsers = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  readFile(jsonDataPathToUsers)
    .then((data) => res.send(data))
    .catch((err) => {
      console.log('err= ', err.message);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  readFile(jsonDataPathToUsers)
    .then((data) => data.find((user) => user._id === id))
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .catch((err) => {
      console.log('err= ', err.message);
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  getUsers,
  getUser,
};
