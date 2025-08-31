// controllers/word.js

const express = require('express');
const router = express.Router();

const Question = require('../models/question');

const verifyToken = require('../middleware/verify-token');


// router.get('/', async (req, res) => {
router.get('/random', async (req, res) => {

  let level = parseInt(req.query.level);
  console.log(level);
  if (level) {
    try {
      const pipeline = [];
      pipeline.push({ $match: { level: level } });

      // Randomly pick up to 3 questions
      pipeline.push({ $sample: { size: 3 } });
      console.log(pipeline);
      const questions = await Question.aggregate(pipeline);
      if (questions.length === 0) {
        res.status(201).json({message: "Array is empty" });        
      } else {
        res.status(201).json(questions);
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }   
  } else {
    try {
      const questions = await Question.aggregate([{ $sample: { size: 10 } }]);

      res.status(201).json(questions);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }

});


module.exports = router;