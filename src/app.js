const express = require('express');
const app = express();
var cors = require('cors');
require('dotenv').config();
const { userAuth } = require('./middlewares/auth');
const cookieParser = require('cookie-parser');
const User = require('./models/user');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const requestRoutes = require('./routes/requests');
const userRoutes = require('./routes/user');
const connectDB = require('./config/database');
const {startWeeklyReportsScheduler} = require('./helpers/reports');

app.use(express.json());
app.use(cors({
  origin: process.env.WHITE_LISTED_URLS?.split(',') || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
}));

app.use(cookieParser());
app.use('/profile', profileRoutes);

app.use('/auth', authRoutes);
app.use('/profile',userAuth, profileRoutes);
app.use('/request', userAuth, requestRoutes);
app.use('/user', userAuth, userRoutes); 



connectDB().then(() => {
  console.log("Database connection has been stablished");

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT || 3000}`);
  });
  startWeeklyReportsScheduler();
}).catch((err) => {
  console.log("Database can not be connected");
});
