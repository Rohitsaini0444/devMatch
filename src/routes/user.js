const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateUserData } = require('../utils/validator');

//  GET /user/requests/received
router.get('/requests/received', async (req, res) => {
    try {
        // Here you can implement the logic to fetch the received requests from the database
        res.status(200).json({
            message: "Received requests fetched successfully",
            requests: [] // Replace with actual received requests
        })
    } catch (error) {
        res.status(400).json({
            message: "Error fetching received requests",
            error
        })
    }
});

//  GET /user/connections
router.get('/connections', async (req, res) => {
    try {
        // Here you can implement the logic to fetch the user's connections from the database
        res.status(200).json({
            message: "Connections fetched successfully",
            connections: [] // Replace with actual connections
        })
    } catch (error) {
        res.status(400).json({
            message: "Error fetching connections",
            error
        })
    }
});

//  GET /user/feed
router.get('/feed', async (req, res) => {
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

module.exports = router;