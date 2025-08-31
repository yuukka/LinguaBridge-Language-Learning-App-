// controllers/users.js

const express = require('express');
const router = express.Router();

const User = require('../models/user');

const verifyToken = require('../middleware/verify-token');

// controllers/users.js

router.get('/:userId', verifyToken, async (req, res) => {
  try {
    // If the user is looking for the details of another user, block the request
    // Send a 403 status code to indicate that the user is unauthorized
    if (req.user._id !== req.params.userId){
      return res.status(403).json({ err: "Unauthorized"});
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ err: 'User not found.'});
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.patch('/:userId/profile/update', verifyToken, async (req, res) => {
  try {
    // If the user is looking for the details of another user, block the request
    // Send a 403 status code to indicate that the user is unauthorized
    if (req.user._id !== req.params.userId){
      return res.status(403).json({ err: "Unauthorized"});
    }

    const useid = { _id: req.params.userId }
    const profile =  req.body
    const user = await User.findOneAndUpdate(useid, profile, { new: true });

    if (!user) {
      return res.status(404).json({ err: 'Cannot find and update profile'});
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.patch('/:userId/level', verifyToken, async (req, res) => {
  try {
    // If the user is looking for the details of another user, block the request
    // Send a 403 status code to indicate that the user is unauthorized
    if (req.user._id !== req.params.userId){
      return res.status(403).json({ err: "Unauthorized"});
    }

    const useid = { _id: req.params.userId }
    const level =  { level: req.body.level }
    const user = await User.findOneAndUpdate(useid, level, { new: true });

    if (!user) {
      return res.status(404).json({ err: 'Cannot find and update level'});
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


// router.get('/', async (req, res) => {
router.get('/', verifyToken, async (req, res) => {
  try {
    // Get a list of all users, but only return their username and _id
    const users = await User.find({}, "username");

    res.json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});



module.exports = router;
