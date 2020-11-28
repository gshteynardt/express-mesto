const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  idUserValidation,
  validationUpdProfile,
  validationUpdAvatar,
} = require('../middlewares/validation');

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatarProfile,
} = require('../controllers/users.js');

router.use(auth);
router.get('/users', getUsers);
router.get('/users/me', idUserValidation, getUser);
router.patch('/users/me', validationUpdProfile, updateProfile);
router.patch('/users/me/avatar', validationUpdAvatar, updateAvatarProfile);

module.exports = router;
