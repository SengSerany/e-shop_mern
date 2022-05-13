const asyncHandler = require('express-async-handler');
const Product = require('../model/productModel');

// GET - Index products
const indexProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    endpoint: 'Index product',
    products: products,
  });
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

// POST - Create product
const createProduct = asyncHandler(async (req, res) => {
  const { image, title, author, medium, format, description, price } = req.body;
  if (
    !image ||
    !title ||
    !author ||
    !medium ||
    !format ||
    !description ||
    !price
  ) {
    res.status(400);
    throw new Error('All field must be completed');
  }

  const product = await Product.create({
    image,
    title,
    author,
    medium,
    format,
    description,
    price,
  });

  res.status(200).json({
    endpoint: 'Create product',
    product: product,
  });
});

// PATCH - Update product
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { image, title, author, medium, format, description, price } = req.body;

  if (!product) {
    res.status(400);
    throw new Error("Couldn't find the product for update");
  }

  if (
    !image ||
    !title ||
    !author ||
    !medium ||
    !format ||
    !description ||
    !price
  ) {
    res.status(400);
    throw new Error('All field must be completed');
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    endpoint: 'Update product',
    product: updatedProduct,
  });
});

// DELETE - Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Couldn't find the product for delete");
  }

  await product.remove();

  res.status(200).json({
    endpoint: 'Delete product',
    product: {
      _id: product._id,
      title: product.title,
    },
  });
});

module.exports = {
  indexProducts,
  showProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
