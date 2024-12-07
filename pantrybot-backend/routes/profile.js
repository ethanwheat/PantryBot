// pantrybot-backend/routes/profile.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/onboard', authenticateToken, async (req, res) => {
    const { firstName, lastName, zipCode, diets, allergies } = req.body;

    console.log("Received data:", req.body); // Log the incoming data

    try {
        const userId = req.user.id;

        const updateData = {
            onboarded: true,
            profile: {
                firstName,
                lastName,
                zipCode,
                diet_res: diets || [],
                allergies: allergies || []
            }
        };

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        console.log("Updated user:", updatedUser); // Log the updated user

        res.status(200).json({ msg: 'User onboarded successfully', onboarded: updatedUser.onboarded });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ profile: user.profile });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
