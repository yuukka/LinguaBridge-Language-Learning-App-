// models/word.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  word: {
    type: String,
    required: true,
    trim: true
  },
  characters: {
    type: [String],
    required: true,
    trim: true
  }
});



const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
