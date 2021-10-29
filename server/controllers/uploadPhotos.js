const aws  = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const asyncHandler = require("express-async-handler");
const Profile = require('../models/Profile');

const bucketName = process.env.S3_BUCKET_NAME

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_BUCKET_REGION
});

const upload = () => {
    return multer({
        storage: multerS3({
            s3,
            bucket: bucketName,
            metadata: function(req, file, cb){
                cb(null, { fieldName: file.fieldname })
            },
            key: function(req, file, cb){
                cb(null, `image-${Date.now()}.jpeg`)
            }
            
        })
    })
};

// @route PATCH /upload/photo/:id 
// @desc Update profile Photo. 
// @access Private
exports.setProfilePhoto = asyncHandler(async (req, res, next) => {
    const profileId = req.params.id;
    const uploadSingle = upload().single('profilePhoto');
    uploadSingle(req, res, async (err) => {
        if (err) return res.status(400).json({ message: err.message });

        const updatedProfile = await Profile.findByIdAndUpdate(profileId, 
            { profilePhotoName: req.file.key }, 
            { new: true });
        res.status(200).json({ success: { data: req.file.key }});
    });
});

// @route PATCH /upload/background/:id 
// @desc Update background Photo. 
// @access Private
exports.setbackgroundPhoto = asyncHandler(async (req, res, next) => {
    const profileId = req.params.id;
    const uploadSingle = upload().single('backgroundPhoto');
    uploadSingle(req, res, async (err) => {
        if (err) return res.status(400).json({ message: err.message });

        const updatedProfile = await Profile.findByIdAndUpdate(profileId, 
            { backgroundPhotoName: req.file.key }, 
            { new: true });
        res.status(200).json({ success: { data: req.file.key }});
    });
});

// @route PATCH /upload/gallery/:id 
// @desc Update profile Gallery. 
// @access Private
exports.setProfileGallery = asyncHandler(async (req, res, next) => {
    const profileId = req.params.id;
    const uploadArray = upload().array('gallery');
    uploadArray(req, res, async (err) => {
        if (err) return res.status(400).json({ message: err.message });
        const files = req.files
        let gallery = files.map(file => file.key);

        const updatedProfile = await Profile.findByIdAndUpdate(profileId, 
            gallery, 
            { new: true });
        res.status(200).json({ data: req.file });
    });
});

// @route PATCH /upload/delete/:id 
// @desc delete background/Profile Photo. 
// @access Private
exports.deleteProfilePhoto = asyncHandler(async (req, res, next) => {
    const profileId = req.params.id;
    const { photoName, photoType } = req.body;
    s3.deleteObject({ Bucket: bucketName, Key: photoName }, async (err, data) => {
        if (err) return res.status(400).json({ message: err.message });
        let photoToDelete = {};
        if (photoType === 'profilePhoto') photoToDelete = { profilePhotoName: null }; 
        else if(photoType === 'backgroundPhoto') photoToDelete = { backgroundPhotoName: null };
        else throw new Error('please enter a valid photo type');

        const updatedProfile = await Profile.findByIdAndUpdate(profileId, 
            photoToDelete, 
            { new: true });

        res.status(200).json({ success: { updatedProfile } });
    });

});