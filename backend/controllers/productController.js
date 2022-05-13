// GET - Index products
const indexProducts = (req, res) => {
  res.status(200).json({ endpoint: 'Index products' });
};

// GET - Show product
const showProduct = (req, res) => {
  res.status(200).json({ endpoint: 'Show products' });
};

// POST - Create product
const createProduct = (req, res) => {
  res.status(200).json({ endpoint: 'Create products' });
};

// PATCH - Update product
const updateProduct = (req, res) => {
  res.status(200).json({ endpoint: 'Update products' });
};

// DELETE - Delete product
const deleteProduct = (req, res) => {
  res.status(200).json({ endpoint: 'Delete products' });
};

module.exports = {
  indexProducts,
  showProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
