require('dotenv').config();
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/auth');

router.get('/', (req, res) => {
    res.render('home.ejs', { title: 'Home' });
});

router.get('/dashboard', isAuthenticated, async (req, res) => {
    let message = null;
    if (req.session.showMessage) {
        message = req.session.message;
        req.session.showMessage = false; // Make sure to unset the flag
    }
    res.render('dashboard.ejs', { message: message,  });
})

// // Route to add a website
// router.post('/add-website', async (req, res) => {
//     const { url, advertisementUrl } = req.body;
//     const website = new Website({ url, advertisementUrl });
//     await website.save();
//     res.send('Website added successfully.');
// });

// // Route to generate script link (For simplicity, it just returns a static script URL in this example)
// router.get('/generate-script', (req, res) => {
//     res.send({ scriptUrl: `${Domain}/static/script.js` });
// });

module.exports = router;