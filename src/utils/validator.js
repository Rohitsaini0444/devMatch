const validator = require('validator');

const validateUserData = (userData) => {
    const { email, password, firstName, lastName } = userData;

    if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 2) {
        throw new Error('First name must be at least 2 characters');
    }

    if (!lastName || typeof lastName !== 'string' || lastName.trim().length < 2) {
        throw new Error('Last name must be at least 2 characters');
    }

    if (!email || !validator.isEmail(email)) {
        throw new Error('Invalid email address');
    }

    if (!password || !validator.isStrongPassword(password, { minLength: 8 })) {
        throw new Error('Password must be at least 8 characters with uppercase, lowercase, and numbers');
    }
};

const validateEditProfileData = (req) => {
    const allowedFields = ['firstName', 'lastName', 'age', 'gender', 'photoURL', 'skills', 'about'];
    const updates = req.body;
    
    // Check for invalid fields
    const isValidUpdate = Object.keys(updates).every((field) => allowedFields.includes(field));
    if (!isValidUpdate) {
        throw new Error('Invalid update fields. Allowed fields: ' + allowedFields.join(', '));
    }

    // Validate required fields
    if (updates.firstName !== undefined) {
        if (typeof updates.firstName !== 'string' || updates.firstName.trim().length < 2) {
            throw new Error('First name must be at least 2 characters');
        }
    }

    if (updates.lastName !== undefined) {
        if (typeof updates.lastName !== 'string' || updates.lastName.trim().length < 2) {
            throw new Error('Last name must be at least 2 characters');
        }
    }

    // Validate optional fields
    if (updates.age !== undefined && updates.age !== null && updates.age !== '') {
        const age = parseInt(updates.age, 10);
        if (isNaN(age) || age < 13 || age > 120) {
            throw new Error('Age must be between 13 and 120');
        }
    }

    if (updates.gender !== undefined && updates.gender !== null && updates.gender !== '') {
        const validGenders = ['male', 'female', 'other', 'prefer not to say'];
        if (!validGenders.includes(updates.gender.toLowerCase())) {
            throw new Error('Invalid gender. Must be one of: ' + validGenders.join(', '));
        }
    }

    if (updates.photoURL !== undefined && updates.photoURL !== null && updates.photoURL !== '') {
        if (!validator.isURL(updates.photoURL)) {
            throw new Error('Photo URL must be a valid URL');
        }
        if (!updates.photoURL.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            throw new Error('Photo URL must point to a valid image file');
        }
    }

    if (updates.skills !== undefined && updates.skills !== null) {
        if (!Array.isArray(updates.skills)) {
            throw new Error('Skills must be an array');
        }
        if (updates.skills.length > 50) {
            throw new Error('Maximum 50 skills allowed');
        }
        updates.skills.forEach((skill) => {
            if (typeof skill !== 'string' || skill.trim().length === 0) {
                throw new Error('Skills cannot be empty');
            }
            if (skill.trim().length > 50) {
                throw new Error('Each skill must not exceed 50 characters');
            }
        });
    }

    if (updates.about !== undefined && updates.about !== null && updates.about !== '') {
        if (typeof updates.about !== 'string' || updates.about.length > 500) {
            throw new Error('About section must not exceed 500 characters');
        }
    }

    return true;
};

const validatePasswordChange = (oldPassword, newPassword) => {
    if (!oldPassword || typeof oldPassword !== 'string') {
        throw new Error('Old password is required');
    }

    if (!newPassword || !validator.isStrongPassword(newPassword, { minLength: 8 })) {
        throw new Error('New password must be at least 8 characters with uppercase, lowercase, and numbers');
    }

    if (oldPassword === newPassword) {
        throw new Error('New password must be different from old password');
    }
};

module.exports = {
    validateUserData,
    validateEditProfileData,
    validatePasswordChange
};