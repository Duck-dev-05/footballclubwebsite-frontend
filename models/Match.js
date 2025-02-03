const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  homeTeam: {
    type: String,
    required: true
  },
  awayTeam: {
    type: String,
    required: true
  },
  matchDate: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  competition: String,
  ticketPrice: {
    type: Number,
    required: true
  },
  availableTickets: {
    type: Number,
    default: 0
  },
  isSoldOut: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Match', matchSchema); 