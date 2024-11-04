// pantrybot-backend/routes/profile.js
const express = require('express');
const router = express.Router();
const config = require('../config');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');
// may need more or less imports

// Temporarly setting onboarding value to true, replace with actual onboarding.
router.post("/tempOnboard", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        
        await User.findByIdAndUpdate(userId, { onboarded: true });

        res.status(200).json({ msg: 'Onboarding set to true sucessfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/onboard', authenticateToken, async (req, res) => {
    const { firstname, lastname, zipcode, diets, allergies } = req.body;
    // Add data to database here
});

module.exports = router;