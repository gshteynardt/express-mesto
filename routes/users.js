const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatarProfile,
} = require('../controllers/users.js');


router.use(auth);
router.get('/users', getUsers);
router.get('/users/me', getUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatarProfile);

module.exports = router;
