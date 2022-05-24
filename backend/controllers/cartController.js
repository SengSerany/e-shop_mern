const asyncHandler = require('express-async-handler');

const getCart = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'Cart' });
});

module.exports = {
  getCart,
};
