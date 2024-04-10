const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (ensure you replace 'your_database_uri' with your actual connection string)
mongoose.connect('your_database_uri', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a model for websites
const Website = mongoose.model('Website', { url: String, advertisementUrl: String });

// Route to add a website
app.post('/add-website', async (req, res) => {
    const { url, advertisementUrl } = req.body;
    const website = new Website({ url, advertisementUrl });
    await website.save();
    res.send('Website added successfully.');
});

// Route to generate script link (For simplicity, it just returns a static script URL in this example)
app.get('/generate-script', (req, res) => {
    res.send({ scriptUrl: 'http://yourserver.com/static/script.js' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
