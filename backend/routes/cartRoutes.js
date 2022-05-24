const express = require('express');
const cartRouter = express.Router();
const { getCart } = require('../controllers/cartController');

cartRouter.get('/', getCart);

module.exports = cartRouter;
