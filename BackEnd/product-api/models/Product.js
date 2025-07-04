const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  status: { type: String, enum: ['published', 'not published'], required: true }
});

module.exports = mongoose.model('Product', productSchema);
