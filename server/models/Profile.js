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
        type: String,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    availability: {
        isAvailable: {
            type: Boolean,
            default: true
        },
        day: {
            type: String,
            required: true,
            lowercase: true,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        },
        price: Number
    },

    timezone: Number
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
