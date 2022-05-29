const express = require('express');
const orderRouter = express.Router();
const { getAllOrders, createOrder } = require('../controllers/orderController');

orderRouter.get('/', getAllOrders);
orderRouter.post('/create', createOrder);

module.exports = orderRouter;
