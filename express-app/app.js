require('dotenv').config();
const mongoose = require('mongoose');

// Get the MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

// Define a schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// Create a model
const User = mongoose.model('User', userSchema);

// Create and save a new user
const user = new User({
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 30
});

user.save()
  .then(() => {
    console.log('User saved');
    mongoose.connection.close(); // Close the connection after saving the user
  })
  .catch(err => {
    console.error('Error saving user', err);
    mongoose.connection.close(); // Close the connection on error
  });
