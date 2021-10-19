const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
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
        type: string,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    availability: [
        {
            from: string,
            to: string,
            day: Date
        }
    ],
    timezone: Number
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
