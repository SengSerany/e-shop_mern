const express = require('express');
require('dotenv').config();
const productRouter = require('./routes/productRoutes.js');
const homepageRouter = require('./routes/homepageRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Routes
app.use('/api/v1/', homepageRouter);
app.use('/api/v1/products', productRouter);

// Server listening
app.listen(port, () => {
  console.log(`Server is online on port ${port}`);
});
