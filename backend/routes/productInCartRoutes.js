const express = require('express');
const productInCartRouter = express.Router();
const {
  addProductInCart,
  subProductInCart,
} = require('../controllers/productInCartController');

productInCartRouter.post('/add', addProductInCart);
productInCartRouter.delete('/sub', subProductInCart);

module.exports = productInCartRouter;
