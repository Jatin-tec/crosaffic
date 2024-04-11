const bcrypt = require('bcrypt');
const uuid = require('uuid');

// Import models
const User = require('../models/user');

async function createUser(email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const apiSecret = uuid.v4();
        const user = new User({
            email: email,
            password: hashedPassword,
            apiSecret: apiSecret,
        });
        await user.save();
        return user;
    } catch {
        throw new Error('Could not create user');
    }
}

async function authenticateUser(email, password) {
    const user = await User.findOne({ email: email });
    if (user == null) {
        return false;
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            return user;
        } else {
            return false;
        }
    } catch {
        res.status(500).send();
    }
}

module.exports = { createUser, authenticateUser };
