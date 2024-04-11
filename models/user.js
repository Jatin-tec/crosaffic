const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: { 
        type: String, 
        required: true 
    },
    lastLogin: { 
        type: Date, 
        default: Date.now 
    },
    apiSecret: { 
        type: String, 
        required: true 
    },
    registeredDomain: { 
        type: String, 
        required: true 
    },
});


const Session = mongoose.model('userSchema', userSchema);
module.exports = Session