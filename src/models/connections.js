const mongoose = require('mongoose');
const validator = require('validator');

const connectionSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: ['ignored', 'interested', 'accepted', 'rejected'],
        message: '{value} is not a valid connection status',
        required: true
    }
}, { timestamps: true });

connectionSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });
connectionSchema.pre('save', async function (next) {
    try {
        const connection = this;
        if(connection.fromUserId.toString() === connection.toUserId.toString()) {
            throw new Error("You cannot send a request to yourself");
        }
    } catch (error) {
        next(error);
    }
});


const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;