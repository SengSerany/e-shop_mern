const mongoose = require('mongoose');

const checkFormatArray = (value) => {
  return value.length === 3;
};

const productSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, 'You must add an image'],
    },
    title: {
      type: String,
      required: [true, 'You must add a title'],
    },
    author: {
      type: String,
      required: [true, 'You must add an author'],
    },
    medium: {
      type: String,
      required: [true, 'You must add a medium'],
    },
    format: {
      type: [Number],
      validate: [
        checkFormatArray,
        'Format must be composed of 3 numbers ( height, width, depth)',
      ],
      required: [true, 'You must add the format'],
    },
    description: {
      type: String,
      required: [true, 'You must add a description'],
    },
    price: {
      type: Number,
      required: [true, 'You must add a price'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
