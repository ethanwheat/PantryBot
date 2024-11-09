// pantrybot-backend/config.js
require('dotenv').config()

module.exports = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    clientURL: process.env.CLIENT_URL,
    fdcKey: process.env.FDC_API
};
