const express = require('express');
const Profile = require('../models/Profile');
const asyncHandler = require("express-async-handler");

// @route POST /profile/create
// @desc Create profile
// @access Public
exports.createProfile = asyncHandler(async (req, res, next) => {
    const profile = new Profile(req.body);

    try {
        await profile.save(); 
        res.status(201).json({ success: { profile }});
    } catch(error) {
        res.status(406).json({ error })
    }
});

// @route PATCH /profile/update/:id
// @desc update profile
// @access private
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    try {
        const updatedProfile = await Profile.findByIdAndUpdate(id, updates, options);
        res.status(200).json({ success: { updatedProfile }});
    } catch (error) {
        res.status(400).json({ error });
    }
});

// @route GET /profile/get/:id
// @desc get profile
// @access private
exports.getProfile = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    try{
        const profile = await Profile.findById({ _id: id });
        res.status(200).json({ success: { profile }});
    } catch (error) {
        res.status(400).json({ error });
    }
});

exports.getAllProfiles = asyncHandler(async (req, res, next) => {
    
    try{
        const profiles = await Profile.find();
        res.status(200).json({ success: { profiles } });
    } catch(error) {
        res.status(400).json({ error });
    }

});



