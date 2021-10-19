const isProfileValidInputs = (req, res, next) => {
    const inputs = Object.keys(req.body);
    const allowedInputs = ['firstName', 'lastName', 'gender', 'phoneNumber', 'address', 'availability', 'description', 'birthDate'];
    const isValidOperation = inputs.every((input) => allowedInputs.includes(input));

    if (!isValidOperation) {
        res.status(400);
        throw new Error('Invalid Update');
    } 

    next();
}

module.exports = isProfileValidInputs;
