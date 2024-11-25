// pantrybot-backend/models/Recipe.js
const mongoose = require('mongoose');

// Define item schema
const RecipeItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    ingredients: [
        {
            name: { type: String, required: true, trim: true }, // Ingredient name
            quantity: { type: String, required: true }, // Quantity of the ingredient
            unit: { type: String, required: true, trim: true }, // Unit of measurement (e.g., 'g', 'cup', 'tbsp')
        }
    ],
    estimatedTime: {
        type: Number, // Time in minutes
        required: false,
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Define pantry schema
const RecipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipes: [RecipeItemSchema] 
});

module.exports = mongoose.model('Recipe', RecipeSchema);
