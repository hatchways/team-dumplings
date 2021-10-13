const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
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
        enum: ['Male', 'Female']
    },
    birthDate: Date,
    email: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: true
    },
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
