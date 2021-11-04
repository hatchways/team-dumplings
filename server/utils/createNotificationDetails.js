const createNotificationDetails = (firstName, description, profilePhoto, eventType, eventId, details) => {
    switch(eventType) {
        case 'request':
            details.linkTo = `/request/${eventId}`;
            details.text = `${firstName} has request your service`
            break;
        case 'payment':
            details.linkTo = `/payment/${eventId}`;
            details.text = ` you have received your payment from ${firstName}`;
            break;
        case 'message':
            details.linkTo = `/conversations/${eventId}`;
            details.text = ` you have a new message from ${firstName}`;
    }
    details.name = firstName;
    details.description = description;
    details.profilePhoto = profilePhoto ? profilePhoto : 'defaultAvatar.png';

    return details;
}



module.exports = createNotificationDetails;