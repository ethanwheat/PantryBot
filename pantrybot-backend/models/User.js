// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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
