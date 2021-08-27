const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add name of the product'],
  },

  price: {
    type: Number,
    required: [true, 'Please add price for the product'],
  },

  oldPrice: {
    type: Number,
  },

  category: {
    type: Array,
    required: [true, 'Please add category for the product'],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: 'Plaease add category for the product',
    },
  },

  smallDesc: {
    type: String,
    required: [true, 'Please add a small description about the product'],
  },

  description: {
    type: String,
    required: [true, 'Please add a description about the product'],
  },

  image: {
    type: [String],
    require: [true, 'Please add image for the product'],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: 'Plaease add image for the product',
    },
  },
});

module.exports = mongoose.model('Product', ProductSchema);
