const asyncHandler = require('express-async-handler');
const Adress = require('../models/adressModel');
const Order = require('../models/orderModel');
const ProductInCart = require('../models/productInCartModel');
const Cart = require('../models/cartModel');

const getAllOrders = asyncHandler(async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401);
    throw new Error('Not authorized');
  }
  const orders = await Order.find({ user: req.user.id });
  const adresses = await Adress.find({ user: req.user.id });

  res.status(200).json({ orders, adresses });
});

const createOrder = asyncHandler(async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const { adress, products } = req.body;

  const selectedAdress = await Adress.findOne({
    name: adress.name,
    user: adress.user,
  });
  if (!selectedAdress) {
    // Create new adress
    const newAdress = await Adress.create(adress);

    // Create new order
    const newOrder = await Order.create({
      user: req.user.id,
      adress: newAdress._id,
      products,
    });

    // Delete product in cart
    const userCart = Cart.findOne({ user: req.user.id });
    products.map(async (productID) => {
      const productInCart = await ProductInCart.findOne({
        cart: userCart._id,
        product: productID,
      });
      await productInCart.remove();
    });

    // Response
    res.status(200).json({ order: newOrder, adress: newAdress });
  } else if (selectedAdress) {
    // Create new order
    const newOrder = await Order.create({
      user: req.user.id,
      adress: selectedAdress._id,
      products,
    });

    // Delete product in cart
    const userCart = await Cart.findOne({ user: req.user.id });
    products.map(async (productID) => {
      const productInCart = await ProductInCart.findOne({
        cart: userCart._id,
        product: productID,
      });
      await productInCart.remove();
    });

    // Response
    res.status(200).json(newOrder);
  }
});

module.exports = {
  createOrder,
  getAllOrders,
};
