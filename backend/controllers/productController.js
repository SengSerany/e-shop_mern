const asyncHandler = require('express-async-handler');

// GET - Index products
const indexProducts = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'Index products' });
});

// GET - Show product
const showProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'Show product' });
});

// POST - Create product
const createProduct = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('The field title must be completed');
  }
  res.status(200).json({ endpoint: 'Create product' });
});

// PATCH - Update product
const updateProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'Update product' });
});

// DELETE - Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'Delete product' });
});

module.exports = {
  indexProducts,
  showProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
