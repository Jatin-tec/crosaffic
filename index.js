const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Import routes
const authRouter = require('./routes/auth')
const cdnRouter = require('./routes/cdn')


const app = express();

mongoose.connect(process.env.MONGO_URI || "mongodb://rootuser:rootpass@localhost:27017/?authSource=admin")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(cors());
app.use(bodyParser.json());

app.set('/view', path.join(__dirname + '/templates'));
app.use('/static', express.static(path.join(__dirname, '/public')));


app.use('/auth', authRouter)
app.use('/cdn', cdnRouter)


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
