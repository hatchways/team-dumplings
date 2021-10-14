const express = require('express');
const Profile = require('../models/Profile');
const asyncHandler = require("express-async-handler");

// @route POST /profile
// @desc Create profile
// @access Private
exports.createProfile = asyncHandler(async (req, res, next) => {
    const profile = new Profile(req.body);

    await profile.save(); 
    res.status(201).json({ success: { profile }});
});

// @route PATCH /profile/:id
// @desc update profile
// @access Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['firstName', 'lastName', 'gender', 'phoneNumber', 'address', 'availability', 'description'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (! isValidOperation){
        res.status(404);
        throw new Error('Invalid Update');
    }

    const updates = req.body;
    const options = { new: true };

    const updatedProfile = await Profile.findByIdAndUpdate(id, updates, options);
    res.status(200).json({ success: { updatedProfile }});
});

// @route GET /profile/:id
// @desc get profile
// @access Private
exports.getProfile = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    const profile = await Profile.findById(id);
    res.status(200).json({ success: { profile }});
});

// @route GET /profile
// @desc get all profiles
// @access Public
exports.getAllProfiles = asyncHandler(async (req, res, next) => {
    const profiles = await Profile.find();
    res.status(200).json({ success: { profiles } });
});



