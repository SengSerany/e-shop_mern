const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes.js');
const homepageRouter = require('./routes/homepageRoutes');

connectDB();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/', homepageRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

// Error handling
app.use(errorHandler);

// Server listening
app.listen(port, () => {
  console.log(`> Server is online on port ${port}`);
});
