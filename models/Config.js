const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  club: {
    name: String,
    founded: String,
    location: String,
    stadium: String,
    capacity: Number,
    colors: {
      primary: String,
      secondary: String
    },
    social: {
      facebook: String,
      twitter: String,
      instagram: String
    },
    contact: {
      email: String,
      phone: String,
      address: String
    }
  },
  features: {
    enableSocialLogin: Boolean,
    enableTicketBooking: Boolean,
    enableLiveScores: Boolean,
    enableNewsletterSubscription: Boolean
  },
  metadata: {
    lastUpdated: Date,
    version: String,
    apiVersion: String,
    dataSource: String
  }
}, { strict: false });

module.exports = mongoose.model('Config', configSchema); 