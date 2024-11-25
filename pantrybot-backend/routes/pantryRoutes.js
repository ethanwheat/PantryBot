// pantrybot-backend/routes/pantry.js
const express = require('express');
const router = express.Router();
const Pantry = require('../models/Pantry');
const authenticateToken = require('../middleware/authenticateToken');

// Get all items in the pantry
router.get('/', authenticateToken, async (req, res) => {
    try {
      let pantry = await Pantry.findOne({ user: req.user.id });
  
      if (!pantry) {
        // Create a new pantry if one doesn't exist
        pantry = new Pantry({ user: req.user.id, items: [] });
        await pantry.save();
      }
  
      pantry.items.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
      
      res.status(200).json(pantry.items); // Return the items in the pantry
    } catch (error) {
      console.error("Error fetching pantry:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
// Add an item to the pantry
router.post('/items', authenticateToken, async (req, res) => {
    const { name, quantity, unit, dateCreated } = req.body;

    try {
        let pantry = await Pantry.findOne({ user: req.user.id });
        if (!pantry) {
            pantry = new Pantry({ user: req.user.id, items: [] });
        }

        pantry.items.push({ name, quantity, unit, dateCreated });
        await pantry.save();
        pantry.items.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
        res.status(201).json(pantry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an item from the pantry
router.delete('/items/:itemId', authenticateToken, async (req, res) => {
    const { itemId } = req.params;

    try {
        const pantry = await Pantry.findOne({ user: req.user.id });
        if (!pantry) return res.status(404).json({ message: 'Pantry not found' });

        const itemIndex = pantry.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });

        pantry.items.splice(itemIndex, 1);
        await pantry.save();
        res.status(200).json(pantry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Edit the quantity of an item in the pantry
router.put('/items/:itemId/quantity', authenticateToken, async (req, res) => {
    const { itemId } = req.params;
    const { increment } = req.body;

    try {
        const pantry = await Pantry.findOne({ user: req.user.id });
        if (!pantry) return res.status(404).json({ message: 'Pantry not found' });

        const item = pantry.items.id(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (increment !== undefined) {
            item.quantity += increment;
        }

        await pantry.save();
        res.status(200).json(pantry.items); // Return the updated items array
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
