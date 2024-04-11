// Route to add a website
app.post('/add-website', async (req, res) => {
    const { url, advertisementUrl } = req.body;
    const website = new Website({ url, advertisementUrl });
    await website.save();
    res.send('Website added successfully.');
});

// Route to generate script link (For simplicity, it just returns a static script URL in this example)
app.get('/generate-script', (req, res) => {
    res.send({ scriptUrl: `${Domain}/static/script.js` });
});

module.exports = router;