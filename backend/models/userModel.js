const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
const { UserExistsError } = require('passport-local-mongoose/lib/errors');

const UserSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);
