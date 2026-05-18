const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateUserData } = require('../utils/validator');

// Signup user
router.post('/signup', async (req, res) => {
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
router.post('/login', async (req, res) => {
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

router.post('/logout', (req, res) => {
    res.cookie('token', null, { expires: new Date(Date.now())});
    res.send({
        message: "User logged out successfully"
    })
});


module.exports = router;
