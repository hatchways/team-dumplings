const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: String,
    details: {},
    eventType: {
        type: String,
        enum: ['payment', 'message', 'request']
    },
    eventId: String,
    read: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true,
});

module.exports = Notification = mongoose.model("Notification", notificationSchema);

 
 