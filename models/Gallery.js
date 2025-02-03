const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: String,
  uploadDate: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['Match', 'Training', 'Event', 'General'],
    default: 'General'
  }
});

module.exports = mongoose.model('Gallery', gallerySchema); 