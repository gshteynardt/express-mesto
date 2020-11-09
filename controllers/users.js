const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const data = await User.find({});
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

const getUser = async (req, res) => {
  const { id } = req.params;
 try {
   const queryUser = await User.findById(id);
   if (!queryUser) {
     return res.status(404).send({message: 'Нет пользователя с таким id'});
   }
   return res.send(queryUser);
 } catch (err) {
   console.log('err= ', err.message);
   if (err.name === 'CastError') {
     res.status(400).send({message: 'Ошибка на сервере'})
   } else {
     res.status(500).send({message: 'Что-то пошло не так'})
   }
 }
}

  const createProfile = async (req, res) => {
    try {
      const {name, about, avatar} = req.body;
      const id = await User.countDocuments()
      const savedUser = await User.create({id, name, about, avatar});
      res.status(200).send(savedUser);
   } catch (err) {
      console.log('err= ', err.message);
      if (err.name === 'ValidationError') {
        res.status(400).send({message: 'Произошла ошибка'})
      } else {
        res.status(500).send({message: 'Что-то пошло не так'})
      }
    }
};

  const updateProfile = async (req, res) => {
    try {
      const {name, about, avatar} = req.body;
      const id = req.user._id
      const data = await User.findByIdAndUpdate(id, {name, about, avatar}, {new: true})
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    } catch (err) {
      res.status(500).send({ message: 'Что-то пошло не так' });
    }
  }

  const updateAvatarProfile = async (req, res) => {
    try {
      const { avatar } = req.body;
      const id = req.user._id
      const data = await User.findByIdAndUpdate(id, { avatar }, {new: true})
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    } catch (err) {
      res.status(500).send({ message: 'Что-то пошло не так' });
    }
  }

module.exports = {
  getUsers,
  getUser,
  createProfile,
  updateProfile,
  updateAvatarProfile,
};
