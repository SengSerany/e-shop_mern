const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

// GET - Index products
const indexProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// GET - Show product
const showProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Couldn't find the product for show");
  }

  res.status(200).json({
    endpoint: 'Show product',
    product: product,
  });
});

module.exports = {
  indexProducts,
  showProduct,
};
