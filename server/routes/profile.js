const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { 
    createProfile, 
    updateProfile, 
    getProfile, 
    getAllProfiles 
} = require('../controllers/profile');


router.route('/').post(protect, createProfile);

router.route('/:id').patch(protect, updateProfile);

router.route('/:id').get(protect, getProfile);

router.route('/').get(getAllProfiles);

module.exports = router;