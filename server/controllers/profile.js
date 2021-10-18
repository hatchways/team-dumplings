const express = require('express');
const Profile = require('../models/Profile');
const User = require('../models/User');
const asyncHandler = require("express-async-handler");

// @route POST /profile
// @desc Create profile
// @access Private
exports.createProfile = asyncHandler(async (req, res, next) => {
    const profile = new Profile(req.body);
    const user = await User.findById(req.user.id);

    profile.user = req.user.id;
    user.profile = profile._id;

    await profile.save(); 
    await user.save();
    res.status(201).json({ success: { profile }});
});

// @route PATCH /profile/:id
// @desc update profile
// @access Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const profileId = req.params.id;
    
    const profile = await Profile.findById(profileId)

    const isProfileOwner =  profile.user.toString() === userId;

    if (!isProfileOwner) {
        res.status(400)
        throw new Error('This profile does not belong to you!');
    }

    const updates = req.body;
    const options = { new: true };

    const updatedProfile = await Profile.findByIdAndUpdate(profileId, updates, options);
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
    const profiles = await Profile.find().populate({path: "user", select: { password: 0 }});
    res.status(200).json({ success: { profiles } });
});



