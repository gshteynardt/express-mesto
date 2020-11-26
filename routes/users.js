const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  loginUser,
  updateProfile,
  updateAvatarProfile,
} = require('../controllers/users.js');

router.post('/signup', createUser);
router.post('/signin', loginUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatarProfile);

module.exports = router;
