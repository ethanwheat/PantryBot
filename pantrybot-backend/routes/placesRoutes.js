//*** This file handles the logic to interact with Google Places API***

// backend/routes/placesRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const config = require('../config');

// Route to get nearby grocery stores
router.get('/nearby', async (req, res) => {
    const { lat, lng, product } = req.query;  // Accept latitude, longitude, and product name

    if (!lat || !lng) {
        return res.status(400).json({ message: 'Latitude and Longitude are required' });
    }

    try {
        // Make a request to Google Places API
        const placesResponse = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
            params: {
                location: `${lat},${lng}`,
                radius: 8000,  // Search within a 8 km (~5 mi) radius. Set this radius for now. Might change later upon testing and feedback
                type: 'grocery_or_supermarket',  // Filter for grocery stores
                keyword: product,  // Filter by product name
                key: config.googleApiKey  // API Key from config.js
            }
        });

        // Send data from Google Places API back to client
        console.log('Places API response:', placesResponse.data); // Log the entire API response
        res.json(placesResponse.data.results);
    } catch (error) {
        //console.error('Error fetching places:', error);
        console.error('Error fetching places:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to retrieve nearby places' });
    }
});

module.exports = router;
