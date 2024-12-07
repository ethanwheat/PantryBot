// pantrybot-backend/config.js
require('dotenv').config()

module.exports = {
    nodeEnv: process.env.NODE_ENV,
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    clientURL: process.env.CLIENT_URL,
    clientDomain: process.env.CLIENT_DOMAIN,
    openAIKey: process.env.OPENAI_API_KEY,
    fdcKey: process.env.FDC_API_KEY,
    googleApiKey: process.env.GOOGLE_PLACES_API_KEY
};
