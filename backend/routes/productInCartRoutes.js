const express = require('express');
const productInCartRouter = express.Router();
const { addProductInCart } = require('../controllers/productInCartController');

productInCartRouter.post('/add', addProductInCart);

module.exports = productInCartRouter;
