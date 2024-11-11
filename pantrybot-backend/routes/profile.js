// pantrybot-backend/routes/profile.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/onboard', authenticateToken, async (req, res) => {
    const { firstname, lastname, zipcode, diets, allergies } = req.body;

    console.log("Received data:", req.body); // Log the incoming data

    try {
        const userId = req.user.id;

        const updateData = {
            onboarded: true,
            profile: {
                firstname,
                lastname,
                zipcode,
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

module.exports = router;
