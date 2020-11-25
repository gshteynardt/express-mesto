const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, 'email must be unique'],
    validate: {
      validator: (value) => isEmail(value),
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /^https?:\/\/(www\.)?[\w-.~:/?#[\]@!$&'()*+,;=]+#?$/gi.test(v);
      },
      message: (props) => `${props.value} is not a valid avatar url!`,
    },
    required: false,
  },
});

userSchema.statics.findUsersByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({email});
    if(!user) {
      return new Error('Неправильные почта или пароль');
    }

    const matched = await bcrypt.compare(password, user.password);
    if(!matched) {
      return new Error('Неправильные почта или пароль');
    }
    return user
  }
  catch (err) {
    return {message: err.message};
  }
};

module.exports = mongoose.model('user', userSchema);
