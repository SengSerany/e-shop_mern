const express = require('express');
const homepageRouter = express.Router();
const { getHomepage } = require('../controllers/homepageController');

homepageRouter.get('/', getHomepage);

module.exports = homepageRouter;
