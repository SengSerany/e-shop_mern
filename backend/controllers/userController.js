const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// POST - Create user account
const createUserAccount = asyncHandler(async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;
  if (!username || !email || !password || !passwordConfirm) {
    res.status(400);
    throw new Error('All field must be completed');
  }

  if (password !== passwordConfirm) {
    res.status(400);
    throw new Error("The confirmation password don't match with the password");
  }

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    res.status(400);
    throw new Error('This email is already used');
  }

  await User.register(
    new User({ username, email }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log('error while user register!', err);
        res.status(400);
        throw new Error('Your account could not be saved');
      } else {
        res.status(200).json({ endpoint: 'Register user', user: user });
      }
    }
  );
});

// POST - Create user session
const createUserSession = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'Login user', user: req.user });
});

// GET - Show user account
const showUserAccount = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'Profile user', user: req.user });
});

module.exports = {
  createUserAccount,
  createUserSession,
  showUserAccount,
};
