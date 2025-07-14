const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // ensures no two users can have the same email
  },
  password: {
    type: String,
    required: true
  }
});

// Create the model from the schema
//mongoose.model('User', userSchema) creates a model which allows you to interact with the users collection in MongoDB.

const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
