const Website = require('../models/websites');

// Function to get an advertisement URL for a specific user
async function getAdvertisementUrlForUser(userId) {
    try {
        // Fetch websites not associated with the user
        const websites = await Website.find({ user: { $ne: userId } });

        if (!websites || websites.length === 0) {
            throw new Error('No advertisements available.');
        }

        // For demonstration, select a random website to advertise
        const randomIndex = Math.floor(Math.random() * websites.length);
        const selectedWebsite = websites[randomIndex];

        // Construct an advertisement URL
        const adUrl = selectedWebsite.url; // Use the website's URL for the ad

        return adUrl;
    } catch (error) {
        console.error(`Error fetching advertisement URL:`, error);
        throw error; // Rethrow the error or handle it as you see fit
    }
}

module.exports = { getAdvertisementUrlForUser };