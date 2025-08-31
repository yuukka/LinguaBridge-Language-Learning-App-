// models/word.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const badgeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  ki: {
    type: String,
    required: false,
    trim: true
  },
  gender: {
    type: Number,
    required: false,
    trim: true
  },
  race: {
    type: String,
    required: false,
    trim: true
  },
});



const Badge = mongoose.model('Badge', badgeSchema);

module.exports = Badge;
