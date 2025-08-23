// models/word.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const wordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  kana: {
    type: String,
    required: false,
    trim: true
  },
  kanji: {
    type: String,
    trim: true
  },
  englishword: {
    type: String,
    required: false,
    trim: true
  },
  gifImage: {
    type: String,
    required: false
  }
});

// wordSchema.set();

// wordSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     delete returnedObject.hashedPassword;
//   }
// });


const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
