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
router.post('/users/create', createProfile);
router.patch('/users/:id/me', updateProfile);
router.patch('/users/:id/me/avatar', updateAvatarProfile)

module.exports = router;
