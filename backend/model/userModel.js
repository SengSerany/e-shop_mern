const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'You must add a username'],
    },
    email: {
      type: String,
      unique: true,
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
