const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const uuid = require('uuid');

// Assuming this route exists for user registration
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds
        const apiSecret = uuid.v4();
        const user = new User({ 
            email: req.body.email, 
            password: hashedPassword,
            apiSecret: apiSecret,
            registeredDomain: req.body.registeredDomain
        });
        await user.save();
        res.status(201).send('User created successfully');
    } catch {
        res.status(500).send();
    }
});

// Updated login route with password verification
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: email });
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }

    try {
        // Compare submitted password with the hashed password stored in the database
        if (await bcrypt.compare(password, user.password)) {
            // Generate a JWT if the password is correct
            const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ accessToken: accessToken });
        } else {
            res.send('Not Allowed');
        }
    } catch {
        res.status(500).send();
    }
});

module.exports = router;