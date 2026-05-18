const express = require('express');
const router = express.Router();
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user');
const { validateUserData, validateEditProfileData} = require('../utils/validator');

// Get user profile
router.get('/view', userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "User profile fetched successfully",
      user
    })
  } catch (error) {
    res.status(400).json({
      message: "Error fetching user profile",
      error
    })
  }
});

router.patch('/edit', userAuth, async (req, res) => {
  try {
    const updates = req.body;
    validateEditProfileData(req);
    const loggedInUser = req.user;
    Object.keys(updates).forEach((key) => {
      loggedInUser[key] = updates[key];
    });
    await loggedInUser.save();
    res.status(200).json({
      message: "User profile updated successfully",
      user: loggedInUser
    })
  } catch (error) {
    res.status(400).json({
      message: "Error updating user profile",
      error
    })
  }
});


module.exports = router;