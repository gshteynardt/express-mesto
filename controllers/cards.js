const Card = require('../models/card');
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");

const getCards = async (req, res) => {
  try {
    const data = await Card.find({});

    res.send(data);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Ошибка на сервере' });
    }
    res.status(500).send({ message: 'Что-то пошло не так' });
  }
  return null;
};

const getCard = async (req, res) => {
  const { id } = req.params;
  try {
    const queryCard = await Card.findById(id).orFail(new Error('NotFound'));

    res.send(queryCard);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    } if (err.message === 'NotFound') {
      return res.status(404).send({ message: 'Объект не найден' });
    }
    res.status(500).send({ message: 'Ошибка сервера' });
  }
  return null;
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    const savedCard = await Card.create({ name, link, owner: ownerId });
    res.status(200).send(savedCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Произошла ошибка' });
    } else {
      res.status(500).send({ message: 'Что-то пошло не так' });
    }
  }
  return null;
};

const deleteCard = async (req, res, next) => {
  try {
    const user = req.user._id;
    const { id } = req.params;
    const query_card = await Card.findById(id).orFail(new Error('NotFound'));
    console.log(query_card)
    if(!query_card) {
      return
    } else if (!(user === query_card.owner)){
      throw new ForbiddenError('Запрещено удалять карточки других пользователей');
    } else {
      const deletedCard = await Card.findByIdAndDelete(id).orFail(new Error('NotFound'));
      res.send({ data: deletedCard });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    } if (err.message === 'NotFound') {
      return res.status(404).send({ message: 'Объект не найден' });
    }
    next(err);
  }
  return null;
};

const likeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(new Error('NotFound'));

    res.status(200).send(card);
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

const dislikeCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(new Error('NotFound'));

    res.status(200).send(card);
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

module.exports = {
  getCards,
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
