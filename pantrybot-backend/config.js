// backend/config.js
require('dotenv').config()

module.exports = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    googleApiKey: process.env.GOOGLE_PLACES_API_KEY
};
