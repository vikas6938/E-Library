const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  available: { type: Boolean, default: true },
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imageUrl: { type: String }, // Add imageUrl field to store the image path
});

module.exports = mongoose.model('Book', bookSchema);
