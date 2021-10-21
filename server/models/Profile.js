const mongoose = require('mongoose');

const dayAvalSchema = new mongoose.Schema({
    from: String,
    to: String,
    isAvailable: {
        type: Boolean,
        default: true
    },
    price: Number
})

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
        0: [dayAvalSchema],
        1: [dayAvalSchema],
        2: [dayAvalSchema],
        3: [dayAvalSchema],
        4: [dayAvalSchema],
        5: [dayAvalSchema],
        6: [dayAvalSchema],
    },

    timezone: Number
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
