const User = require('../models/user');
const validatorErr = require('../utils/validatorErrForUpdUsers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const soldRound = 10;
const SECRET_KEY = 'some-secret-key';
const EXPIRES = { expiresIn: '7d' };

const getUsers = async (req, res) => {
  try {
    const data = await User.find({});
    return res.send(data);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Ошибка на сервере' });
    } else {
      res.status(500).send({ message: 'Что-то пошло не так' });
    }
  }
  return null;
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const queryUser = await User.findById(id).orFail(new Error('NotFound'));
    res.status(200).send(queryUser);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    } if (err.message === 'NotFound') {
      res.status(404).send({ message: 'Объект не найден' });
    } else {
      res.status(500).send({ message: 'Ошибка сервера' });
    }
  }
  return null;
};

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const id = await User.countDocuments();
    const hash = await bcrypt.hash(password, soldRound);
    const savedUser = await User.create({
      id,
      email,
      password: hash,
    });
    res.status(200).send(savedUser);
  } catch (err) {
    if (err.name === 'MongoError') {
      return res.status(400).send({ message: 'Email должен быть уникальным' });
    }else if(err.name === 'ValidationError') {
      res.status(400).send({ message: 'Невалидные данные' });
    }
    else {
      res.status(500).send({ message: 'Что-то пошло не так' });
    }
  }
  return null;
};

const updateProfile = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const id = req.user._id;

    const opts = { runValidators: true, new: true };
    const data = await User.findByIdAndUpdate(id, { name, about, avatar }, opts).orFail(new Error('NotFound'));
    res.status(200).send(data);
  } catch (err) {
    validatorErr(err, res);
  }
  return null;
};

const updateAvatarProfile = async (req, res) => {
  try {
    const { avatar } = req.body;
    const id = req.user._id;
    const opts = { runValidators: true, new: true };
    const data = await User.findByIdAndUpdate(id, { avatar }, opts).orFail(new Error('NotFound'));
    res.status(200).send(data);
  } catch (err) {
    validatorErr(err, res);
  }
  return null;
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatarProfile,
};
