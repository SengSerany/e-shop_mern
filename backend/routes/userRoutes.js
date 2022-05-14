const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const {
  createUserAccount,
  createUserSession,
  showUserAccount,
} = require('../controllers/userController');

userRouter.post('/register', createUserAccount);
userRouter.post('/login', passport.authenticate('local'), createUserSession);
userRouter.get('/profile', showUserAccount);

module.exports = userRouter;
