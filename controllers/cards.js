const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const data = await Card.find({});
    res.send(data);
  } catch (err) {
    console.log('err= ', err.message);
    if (err.name === 'CastError') {
      res.status(400).send({message: 'Ошибка на сервере'})
    } else {
      res.status(500).send({message: 'Что-то пошло не так'})
    }
  }
};

const getCard = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  console.log(id)
  try {
    const queryCard = await Card.findById(id);
    if (!queryCard) {
      return res.status(404).send({message: 'Нет карточки с таким id'});
    }
    return res.send(queryCard);
  } catch (err) {
    console.log('err= ', err.message);
    if (err.name === 'CastError') {
      res.status(400).send({message: 'Ошибка на сервере'})
    } else {
      res.status(500).send({message: 'Что-то пошло не так'})
    }
  }
}

const createCard = async (req, res) => {
  try {
    const {name, link} = req.body;
    const ownerId = req.user._id;
    const savedCard = await Card.create({name, link, owner: ownerId});
    res.status(200).send(savedCard);
  } catch (err) {
    console.log('err= ', err.message);
    if (err.link === 'ValidationError') {
      res.status(400).send({message: 'Произошла ошибка'})
    } else {
      res.status(500).send({message: 'Что-то пошло не так'})
    }
  }
};

const deleteCard = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCard = await Card.findByIdAndDelete(id);
      if (!deletedCard) {
        res.status(404).send({ message: `Карточка с id: ${id} не существует`});
      } else {
        res.send({ data: deletedCard });
      }
    } catch (err) {
      res.status(404).send({ message: `Формат id карточки неверен` });
    }
}

module.exports = {
  getCards,
  getCard,
  createCard,
  deleteCard,
};
