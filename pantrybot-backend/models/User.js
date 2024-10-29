// pantrybot-backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 12
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    oboarded: {
        type: Boolean,
        default: false
    },
    profile: {
        firstname: String,
        lastname: String,
        zipcode: String,
    }
});

module.exports = mongoose.model('User', UserSchema);
