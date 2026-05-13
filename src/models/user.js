const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    age: {
        type: Number,
        required: true,
        min: 13
    },
    gender: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                if(!['male', 'female', 'other'].includes(value.toLowerCase())) {
                    throw new Error('Invalid gender value');
                }
            }
        }
    },
    photoURL: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        validate: {
            validator: function (value) {
                if (value && !validator.isURL(value)) {
                    throw new Error('Invalid photo URL');
                }
            }
        }
    },
    skills: {
        type: [String]
    },
    about: {
        type: String,
        default: "Hey there! I am using Developer Connect."
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;