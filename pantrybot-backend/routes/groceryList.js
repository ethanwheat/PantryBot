// pantrybot-backend/routes/groceryList.js
const express = require('express');
const router = express.Router();
const GroceryList = require('../models/GroceryList');
const authenticateToken = require('../middleware/authenticateToken');

// Create a new grocery list
router.post('/', authenticateToken, async (req, res) => {
    const { name, items } = req.body;
    const groceryList = new GroceryList({
        user: req.user.id, // Ensure this sets the correct user ID
        name,
        items,
    });

    try {
        await groceryList.save();
        res.status(201).json(groceryList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all grocery lists
router.get('/', authenticateToken, async (req, res) => {
    try {
        // Only return grocery lists for the authenticated user
        const groceryLists = await GroceryList.find({ user: req.user.id });
        res.json(groceryLists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a grocery list by ID
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        console.log('Request user ID:', req.user.id);
        console.log('Grocery list ID to delete:', req.params.id);

        const groceryList = await GroceryList.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id, // Ensure type consistency
        });

        if (!groceryList) return res.status(404).json({ message: 'Grocery list not found' });

        res.json({ message: 'Grocery list deleted' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});


// Add an item to a grocery list
router.post('/:id/items', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, quantity, unit } = req.body;

    try {
        const groceryList = await GroceryList.findById(id);
        if (!groceryList) return res.status(404).json({ message: 'Grocery list not found' });

        groceryList.items.push({ name, quantity, unit });
        await groceryList.save();
        res.status(201).json(groceryList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove an item from a grocery list
router.delete('/:id/items/:itemId', authenticateToken, async (req, res) => {
    const { id, itemId } = req.params;

    try {
        const groceryList = await GroceryList.findById(id);
        if (!groceryList) return res.status(404).json({ message: 'Grocery list not found' });

        // Find the index of the item
        const itemIndex = groceryList.items.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });

        // Remove the item by index
        groceryList.items.splice(itemIndex, 1);
        await groceryList.save();
        res.status(200).json(groceryList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Edit the quantity of an item in a grocery list
router.put('/:id/items/:itemId/quantity', authenticateToken, async (req, res) => {
    const { id, itemId } = req.params;
    const { quantity } = req.body;

    try {
        const groceryList = await GroceryList.findById(id);
        if (!groceryList) return res.status(404).json({ message: 'Grocery list not found' });

        const item = groceryList.items.id(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        // Update the item's quantity
        if (quantity !== undefined) {
            item.quantity = quantity; // Update the quantity
        }

        await groceryList.save();
        res.status(200).json(groceryList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
