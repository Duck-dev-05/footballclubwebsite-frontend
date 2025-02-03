// Create database and collections
db = db.getSiblingDB('footballclub');

// Create collections with validation
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "email"],
      properties: {
        username: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "must be a valid email address"
        },
        password: {
          bsonType: "string",
          description: "must be a string if present"
        },
        role: {
          bsonType: "string",
          enum: ["user", "admin"],
          description: "must be either 'user' or 'admin'"
        }
      }
    }
  }
});

db.createCollection('matches', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["homeTeam", "awayTeam", "matchDate", "venue", "ticketPrice"],
      properties: {
        homeTeam: { bsonType: "string" },
        awayTeam: { bsonType: "string" },
        matchDate: { bsonType: "date" },
        venue: { bsonType: "string" },
        ticketPrice: { bsonType: "number" },
        availableTickets: { bsonType: "number" },
        isSoldOut: { bsonType: "bool" }
      }
    }
  }
});

db.createCollection('tickets', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["match", "user", "seatNumber", "price"],
      properties: {
        match: { bsonType: "objectId" },
        user: { bsonType: "objectId" },
        seatNumber: { bsonType: "string" },
        price: { bsonType: "number" },
        status: {
          bsonType: "string",
          enum: ["Active", "Used", "Cancelled"]
        },
        paymentStatus: {
          bsonType: "string",
          enum: ["Pending", "Completed", "Failed"]
        }
      }
    }
  }
});

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
        isPublished: { bsonType: "bool" }
      }
    }
  }
});

db.createCollection('gallery', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "imageUrl"],
      properties: {
        title: { bsonType: "string" },
        imageUrl: { bsonType: "string" },
        description: { bsonType: "string" },
        category: {
          bsonType: "string",
          enum: ["Match", "Training", "Event", "General"]
        }
      }
    }
  }
});

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.matches.createIndex({ "matchDate": 1 });
db.tickets.createIndex({ "match": 1, "user": 1 });
db.news.createIndex({ "publishedDate": -1 });
db.gallery.createIndex({ "category": 1 }); 