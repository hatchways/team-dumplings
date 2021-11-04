const express = require('express');
const Notification = require('../models/Notification');
const User = require('../models/User');
const asyncHandler = require("express-async-handler");
const createNotificationDetails = require('../utils/createNotificationDetails');

// @route POST /notification
// @desc Create notification
// @access Private
exports.createNotification = asyncHandler(async (req, res, next) => {
    const notification = new Notification(req.body);
    await notification.save(); 
    res.status(201).json({ success: { notification }});
});

// @route PATCH /notification/:id
// @desc update notification
// @access Private
exports.updateNotification = asyncHandler(async (req, res, next) => {
    const notificationId = req.params.id;    

    const updates = req.body;
    const options = { new: true };

    const updatedNotification = await Notification.findByIdAndUpdate(notificationId, updates, options);
    res.status(200).json({ success: { updatedNotification }});
});

// @route GET /notification/:id
// @desc get notification
// @access Private
exports.getNotification = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const notification = await Notification.findById(id);
    res.status(200).json({ success: { notification }});
});

// @route GET /notification
// @desc get all unread notifications
// @access Private
exports.getAllNotifications = asyncHandler(async (req, res, next) => {
    let notifications = [];
    const userId = req.user.id;
    const unreadNotifications = await Notification.find({ userId, read: false });
    
    for (notification of unreadNotifications) {  
        let notificationOwner = await User.findById(notification.details.ownerId)
            .populate({path: 'profile', select: {
                firstName: 1, profilePhoto: 1, description: 1
            }})

        const { firstName, profilePhoto,  description } = notificationOwner.profile;
        const { eventType, eventId, details } = notification;

        notification.details = createNotificationDetails(
                                            firstName, profilePhoto,  description,
                                            eventType, eventId, details);
        
        notifications.push(notification);
    }
    res.status(200).json({ success: { notifications } });
});



