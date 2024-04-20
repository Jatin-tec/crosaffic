const axios = require('axios');

async function verify(userWebsiteUrl, scriptUrl) {
    // Ensure the URL starts with http:// or https://
    if (!/^https?:\/\//i.test(userWebsiteUrl)) {
        userWebsiteUrl = `http://${userWebsiteUrl}`;
    }

    try {
        const response = await axios.get(userWebsiteUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            },
            timeout: 10000 // Timeout after 10000 ms or 10 seconds
        });
        const websiteContent = response.data;
        console.log('Website content:', websiteContent);
        console.log('Script URL:', scriptUrl);
        // Use a regex to flexibly search for the script tag
        const scriptRegex = new RegExp(`<script\\s+[^>]*src=["']${escapeRegExp(scriptUrl)}["'][^>]*>`, 'i');
        console.log('Script regex:', scriptRegex);
        console.log('Script found:', scriptRegex.test(websiteContent));
        return scriptRegex.test(websiteContent);
    } catch (error) {
        console.error('Error fetching website data:', error);
        return false; // Assume not verified if there's an error fetching the page
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

module.exports = verify;
