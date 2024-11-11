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
    onboarded: {
        type: Boolean,
        default: false
    },
    profile: {
        firstName: { type: String },
        lastName: { type: String },
        zipCode: { type: String },
        diet_res: { type: Array, default: [] },
        allergies: { type: Array, default: [] },
    },
});

module.exports = mongoose.model('User', UserSchema);
