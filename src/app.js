const express = require('express');
const app = express();
const { userAuth } = require('./middlewares/auth');
const { validateUserData } = require('./utils/validator');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const User = require('./models/user');

const connectDB = require('./config/database');

app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req, res) => {
  try {
    validateUserData(req.body);
    // Hashing password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      firstName: req.body?.firstName,
      lastName: req.body?.lastName,
      email: req.body?.email,
      age: req.body?.age,
      gender: req.body?.gender,
      photoURL: req.body?.photoURL,
      skills: req.body?.skills,
      about: req.body?.about,
      password: hashedPassword
    });
    await user.save();
    res.status(200).json({
      message: "User created successfully",
      user
    })
  } catch (error) {
    res.status(400).json({
      message: "Error creating user",
      error
    })
  }
});

//Login user
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body?.email });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    const isMatch = await user.validatePassword(req.body?.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }
    const token = await user.getAuthenticatedUser();
    res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 3600000) }); 
    res.status(200).json({
      message: "User logged in successfully",
      user
    })
  } catch (error) {
    res.status(400).json({
      message: "Error logging in user",
      error
    })
  }
});

// Get user profile
app.get('/profile', userAuth, async (req, res) => {
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

// get user by email
app.get('/user', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body?.emailId });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    res.status(200).json({
      message: "User found",
      user
    })
  } catch (error) {
    res.status(400).json({
      message: "Error fetching user",
      error
    })
  }
});

// Feed api / get all users
app.get('/feed', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users found",
      users
    })
  } catch (error) {
    res.status(400).json({
      message: "Error fetching users",
      error
    })
  }
});

// User delete user by userId
app.delete('/user', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.body?.userId });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    res.status(200).json({
      message: "User deleted successfully",
      user
    })
  } catch (error) {
    res.status(400).json({
      message: "Error deleting user",
      error
    })
  }
});

// Update user by userId
app.patch('/user/:userId', async (req, res) => {
  try {
    const dataToUpdate = req.body?.data;
    const allowedFields = ['age', 'gender', 'photoURL', 'skills', 'about'];
    const isValidUpdate = Object.keys(dataToUpdate).every((field) => allowedFields.includes(field));
    if (!isValidUpdate) {
      throw new Error('Invalid update fields');
    }
    if (dataToUpdate?.skills?.length > 10) {
      throw new Error('Maximum 10 skills allowed');
    }
    const user = await User.findByIdAndUpdate(req.params.userId, dataToUpdate, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    res.status(200).json({
      message: "User updated successfully",
      user
    })
  } catch (error) {
    res.status(400).json({
      message: "Error updating user " + error.message,
      error
    })
  }
});

connectDB().then(() => {
  console.log("Database connection has been stablished");

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch((err) => {
  console.log("Database can not be connected");
});
