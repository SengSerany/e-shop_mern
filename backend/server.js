const express = require('express');
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const User = require('./models/userModel');

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
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/v1/', homepageRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

// Session
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Error handling
app.use(errorHandler);

// Server listening
app.listen(port, () => {
  console.log(`> Server is online on port ${port}`);
});
