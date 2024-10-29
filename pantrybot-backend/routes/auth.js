// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

// Register Route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ username });
        let useremail = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        if (useremail) {
            return res.status(400).json({ msg: 'Email already exists' });
        }
        user = new User({ username, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        console.log(`User registered: ${username} (Email: ${email})`); // Log registration

        // Generate JWT token
        const payload = {
            user: { id: user.id }
        };

        // In seconds
        const expiresIn = 3600

        jwt.sign(payload, config.jwtSecret, { expiresIn }, 
        (err, token) => {
            if (err) throw err;
            const stringifiedToken = JSON.stringify(token);
            res.cookie("authToken", stringifiedToken, {
                maxAge: expiresIn * 100,
                secure: true
            });
            res.json({ msg: "User created successfully."});
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/login', async (req, res) => {
    const { userORemail, password } = req.body;

    try {
        // Check if the user exists
        let user = await User.findOne({ 
          $or: [
              { username: userORemail },
              { email: userORemail}
          ]
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid username or email' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        console.log(`User logged in: ${user.username} (Email: ${user.email})`); // Log login

        // Generate JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        // In seconds
        const expiresIn = 3600

        jwt.sign(payload, config.jwtSecret, { expiresIn }, 
        (err, token) => {
            if (err) throw err;
            const stringifiedToken = JSON.stringify(token);
            res.cookie("authToken", stringifiedToken, {
                maxAge: expiresIn * 100,
                secure: true
            });
            res.json({ msg: "User logged in successfully."});
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
