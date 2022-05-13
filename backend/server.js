const express = require('express');
require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const productRouter = require('./routes/productRoutes.js');
const homepageRouter = require('./routes/homepageRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/', homepageRouter);
app.use('/api/v1/products', productRouter);

// Error handling
app.use(errorHandler);

// Server listening
app.listen(port, () => {
  console.log(`Server is online on port ${port}`);
});
