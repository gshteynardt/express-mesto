const router = require('express').Router();
const {
  getUsers,
  getUser,
  createProfile,
  updateProfile,
  updateAvatarProfile,
} = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createProfile);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatarProfile);

module.exports = router;
