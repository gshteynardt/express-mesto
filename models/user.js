const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /^https?:\/\/(www\.)?[\w-.~:/?#[\]@!$&'()*+,;=]+#?$/gi.test(v);
      },
      message: (props) => `${props.value} is not a valid avatar url!`,
    },
    required: [true, 'User avatar url required'],
  },
});

module.exports = mongoose.model('user', userSchema);
