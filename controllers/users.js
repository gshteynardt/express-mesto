const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const BadRequestErr = require('../errors/bad-request-err');
const { generateToken } = require('../utils/genereteToken');

const soldRound = 10;

const getUsers = async (req, res, next) => {
  try {
    const data = await User.find({});
    return res.send(data);
  } catch (err) {
    next(err);
  }
  return null;
};

const getUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const queryUser = await User.findById(_id).select('+password');
    if (!queryUser) {
      throw new NotFoundError('Пользователя не существует');
    } else {
      res.status(200).send(queryUser);
    }
  } catch (err) {
    next(err);
  }
  return null;
};

const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const id = await User.countDocuments();
    const hash = await bcrypt.hash(password, soldRound);

    const savedUser = await User.create({
      id,
      email,
      password: hash,
    });

    res.status(200).send({ data: savedUser });
  } catch (err) {
    next(err);
  }
  return null;
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUsersByCredentials(email, password);
    if (user.message) {
      throw new ConflictError('Неправильные почта или пароль');
    } else {
      const payload = { _id: user._id };
      const token = await generateToken(payload);
      res.send({ token });
    }
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const _id = req.user;
    const opts = { runValidators: true, new: true };
    const data = await User.findByIdAndUpdate(_id, { name, about }, opts);
    if (!data) {
      throw new BadRequestErr('Невалидные данные');
    } else {
      res.status(200).send(data);
    }
  } catch (err) {
    next(err);
  }
  return null;
};

const updateAvatarProfile = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const _id = req.user;
    const opts = { runValidators: true, new: true };
    const data = await User.findByIdAndUpdate(_id, { avatar }, opts).orFail(new Error('NotFound'));
    if (!data) {
      throw new BadRequestErr('Невалидные данные');
    } else {
      res.status(200).send(data);
    }
  } catch (err) {
    next(err);
  }
  return null;
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  loginUser,
  updateProfile,
  updateAvatarProfile,
};
