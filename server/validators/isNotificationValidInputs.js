const isNotificationsValidInputs = (req, res, next) => {
    const inputs = Object.keys(req.body);
    const allowedInputs = ['userId', 'read', 'eventType', 'eventId', 'details'];
    const isValidUpdates = inputs.every((input) => allowedInputs.includes(input));

    if (!isValidUpdates) {
        res.status(400);
        throw new Error('Invalid Update');
    }

    next();
}
 

module.exports = isNotificationsValidInputs; 
