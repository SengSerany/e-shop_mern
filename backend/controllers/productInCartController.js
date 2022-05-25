const asyncHandler = require('express-async-handler');
const ProductInCart = require('../models/productInCartModel');

const addProductInCart = asyncHandler(async (req, res) => {
  const { cart, product } = req.body;
  const productInCartExist = await ProductInCart.findOne({ cart, product });
  if (productInCartExist) {
    const updatedProductInCart = await ProductInCart.findByIdAndUpdate(
      productInCartExist._id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProductInCart);
  } else {
    const newProductInCart = await ProductInCart.create(req.body);
    res.status(200).json(newProductInCart);
  }
});

const subProductInCart = asyncHandler(async (req, res) => {
  const productInCartExist = await ProductInCart.findById(req.body.linkID);
  if (!productInCartExist) {
    res.status(400);
    throw new Error('An error as occur: this item is not in your cart');
  }
  await productInCartExist.remove();
  res.status(200).json(productInCartExist._id);
});

module.exports = {
  addProductInCart,
  subProductInCart,
};
