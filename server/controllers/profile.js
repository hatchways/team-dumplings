const express = require('express');
const Profile = require('../models/Profile');
const User = require('../models/User');
const isProfileValidInputs = require('../utils/isProfileValidInputs');

const asyncHandler = require("express-async-handler");

// @route POST /profile
// @desc Create profile
// @access Private
exports.createProfile = asyncHandler(async (req, res, next) => {
    const profile = new Profile(req.body);
    profile.user = req.user.id;

    await profile.save(); 
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
    
    // const profileUpdates = Object.keys(req.body);
    // const allowedUpdates = ['firstName', 'lastName', 'gender', 'phoneNumber', 'address', 'availability', 'description'];
    // const isValidOperation = profileUpdates.every((update) => allowedUpdates.includes(update));

    // if (!isValidOperation){
    //     res.status(404);
    //     throw new Error('Invalid Update');
    // }

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



