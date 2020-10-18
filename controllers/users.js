const readFile = require('../utils/read-file.js');
const path = require('path');
const jsonDataPathToUsers = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res, next) => {
  readFile(jsonDataPathToUsers)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
  next()
}

const getUser = (req, res, next) => {
  const { id } = req.params;
  readFile(jsonDataPathToUsers)
    .then(data => {
      const userToFind = data.find(user => user._id === id)
      return userToFind;
    })
    .then( user => {
      if(!user) {
        return res.status(404).send({ "message": "Нет пользователя с таким id" })
      }
      res.send(user);
    })
    .catch(err => res.status(500).send(err))
  next()
}

module.exports = {
  getUsers,
  getUser,
}