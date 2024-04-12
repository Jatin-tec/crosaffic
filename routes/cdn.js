require('dotenv').config();
const express = require('express');

const User = require('../models/user');

const { getAdvertisementUrlForUser } = require('../helpers/getAdvertisementUrlForUser');

var router = express.Router();

router.get('/fetch-script', async (req, res) => {
    const { apiKey } = req.query;
    const requestOrigin = req.get('origin');

    if (!apiKey) {
        return res.status(401).send('API Key required');
    }

    try {
        const user = await User.findOne({ apiSecret: apiKey });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // console.log(user.registeredDomain, requestOrigin);

        // if (user.registeredDomain !== requestOrigin) {
        //     return res.status(403).send('Unauthorized domain');
        // }

        // Dynamically generate the advertisement URL based on the user
        const adUrl = await getAdvertisementUrlForUser(user._id);

        // Dynamically generate the script content
        const scriptContent = `
        const adPopup = document.createElement('div');
        adPopup.innerHTML = \`<a href="${adUrl}">Check out this site!</a>\`;
        document.body.appendChild(adPopup);
        `;

        res.set('Content-Type', 'application/javascript');
        res.send(scriptContent);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;