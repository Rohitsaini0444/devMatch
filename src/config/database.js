const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dummy/developerConnect');
}

module.exports = connectDB;