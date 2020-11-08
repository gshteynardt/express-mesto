const router = require('express').Router();
const {
  getUsers,
  getUser,
  createProfile,
} = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/:id', getUser);

router.post('/users/create', createProfile);

module.exports = router;
