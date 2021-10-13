const express = require('express');
const Profile = require('../models/Profile');
const asyncHandler = require("express-async-handler");

// @route POST /profile
// @desc Create profile
// @access Public
exports.createProfile = asyncHandler(async (req, res, next) => {
    // Checking for empty input
    for (let key in req.body) {
        if (req.body[key].trim() === "") {
          res.status(406);
          throw new Error("Invalid input, please do not send empty input(s)")
        }
      }

    const profile = new Profile(req.body);

    try {
        await profile.save(); 
        res.status(201).json({ success: { profile }});
    } catch(error) {
        res.status(400).json({ error });
    }
});

// @route PATCH /profile/:id
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

// @route GET /profile/:id
// @desc get profile
// @access private
exports.getProfile = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    try{
        const profile = await Profile.findById(id);
        res.status(200).json({ success: { profile }});
    } catch (error) {
        res.status(404).json({ error });
    }
});

// @route GET /profile
// @desc get all profiles
// @access private
exports.getAllProfiles = asyncHandler(async (req, res, next) => {
    try{
        const profiles = await Profile.find();
        res.status(200).json({ success: { profiles } });
    } catch(error) {
        res.status(500).json({ error });
    }
});



