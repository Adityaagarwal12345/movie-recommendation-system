const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userInput: {
    type: String,
    required: true,
  },
  recommendedMovies: {
    type: [Object], // Store the array of movie objects
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
