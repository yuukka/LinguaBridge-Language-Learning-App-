// models/todo.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  fullname: { type: String, required: false,},
  bio: { type: String, required: false},
  level: { type: Number, default: 0 },       // track current Quest level
  score: { type: Number, default: 0 },       
  questsCompleted: { type: Number, default: 0 },
});

userSchema.set();

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
