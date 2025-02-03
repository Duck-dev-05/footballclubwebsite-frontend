const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: String,
  publishedDate: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('News', newsSchema); 