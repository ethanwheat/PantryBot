// pantrybot-backend/routes/groceryList.js
const express = require('express');
const router = express.Router();
const GroceryList = require('../models/GroceryList');
const authenticateToken = require('../middleware/authenticateToken');
const { OpenAI } = require('openai');
require('dotenv').config();

// Create a new grocery list
router.post('/', authenticateToken, async (req, res) => {
    console.log('POST request received at /grocerylist');       //DEBUG
    const { name, dateCreated, items } = req.body;
    const groceryList = new GroceryList({
        user: req.user.id, // Ensure this sets the correct user ID
        name,
        dateCreated,
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
        const groceryLists = await GroceryList.find({ user: req.user.id }).sort({ dateCreated: -1 });
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

// Check the inCart of an item in a grocery list
router.put('/:id/items/:itemId/inCart', authenticateToken, async (req, res) => {
    const { id, itemId } = req.params;
    const { inCart } = req.body;

    try {
        const groceryList = await GroceryList.findById(id);
        if (!groceryList) return res.status(404).json({ message: 'Grocery list not found' });

        const item = groceryList.items.id(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        // Update inCart
        if (inCart !== undefined) {
            item.inCart = inCart; // Update the inCart
        }

        await groceryList.save();
        res.status(200).json(groceryList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Excluding items in the pantry or grocery list using an OpenAI API query to filter items
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Add recipe items to grocery list
router.post('/:id/addRecipeItems', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { recipeItems, excludePantry, excludeGroceryList } = req.body;

    try {
        // Fetch user's pantry
        let pantryItems = [];
        if (excludePantry) {
            const pantry = await Pantry.findOne({ user: req.user.id });
            pantryItems = pantry ? pantry.items.map(item => ({
                name: item.name.toLowerCase(),
                quantity: item.quantity,
                unit: item.unit,
            })) : [];
        }

        // Fetch user's grocery list
        let groceryListItems = [];
        const groceryList = await GroceryList.findById(id);
        if (!groceryList) return res.status(404).json({ message: 'Grocery list not found' });

        if (excludeGroceryList) {
            groceryListItems = groceryList.items.map(item => ({
                name: item.name.toLowerCase(),
                quantity: item.quantity,
                unit: item.unit,
            }));
        }

        // If filtering is needed, query OpenAI API
        let itemsToAdd = recipeItems;
        if (excludePantry || excludeGroceryList) {
            const pantryText = pantryItems.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', ');
            const groceryListText = groceryListItems.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', ');
            const recipeText = recipeItems.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', ');

            const query = `
I have these items in the pantry: {${pantryText}}. 
I have these items already in my grocery list: {${groceryListText}}. 
What additional items will I need to purchase to make this recipe: {${recipeText}}? 
Return the items in the following JSON format: 
[{ "name": "<item name>", "quantity": <quantity>, "unit": "<unit>" }]
            `;

            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant that processes recipes and grocery data and provides JSON-formatted outputs.' },
                    { role: 'user', content: query },
                ],
                max_tokens: 150,
                temperature: 0.7,
            });

            itemsToAdd = JSON.parse(response.choices[0].message.content.trim());
        }

        // Add the filtered items to the grocery list
        itemsToAdd.forEach(item => {
            groceryList.items.push({
                name: item.name,
                quantity: item.quantity,
                unit: item.unit,
            });
        });

        await groceryList.save();
        res.status(200).json(groceryList);

    } catch (error) {
        console.error('Error adding recipe items:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;