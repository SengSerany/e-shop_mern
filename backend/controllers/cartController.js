const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');

const getCart = asyncHandler(async (req, res) => {
  const currentCart = await Cart.findOne({ user: req.user.id });
  res.status(200).json(currentCart);
});

module.exports = {
  getCart,
};
