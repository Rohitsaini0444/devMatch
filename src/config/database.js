const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://rohitsaini0444_db_user:QfYWPlCiuXBjqrfb@devmatch.keclbae.mongodb.net/developerConnect');
}

module.exports = connectDB;