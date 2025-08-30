// controllers/word.js

const express = require('express');
const router = express.Router();

const Question = require('../models/question');

const verifyToken = require('../middleware/verify-token');

// router.get('/', async (req, res) => {
router.get('/random', async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 10 } }]);

    res.status(201).json(questions);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


module.exports = router;