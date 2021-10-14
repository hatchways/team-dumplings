const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    gender: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        enum: ['male', 'female', 'other']
    },
    birthDate: Date,
    phoneNumber: {
        type: Number,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    availability: [
        {
            from: Date,
            to: Date
        }
    ],
    timezone: Number
});

module.exports = Profile = mongoose.model("profile", profileSchema);
