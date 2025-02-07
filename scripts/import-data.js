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
    await mongoose.connect('mongodb://localhost:27017/footballclub');
    console.log('MongoDB Connected!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// Import data function
const importData = async () => {
  try {
    // Read JSON file
    const jsonPath = path.join(__dirname, '../src/data/db.json');
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    // Clear existing data
    await Promise.all([
      Match.deleteMany(),
      News.deleteMany(),
      Gallery.deleteMany(),
      Ticket.deleteMany(),
      User.deleteMany(),
      Config.deleteMany()
    ]);

    console.log('Existing data cleared');

    // Import users
    await User.insertMany(data.users);
    console.log('Users imported');

    // Import matches
    await Match.insertMany(data.matches);
    console.log('Matches imported');

    // Import news
    await News.insertMany(data.news);
    console.log('News imported');

    // Import gallery
    await Gallery.insertMany(data.gallery);
    console.log('Gallery imported');

    // Import tickets
    await Ticket.insertMany(data.tickets);
    console.log('Tickets imported');

    // Import config
    await Config.create({
      club: data.club,
      features: data.features,
      calendarEvents: data.calendarEvents,
      metadata: data.metadata
    });
    console.log('Config imported');

    console.log('All data imported successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Run the import
connectDB().then(() => {
  importData();
}); 