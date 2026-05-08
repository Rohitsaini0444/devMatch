const express = require('express');
const app = express();
const { adminAuth, userAuth } = require('./middlewares/auth');
const User = require('./models/user');

const connectDB = require('./config/database');

app.use(express.json());

app.post('/signup', async (req, res) => {
  const user = new User(req.body);
  try {
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


connectDB().then(() => {
  console.log("Database connection has been stablished");

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch((err) => {
  console.log("Database can not be connected");
});
