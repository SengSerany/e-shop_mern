const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const {
  createUserAccount,
  createUserSession,
  showUserAccount,
  deleteSessionUser,
} = require('../controllers/userController');

userRouter.post('/register', createUserAccount);
userRouter.post('/login', passport.authenticate('local'), createUserSession);
userRouter.get('/profile', showUserAccount);
userRouter.delete('/logout', deleteSessionUser);

module.exports = userRouter;
