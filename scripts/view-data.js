const mongoose = require('mongoose');
const Config = require('../models/Config');
const User = require('../models/User');
const Match = require('../models/Match');
const News = require('../models/News');
const Gallery = require('../models/Gallery');
const Ticket = require('../models/Ticket');

const viewData = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/footballclub');
    console.log('MongoDB Connected!');

    // Get and display data from all collections
    const config = await Config.findOne();
    const users = await User.find();
    const matches = await Match.find();
    const news = await News.find();
    const gallery = await Gallery.find();
    const tickets = await Ticket.find();

    console.log('\n=== Config ===');
    console.log(JSON.stringify(config, null, 2));

    console.log('\n=== Users ===');
    console.log(JSON.stringify(users, null, 2));

    console.log('\n=== Matches ===');
    console.log(JSON.stringify(matches, null, 2));

    console.log('\n=== News ===');
    console.log(JSON.stringify(news, null, 2));

    console.log('\n=== Gallery ===');
    console.log(JSON.stringify(gallery, null, 2));

    console.log('\n=== Tickets ===');
    console.log(JSON.stringify(tickets, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

viewData(); 