const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    description: { 
        type: String, 
        required: false 
    },
    logo: { 
        type: String, 
        required: false 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'userSchema',
        required: true
    },
});

const Websites = mongoose.model('Websites', websiteSchema);
module.exports = Websites