const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'You must add a username'],
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
      required: [true, 'You must add a username'],
    },
    password: {
      type: String,
      required: [true, 'You must add a username'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
