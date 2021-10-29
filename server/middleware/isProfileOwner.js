const Profile = require('../models/Profile');

const isProfileOwner = async (req, res, next) => {
    const userId = req.user.id;
    const profileId = req.params.id;
    
    const profile = await Profile.findById(profileId);

    const isOwner =  profile.user.toString() === userId;

    if (!isOwner) {
        res.status(400);
        throw new Error('This profile does not belong to you!');
    }
    next();
}

module.exports = isProfileOwner;

