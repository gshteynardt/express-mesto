const mongoose = require('mongoose');
const ObjectId = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/(www\.)?[\w-.~:\/?#\[\]@!$&'()*+,;=]+#?$/gi.test(v);
      },
      message: props => `${props.value} is not a valid avatar url!`
    },
    required: [true, 'User avatar url required']
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: {
    type: ObjectId,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model('card', cardSchema);