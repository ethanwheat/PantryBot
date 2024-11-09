// pantrybot-backend/routes/groceries.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../config');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');
// may need more or less imports

router.get('/getprice', authenticateToken, (req, res) => {
    const { item } = req.body; // may need more info included in request
    // Access third party API and return pricing/location here
});

router.get('/search', async (req, res) => {
    const { item } = req.body;

    if (!item) {
        return res.status(400).json({ error: 'Please provide an item to search for.' });
    }

    try {
        const response = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
            params: {
                query: item,
                pageSize: 50, 
                api_key: config.fdcKey
            }
        });
        console.log("search for: ", item);

        const uniqueNames = new Set();
        
        response.data.foods.forEach(food => {
            // Convert description to title case if it's not a duplicate
            const titleCaseName = food.description
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            uniqueNames.add(titleCaseName);
        });

        res.json(Array.from(uniqueNames)); // Send back the array of unique, formatted names
        
    } catch (error) {
        console.error("Error fetching food data:", error);
        res.status(500).json({ error: 'Failed to fetch food data' });
    }
});

module.exports = router;
