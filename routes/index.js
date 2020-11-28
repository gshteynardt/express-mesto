const routers = require('express').Router();
const userRoutes = require('./users.js');
const cardsRoutes = require('./cards.js');
const errorsRoutes = require('./errors.js');
const auth = require('../middlewares/auth');

const {
  loginUser,
  createUser,
} = require('../controllers/users');

routers.post('/signup', createUser);
routers.post('/signin', loginUser);
routers.use(auth);
routers.use('/', cardsRoutes);
routers.use('/', userRoutes);
routers.use('/', errorsRoutes);

module.exports = routers;
