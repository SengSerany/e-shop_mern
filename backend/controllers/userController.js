const asyncHandler = require('express-async-handler');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

// POST - Create user aaccount
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

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(200).json({ endpoint: 'Register user', user: user });
});

// POST - Create user session
const createUserSession = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All field must be completed');
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error('Please provide valid email');
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('This email is wrong or your are not register');
  }

  if (await bcrypt.compare(password, user.password)) {
    res.status(200).json({ endpoint: 'Login user', user: user });
  } else {
    res.status(400);
    throw new Error('The password is wrong');
  }
});

// GET - Show user account
const showUserAccount = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'Profile user' });
});

module.exports = {
  createUserAccount,
  createUserSession,
  showUserAccount,
};
