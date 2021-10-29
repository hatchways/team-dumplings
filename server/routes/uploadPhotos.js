const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { 
    setProfilePhoto, 
    setProfileGallery, 
    deleteProfilePhoto,
    setbackgroundPhoto
 } = require('../controllers/uploadPhotos');

router.route('/photo/:id').patch(protect, setProfilePhoto);

router.route('/background/:id').patch(protect, setbackgroundPhoto);

router.route('/gallary/:id').patch(protect, setProfileGallery);

router.route('/delete/:id').patch(protect, deleteProfilePhoto);


module.exports = router;