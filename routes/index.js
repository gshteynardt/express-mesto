const routers = require('express').Router();

const userRoutes = require('./users.js');
const cardsRoutes = require('./cards.js');
const errorsRoutes = require('./errors.js');

//временная авторизация
routers.use((req, res, next) => {
  req.user = {
    _id: '5fa80bd8437c8706be394eb8',
  };

  next();
});

routers.use('/', cardsRoutes);
routers.use('/', userRoutes);
routers.use('/', errorsRoutes);

module.exports = routers;
