require('dotenv').config();
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');
const setLocal = require('../middleware/setLocalScript');
const verifyScriptInstallation = require('../helpers/verifyScriptInstallation');
const Website = require('../models/websites');
const multer = require('multer');
const path = require('path');


const upload = multer({ dest: path.join(__dirname, 'public/media') });

router.get('/', (req, res) => {
    res.render('home.ejs', { title: 'Home' });
});

router.get('/dashboard', isAuthenticated, async (req, res) => {
    let message = null;
    if (req.session.showMessage) {
        message = req.session.message;
        req.session.showMessage = false;
    }
    const website = await Website.findOne({ user: req.session.user._id });
    if (!website) {
        req.session.showMessage = true;
        req.session.message = 'Please complete the setup to continue';
        return res.redirect('/add-website');
    }
    res.render('dashboard.ejs', { message: message, website: website });
});

router.get('/add-website', isAuthenticated, setLocal, (req, res) => {
    const message = req.session.showMessage ? req.session.message : null;
    const scriptUrl = res.locals.scriptUrl;

    res.render('setup.ejs', { message: message, scriptUrl: scriptUrl });
});

router.post('/add-website', isAuthenticated, setLocal, async (req, res) => {
    const { domain } = req.body;
    if (!domain) {
        return res.render('setup.ejs', { message: 'Please provide a website URL' });
    }
    
    const isInstalled = await verifyScriptInstallation(domain, res.locals.scriptUrl);

    if (isInstalled) {
        const website = new Website({ url: domain, user: req.session.user._id });
        await website.save();
        req.session.showMessage = true;
        req.session.message = 'Script is verified successfully!';
        res.redirect('/dashboard');
    } else {
        res.render('setup.ejs', { message: 'Script not found. Please ensure it is installed correctly.' });
    }
});

router.post('/update-website', isAuthenticated, upload.single('file-upload'), async (req, res) => {
    try {
        const { domain, about, one_liner } = req.body;
        const userId = req.session.user._id;
        const website = await Website.findOne({ user: userId });
        if (!website) {
            return res.status(404).send("Website not found.");
        }
        // Update fields
        if (domain) website.url = domain;
        if (about) website.description = about;
        if (one_liner) website.oneliner = one_liner;
        // Handling file upload, if exists
        if (req.file) {
            // Here you might want to set the path of the uploaded image to a field in your website model
            // For example, if you have a 'logo' field in the Website model
            website.logo = `/static/media/${req.file.filename}`;
        }
        await website.save();
        req.session.showMessage = true;
        req.session.message = 'Website updated successfully!';
        res.redirect('/dashboard');
    } catch (error) {
        req.session.showMessage = true;
        req.session.message = 'Error updating website';
        res.redirect('/dashboard');
    }
});

router.post('/verify-domain', isAuthenticated, setLocal, async (req, res) => {
    const { websiteUrl } = req.session.user;
    const isInstalled = await verifyScriptInstallation(websiteUrl, res.locals.scriptUrl);

    if (isInstalled) {
        res.send("Script is verified successfully!");
    } else {
        res.send("Script not found. Please ensure it is installed correctly.");
    }
});

router.get('/about', (req, res) => {
    res.render('aboutus.ejs', { title: 'About' });
});

router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile.ejs', { title: 'Profile' });
});

module.exports = router;
