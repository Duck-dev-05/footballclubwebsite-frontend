const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import models
const Match = require('../models/Match');
const News = require('../models/News');
const Gallery = require('../models/Gallery');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const Config = require('../models/Config');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/footballclub', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Export data function
const exportData = async () => {
  try {
    // Get all data from MongoDB
    const [users, matches, news, gallery, tickets, config] = await Promise.all([
      User.find().lean(),
      Match.find().lean(),
      News.find().lean(),
      Gallery.find().lean(),
      Ticket.find().lean(),
      Config.findOne().lean()
    ]);

    // Handle case where config doesn't exist
    const configData = config || {
      club: {},
      features: {},
      metadata: {
        lastUpdated: new Date().toISOString(),
        version: "1.0.0",
        apiVersion: "v1",
        dataSource: "FC Escuela Database"
      }
    };

    // Combine all data
    const data = {
      club: configData.club,
      features: configData.features,
      users,
      players: configData.players,
      matches,
      tickets,
      news,
      gallery,
      calendarEvents: configData.calendarEvents || [],
      metadata: configData.metadata
    };

    // Write to JSON file
    const jsonPath = path.join(__dirname, '../src/data/db.json');
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

    console.log('Data exported successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error exporting data:', error);
    process.exit(1);
  }
};

// Run the export
connectDB().then(() => {
  exportData();
}); 