const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'markerapp';
const collectionName = 'markers';

// Middleware to parse JSON bodies
app.use(express.json());

// Create a new MongoDB client
const client = new MongoClient(mongoUrl);

// Connect to the MongoDB server
client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  // API endpoint to get all markers
  app.get('/markers', (req, res) => {
    collection.find({}).toArray((err, markers) => {
      if (err) {
        console.error('Error retrieving markers:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(markers);
    });
  });

  // API endpoint to add a new marker
  app.post('/markers', (req, res) => {
    const marker = req.body;

    collection.insertOne(marker, (err, result) => {
      if (err) {
        console.error('Error adding marker:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.sendStatus(200);
    });
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

// Close the MongoDB client connection on process termination
process.on('SIGINT', () => {
  client.close();
  process.exit();
});
