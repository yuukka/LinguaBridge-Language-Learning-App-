// controllers/word.js

const express = require('express');
const router = express.Router();

const Badge = require('../models/badge');

const verifyToken = require('../middleware/verify-token');

router.get('/collections/:level', verifyToken, async (req, res) => {

  let level = parseInt(req.params.level);
  const badges = await Badge.find({ level: { $lte: level } });

  if (!level) {
    return res.status(403).json({ err: "No level specified" });
  }
  if (level) {
    try {
    //   const badge = await Badge.findOne({ id: level });
      const badges = await Badge.find({ level: { $lte: level } });
      if (!badges) {
        res.status(201).json({message: "Cannot find badge" });        
      } else {
        res.status(201).json(badges);
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }   
  } else {
    return res.status(403).json({ err: "No badges"});
  }

});

// router.get('/', async (req, res) => {
router.get('/:level', verifyToken, async (req, res) => {

  let level = parseInt(req.params.level);
  console.log(level);
  if (!level) {
    return res.status(403).json({ err: "No level specified" });
  }
  if (level) {
    try {

      const badge = await Badge.findOne({ id: level });
      if (!badge) {
        res.status(201).json({message: "Cannot find badge" });        
      } else {
        res.status(201).json(badge);
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }   
  } else {
    return res.status(403).json({ err: "No badge"});
  }

});




module.exports = router;