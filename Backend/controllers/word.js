// controllers/word.js

const express = require('express');
const router = express.Router();

const Word = require('../models/word');

const verifyToken = require('../middleware/verify-token');

// router.get('/', async (req, res) => {
router.post('/', verifyToken, async (req, res) => {
  try {
    // Get a list of all users, but only return their username and _id
    const word = await Word.create({
      userId: req.user._id,
      kana: req.body.kana,
      kanji: req.body.kanji,
      englishword: req.body.englishword,
      gifImage: req.body.gifImage
    });

    res.status(201).json(word);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// router.get('/', async (req, res) => {
router.get('/', verifyToken, async (req, res) => {
  try {
    // Get a list of all users, but only return their username and _id
    const word = await Word.find({ userId: req.user._id});

    res.status(201).json(word);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.delete('/:favId', verifyToken, async (req, res) => {
    const favoriteId = req.params.favId;
  try {
    // Get a list of all users, but only return their username and _id
    const word = await Word.findByIdAndDelete(favoriteId);

    res.status(201).json(word);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
