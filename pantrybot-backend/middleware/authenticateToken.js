// pantrybot-backend/middleware/authenticateToken.js
const jwt = require('jsonwebtoken');
const config = require('../config');

const isProduction = config.nodeEnv === "production";

const authenticateToken = (req, res, next) => {
    // Get the token from cookies
    const token = req.cookies.auth;

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded.user; // Attach user info to the request
        next(); // Continue to the next middleware or route handler
    } catch (err) {
        res.clearCookie("auth", { domain: isProduction ? "pantrybot.xyz" : "localhost" });  // clear the cookie if the token is invalid
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authenticateToken;
