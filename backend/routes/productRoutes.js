const express = require('express');
const productRouter = express.Router();
const {
  indexProducts,
  showProduct,
} = require('../controllers/productController');

productRouter.get('/', indexProducts);
productRouter.get('/:id', showProduct);

module.exports = productRouter;
