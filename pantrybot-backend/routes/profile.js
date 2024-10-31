// pantrybot-backend/routes/profile.js
const express = require('express');
const router = express.Router();
const config = require('../config');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');
// may need more or less imports

router.post('/onboard', authenticateToken, async (req, res) => {
    const { firstname, lastname, zipcode, diets, allergies } = req.body;
    // Add data to database here
});

module.exports = router;