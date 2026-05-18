const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateUserData } = require('../utils/validator');

router.post('/send/:status/:userId', async (req, res) => {
    try {
        const { status } = req.params;
        const { userId } = req.params;
        // Here you can implement the logic to send the request to the database
        res.status(200).json({
            message: "Request sent successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "Error sending request",
            error
        })
    }
});

router.post('/review/:status/:requestId', async (req, res) => {
    try {
        const { status } = req.params;
        const { requestId } = req.params;
        // Here you can implement the logic to update the request status in the database
        res.status(200).json({
            message: "Request reviewed successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "Error reviewing request",
            error
        })
    }
});


module.exports = router;