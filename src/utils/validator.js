const validator = require('validator');

const validateUserData = (userData) => {
    const { email, password, age, gender, photoURL } = userData;

    if (!email || !validator.isEmail(email)) {
        throw new Error('Invalid email address');
    }

    if (!password || !validator.isStrongPassword(password, { minLength: 8 })) {
        throw new Error('Invalid password');
    }

    if (!age || age < 13) {
        throw new Error('Invalid age');
    }

    if (!gender || !['male', 'female', 'other'].includes(gender.toLowerCase())) {
        throw new Error('Invalid gender');
    }

    if (photoURL && !validator.isURL(photoURL)) {
        throw new Error('Invalid photo URL');
    }
};

module.exports = {
    validateUserData
};