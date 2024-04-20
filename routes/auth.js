const express = require('express');
const router = express.Router();
const { createUser, authenticateUser } = require('../helpers/auth');

router.get('/login', (req, res) => {
    res.render('login.ejs', { title: 'Login' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Authentication logic here...
    const user = await authenticateUser(email, password);

    if (user) {
        req.session.userId = user.id; // Store user's ID in session
        req.session.isAuthenticated = true; // Mark session as authenticated
        req.session.showMessage = true;
        req.session.message = 'Login successful';

        // Check if a return URL was provided
        const returnUrl = req.query.returnUrl ? decodeURIComponent(req.query.returnUrl) : '/dashboard';
        return res.redirect(returnUrl);
    } else {
        res.redirect('/auth/login?error=invalidCredentials');
    }
});

router.get('/register', (req, res) => {
    res.render('signup.ejs', { title: 'Register' });
})

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session = null
        res.redirect('/auth/login');
    } else {
        res.redirect('/auth/login'); // Redirect if session does not exist
    }
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await createUser(email, password);
        req.session.userId = user.id; // Store user's ID in session
        req.session.isAuthenticated = true; // Mark session as authenticated
        req.session.showMessage = true;
        req.session.message = 'User created successfully';
        res.redirect('/dashboard');
    } catch (err) {
        return res.status(400).send('Could not create user');
    }
});

module.exports = router;
