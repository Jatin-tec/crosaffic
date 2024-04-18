const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const session = require('express-session');

// Import routes
const authRouter = require('./routes/auth')
const cdnRouter = require('./routes/cdn')
const dashboardRouter = require('./routes/dashboard')

const app = express();

mongoose.connect(process.env.MONGO_URI || "mongodb://rootuser:rootpass@localhost:27017/?authSource=admin")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET, // Secret key to sign the session ID cookie
  resave: false, // Do not force session to be saved back to the session store
  saveUninitialized: false, // Do not force uninitialized sessions to be saved
  cookie: { secure: process.env.NODE_ENV === 'production' } // Use secure cookies in production
}));

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/templates'));
app.use('/static', express.static(path.join(__dirname, '/public')));

app.use('/', dashboardRouter)
app.use('/auth', authRouter)
app.use('/cdn', cdnRouter)


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
