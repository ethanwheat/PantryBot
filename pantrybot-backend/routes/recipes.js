// pantrybot-backend/routes/recipes.js
const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const authenticateToken = require('../middleware/authenticateToken');

// Add a recipe
router.post('/add', authenticateToken, async (req, res) => {
    const { name, description, ingredients, estimatedTime } = req.body;

    // Validate request body
    if (!name || !description || !ingredients || !estimatedTime) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if user has a Recipe document
        let userRecipes = await Recipe.findOne({ user: req.user.id });

        if (!userRecipes) {
            // Create a new Recipe document if it doesn't exist
            userRecipes = new Recipe({
                user: req.user.id,
                recipes: [] // Ensure `recipes` is initialized as an array
            });
        }

        // Add the new recipe to the `recipes` array
        const newRecipe = {
            name,
            description,
            ingredients,
            estimatedTime
        };

        userRecipes.recipes.push(newRecipe); // Push the new recipe
        await userRecipes.save();

        res.status(201).json({ message: 'Recipe added successfully.', recipe: newRecipe });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        // Find the user's Recipe document
        const userRecipes = await Recipe.findOne({ user: req.user.id });

        // If no Recipe document exists, return an empty array
        if (!userRecipes || !userRecipes.recipes || userRecipes.recipes.length === 0) {
            return res.status(200).json({ recipes: [] });
        }

        // Map items to extract only `name` and `_id`
        const recipes = userRecipes.recipes.map(item => ({
            id: item._id,
            name: item.name
        }));

        res.status(200).json({ recipes });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

// Get details of a specific recipe
router.get('/:id', authenticateToken, async (req, res) => {
    const recipeId = req.params.id;

    try {
        // Find the user's Recipe document
        const userRecipes = await Recipe.findOne({ user: req.user.id });

        // Check if the Recipe document exists
        if (!userRecipes || !userRecipes.recipes || userRecipes.recipes.length === 0) {
            return res.status(404).json({ message: 'No recipes found for this user.' });
        }

        // Find the specific recipe by ID
        const recipe = userRecipes.recipes.find(item => item._id.toString() === recipeId);

        // If the recipe is not found, return a 404 error
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found.' });
        }

        res.status(200).json({ recipe });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    const recipeId = req.params.id;

    try {
        // Find the user's Recipe document
        const userRecipes = await Recipe.findOne({ user: req.user.id });

        // Check if the Recipe document exists
        if (!userRecipes ||  !userRecipes.recipes || userRecipes.recipes.length === 0) {
            return res.status(404).json({ message: 'No recipes found for this user.' });
        }

        // Find the index of the recipe to delete
        const recipeIndex = userRecipes.recipes.findIndex(item => item._id.toString() === recipeId);

        // If the recipe is not found, return a 404 error
        if (recipeIndex === -1) {
            return res.status(404).json({ message: 'Recipe not found.' });
        }

        // Remove the recipe from the items array
        userRecipes.recipes.splice(recipeIndex, 1);

        // Save the updated Recipe document
        await userRecipes.save();

        res.status(200).json({ message: 'Recipe deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

module.exports = router;
