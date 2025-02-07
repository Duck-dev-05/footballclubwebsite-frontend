// Connect to MongoDB
const database = 'footballclub';
db = db.getSiblingDB(database);

// Drop existing collections if needed
db.users.drop();
db.matches.drop();
db.news.drop();
db.gallery.drop();
db.tickets.drop();
db.calendarEvents.drop();

// Create Users collection
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "email"],
      properties: {
        username: { bsonType: "string" },
        email: { bsonType: "string" },
        password: { bsonType: "string" },
        googleId: { bsonType: "string" },
        facebookId: { bsonType: "string" },
        role: { 
          bsonType: "string",
          enum: ["user", "admin", "player"]
        },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

// Create Matches collection
db.createCollection('matches', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["homeTeam", "awayTeam", "matchDate", "venue"],
      properties: {
        homeTeam: { bsonType: "string" },
        awayTeam: { bsonType: "string" },
        matchDate: { bsonType: "date" },
        venue: { bsonType: "string" },
        competition: { bsonType: "string" },
        ticketPrice: { bsonType: "decimal" },
        availableTickets: { bsonType: "int" },
        isSoldOut: { bsonType: "bool" }
      }
    }
  }
});

// Create News collection
db.createCollection('news', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "content", "author"],
      properties: {
        title: { bsonType: "string" },
        content: { bsonType: "string" },
        imageUrl: { bsonType: "string" },
        author: { bsonType: "string" },
        publishedDate: { bsonType: "date" },
        isPublished: { bsonType: "bool" }
      }
    }
  }
});

// Create Gallery collection
db.createCollection('gallery', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "imageUrl"],
      properties: {
        title: { bsonType: "string" },
        imageUrl: { bsonType: "string" },
        description: { bsonType: "string" },
        uploadDate: { bsonType: "date" },
        category: { 
          bsonType: "string",
          enum: ["Match", "Training", "Event", "General"]
        }
      }
    }
  }
});

// Create Tickets collection
db.createCollection('tickets', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["matchId", "userId", "seatNumber", "price"],
      properties: {
        matchId: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        seatNumber: { bsonType: "string" },
        price: { bsonType: "decimal" },
        purchaseDate: { bsonType: "date" },
        status: { 
          bsonType: "string",
          enum: ["Active", "Used", "Cancelled"]
        },
        paymentStatus: {
          bsonType: "string",
          enum: ["Pending", "Completed", "Failed"]
        },
        paymentId: { bsonType: "string" }
      }
    }
  }
});

// Create Calendar Events collection
db.createCollection('calendarEvents', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "start", "end", "createdBy"],
      properties: {
        title: { bsonType: "string" },
        start: { bsonType: "date" },
        end: { bsonType: "date" },
        type: { 
          bsonType: "string",
          enum: ["match", "training", "event"]
        },
        description: { bsonType: "string" },
        location: { bsonType: "string" },
        createdBy: { bsonType: "objectId" },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "googleId": 1 }, { sparse: true });
db.users.createIndex({ "facebookId": 1 }, { sparse: true });

db.matches.createIndex({ "matchDate": 1 });
db.matches.createIndex({ "homeTeam": 1, "awayTeam": 1, "matchDate": 1 }, { unique: true });

db.news.createIndex({ "publishedDate": -1 });
db.news.createIndex({ "title": "text", "content": "text" });

db.gallery.createIndex({ "category": 1 });
db.gallery.createIndex({ "uploadDate": -1 });

db.tickets.createIndex({ "matchId": 1, "seatNumber": 1 }, { unique: true });
db.tickets.createIndex({ "userId": 1 });
db.tickets.createIndex({ "status": 1 });

db.calendarEvents.createIndex({ "start": 1 });
db.calendarEvents.createIndex({ "createdBy": 1 });
db.calendarEvents.createIndex({ "type": 1 });

// Insert sample data
// Admin user
db.users.insertOne({
  username: "admin",
  email: "admin@fcescuela.com",
  password: "$2a$10$your_hashed_password", // Replace with actual hashed password
  role: "admin",
  createdAt: new Date()
});

// Sample match
db.matches.insertOne({
  homeTeam: "FC Escuela",
  awayTeam: "Visiting Team",
  matchDate: new Date("2024-05-01T15:00:00Z"),
  venue: "Home Stadium",
  competition: "League Match",
  ticketPrice: NumberDecimal("25.00"),
  availableTickets: 1000,
  isSoldOut: false
});

// Sample news
db.news.insertOne({
  title: "Welcome to FC Escuela",
  content: "We are excited to launch our new website!",
  author: "Admin",
  publishedDate: new Date(),
  isPublished: true
});

// Sample gallery item
db.gallery.insertOne({
  title: "Training Session",
  imageUrl: "/images/training.jpg",
  description: "Team training session",
  uploadDate: new Date(),
  category: "Training"
});

// Sample calendar event
db.calendarEvents.insertOne({
  title: "Team Practice",
  start: new Date("2024-04-20T14:00:00Z"),
  end: new Date("2024-04-20T16:00:00Z"),
  type: "training",
  description: "Regular team practice session",
  location: "Training Ground",
  createdBy: db.users.findOne({ role: "admin" })._id,
  createdAt: new Date()
});

print("Database initialization completed successfully"); 