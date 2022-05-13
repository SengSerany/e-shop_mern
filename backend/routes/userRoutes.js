const express = require('express');
const userRouter = express.Router();
const {
  createUserAccount,
  createUserSession,
  showUserAccount,
} = require('../controllers/userController');

userRouter.post('/register', createUserAccount);
userRouter.post('/login', createUserSession);
userRouter.get('/profile', showUserAccount);

module.exports = userRouter;
