const asyncHandler = require('express-async-handler');
const ProductInCart = require('../models/productInCartModel');
const Product = require('../models/productModel');

const addProductInCart = asyncHandler(async (req, res) => {
  const { cart, product } = req.body;
  const productInCartExist = await ProductInCart.findOne({ cart, product });
  if (productInCartExist) {
    res.status(400);
    throw new Error('You already add this item in your cart');
  } else {
    const newProductInCart = await ProductInCart.create(req.body);
    const currentProduct = await Product.findById(newProductInCart.product);
    res
      .status(200)
      .json({ link: newProductInCart, title: currentProduct.title });
  }
});

const subProductInCart = asyncHandler(async (req, res) => {
  const productInCartExist = await ProductInCart.findById(req.body.linkID);
  if (!productInCartExist) {
    res.status(400);
    throw new Error('An error as occur: this item is not in your cart');
  }
  const currentProduct = await Product.findById(productInCartExist.product);
  await productInCartExist.remove();
  res
    .status(200)
    .json({ id: productInCartExist._id, title: currentProduct.title });
});

module.exports = {
  addProductInCart,
  subProductInCart,
};
