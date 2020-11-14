const routers = require('express').Router();

const userRoutes = require('./users.js');
const cardsRoutes = require('./cards.js');
const errorsRoutes = require('./errors.js');

// временная авторизация
routers.use((req, res, next) => {
  req.user = {
    _id: '5fac143b0587393e561e787d',
  };

  next();
});

routers.use('/', cardsRoutes);
routers.use('/', userRoutes);
routers.use('/', errorsRoutes);

module.exports = routers;
