const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');

const { 
    createProfile, 
    updateProfile, 
    getProfile, 
    getAllProfiles 
} = require('../controllers/profile');


router.route('/create').post(createProfile);

router.route('/update/:id').patch(protect, updateProfile);

router.route('/get/:id').get(protect, getProfile);

router.route('/get').get(protect, getAllProfiles);


module.exports = router;