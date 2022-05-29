const mongoose = require('mongoose');

const AdressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      default: 'none',
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    streetNb: {
      type: Number,
      required: true,
    },
    streetName: {
      type: String,
      required: true,
    },
    zipcode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Adress', AdressSchema);
