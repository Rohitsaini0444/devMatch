const express = require('express');
const router = express.Router();
const Connection = require('../models/connections');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateUserData } = require('../utils/validator');

router.post('/send/:status/:userId', async (req, res) => {
    try {
        const { status } = req.params;
        const { userId } = req.params;
        const fromUserId = req.user?._id;
        const allowedStatuses = ['ignored', 'interested'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            })
        }
        if(fromUserId.toString() === userId) {
            return res.status(400).json({
                message: "You cannot send a request to yourself"
            })
        }
        const existingRequest = await Connection.findOne({
            $or: [
                { fromUserId, toUserId: userId },
                { fromUserId: userId, toUserId: fromUserId }
            ]
        });
        if (existingRequest) {
            return res.status(400).json({
                message: "Request already exists"
            });
        }
        const connection = new Connection({
            fromUserId,
            toUserId: userId,
            status
        });
        await connection.save();
        res.status(200).json({
            message: "Request sent successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "Error sending request",
            error: error?.message
        })
    }
});

router.post('/review/:status/:requestId', async (req, res) => {
    try {
        const { status } = req.params;
        const { requestId } = req.params;
        // Here you can implement the logic to update the request status in the database
        await Connection.findByIdAndUpdate(requestId, { status });
        res.status(200).json({
            message: "Request reviewed successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "Error reviewing request",
            error: error?.message
        })
    }
});


module.exports = router;