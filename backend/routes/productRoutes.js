const express = require('express');
const productRouter = express.Router();
const {
  indexProducts,
  showProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

productRouter.get('/', indexProducts);
productRouter.get('/:id', showProduct);
productRouter.post('/new', createProduct);
productRouter.patch('/:id/edit', updateProduct);
productRouter.delete('/:id/delete', deleteProduct);

module.exports = productRouter;
