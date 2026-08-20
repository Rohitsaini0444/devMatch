const validator = require('validator');

const validateUserData = (userData) => {
    const { email, password, age, gender, photoURL } = userData;

    if (!email || !validator.isEmail(email)) {
        throw new Error('Invalid email address');
    }

    if (!password || !validator.isStrongPassword(password, { minLength: 8 })) {
        throw new Error('Invalid password');
    }

    // if (!age || age < 13) {
    //     throw new Error('Invalid age');
    // }

    // if (!gender || !['male', 'female', 'other'].includes(gender.toLowerCase())) {
    //     throw new Error('Invalid gender');
    // }

    // if (photoURL && !validator.isURL(photoURL)) {
    //     throw new Error('Invalid photo URL');
    // }
};

const validateEditProfileData = (req) => {
    const allowedFields = ['firstName', 'lastName', 'age', 'gender', 'photoURL', 'skills', 'about'];
    const updates = req.body;
    const isValidUpdate = Object.keys(updates).every((field) => allowedFields.includes(field));
    if (!isValidUpdate) {
        throw new Error('Invalid update fields');
    }
    return true; 
}

module.exports = {
    validateUserData,
    validateEditProfileData 
};