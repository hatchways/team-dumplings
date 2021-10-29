const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const isProfileOwner = require('../middleware/isProfileOwner');
const { 
    setProfilePhoto, 
    setProfileGallery, 
    deleteProfilePhoto,
    setbackgroundPhoto
 } = require('../controllers/uploadPhotos');

router.route('/photo/:id').patch(protect, isProfileOwner, setProfilePhoto);

router.route('/background/:id').patch(protect, isProfileOwner, setbackgroundPhoto);

router.route('/gallary/:id').patch(protect, isProfileOwner, setProfileGallery);

router.route('/delete/:id').patch(protect, isProfileOwner, deleteProfilePhoto);


module.exports = router;