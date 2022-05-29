const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    adress: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Adress',
    },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: 'Products',
    },
    state: {
      type: String,
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', OrderSchema);
