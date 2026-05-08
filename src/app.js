const express = require('express');
const app = express();
const { adminAuth, userAuth } = require('./middlewares/auth');

const connectDB = require('./config/database');


connectDB().then(() => {
  console.log("Database connection has been stablished");

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch((err) => {
  console.log("Database can not be connected");
});
