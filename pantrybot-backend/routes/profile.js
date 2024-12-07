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
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        console.log("User Profile Data:", user.profile); // ***** DEBUG *****

        res.status(200).json({
            profile: {
                firstName: user.profile.firstName,
                lastName: user.profile.lastName,
                zipCode: user.profile.zipCode,
                diets: user.profile.diet_res,
                allergies: user.profile.allergies,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;
