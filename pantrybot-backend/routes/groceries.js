// pantrybot-backend/routes/groceries.js
const express = require('express');
const router = express.Router();
const config = require('../config');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');
// may need more or less imports

router.get('/getprice', authenticateToken, (req, res) => {
    const { item } = req.body; // may need more info included in request
    // Access third party API and return pricing/location here
});

module.exports = route;