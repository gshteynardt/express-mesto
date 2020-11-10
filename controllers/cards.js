const Card = require('../models/card');

const getCards = async (res) => {
  try {
    const data = await Card.find({});
    res.send(data);
  } catch (err) {
    if (err.message === 'CastError') {
      res.status(400).send({ message: 'Ошибка на сервере' });
    } else {
      res.status(500).send({ message: 'Что-то пошло не так' });
    }
  }
  return null;
};

const getCard = async (req, res) => {
  const { id } = req.params;
  try {
    const queryCard = await Card.findById(id).orFail(new Error('NotFound'));

    return res.send(queryCard);
  } catch (err) {
    if (err.message === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    } else if (err.message === 'NotFound') {
      res.status(404).send({ message: 'Объект не найден' });
    } else {
      res.status(500).send({ message: 'Ошибка сервера' });
    }
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
    if (err.link === 'ValidationError') {
      res.status(400).send({ message: 'Произошла ошибка' });
    } else {
      res.status(500).send({ message: 'Что-то пошло не так' });
    }
  }
  return null;
};

const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCard = await Card.findByIdAndDelete(id).orFail(new Error('NotFound'));

    res.send({ data: deletedCard });
  } catch (err) {
    if (err.message === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    } else if (err.message === 'NotFound') {
      res.status(404).send({ message: 'Объект не найден' });
    } else {
      res.status(500).send({ message: 'Ошибка сервера' });
    }
  }
  return null;
};

const likeCard = async (req, res) => {
  try {
    const { _cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      _cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(new Error('NotFound'));

    res.send(card);
  } catch (err) {
    if (err.message === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    } else if (err.message === 'NotFound') {
      res.status(404).send({ message: 'Объект не найден' });
    } else {
      res.status(500).send({ message: 'Ошибка сервера' });
    }
  }
  return null;
};

const dislikeCard = async (req, res) => {
  try {
    const { _cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      _cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(new Error('NotFound'));

    res.status(200).send(card);
  } catch (err) {
    if (err.message === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    } else if (err.message === 'NotFound') {
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
