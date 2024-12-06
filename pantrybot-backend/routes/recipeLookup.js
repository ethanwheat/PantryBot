const express = require('express');
const router = express.Router();
const config = require('../config');
const authenticateToken = require("../middleware/authenticateToken");
const User = require('../models/User');
const Pantry = require('../models/Pantry');
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: config.openAIKey});

router.get("/", authenticateToken, async (req, res) => {
    try {
        const { prompt, usePantry, useDiet, useAllergies, budget } = req.query;

        if (!prompt) {
            return res.status(400).json({ error: 'A valid prompt is required.' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Initialize pantryModifier
        let pantryModifier = '';

        if (usePantry === "true") {
            const pantry = await Pantry.findOne({ user: req.user.id });

            if (!pantry || pantry.items.length === 0) {
                return res.status(200).json({ error: 'Your pantry is empty. Please add items to your pantry or disable the pantry option.' });
            }

            let pantryText = '';

            if (pantry) {
                pantryText = pantry.items.map(item => `${item.name.toLowerCase()}`).join(', ');
            }  
            pantryModifier = `You may use any of the following ingredients (you do not have to use all of them): ${pantryText}.`;
        }

        // Initialize budgetModifier
        let budgetModifier = '';

        // Apply budget logic only if usePantry is false
        if (usePantry === "false") {
            if (budget === '0') {
                budgetModifier = 'Please find a cheap recipe. Use inexpensive ingredients and avoid any premium items.';
            } else if (budget === '2') {
                budgetModifier = 'Please find an expensive recipe. Use high-quality and premium ingredients.';
            }
        }

        const { diet_res, allergies } = user.profile;
        const userDiets = diet_res.filter(Boolean);
        const userAllergies = allergies.filter(Boolean);

        // Include diets and allergies if requested
        const dietModifier = (useDiet === "true" && userDiets.length > 0) 
            ? `Please ensure the recipe follows these dietary restrictions: ${userDiets.join(', ')}.` 
            : '';
        const allergyModifier = (useAllergies === "true" && userAllergies.length > 0) 
            ? `Avoid these allergens: ${userAllergies.join(', ')}.` 
            : '';

        const queryMessages = [
            { 
                role: "system", 
                content: `
                    You are a recipe lookup assistant. Please find a recipe based on the following prompt: ${prompt}. 
                    ${pantryModifier}               
                    ${budgetModifier}
                    ${dietModifier}
                    ${allergyModifier}
                    Return the recipe details in JSON, do not do any code formatting or markdown. Include:
                    - name: the name of the recipe,
                    - description: a brief description of the recipe and steps to make it, 
                    - ingredients: a list of ingredients needed for the recipe with the units needed (all fields required), put in this format: { name: "ingredient name", quantity: "quantity (as a float)", unit: "unit (cannot be empty string)" }, 
                    - estimatedTime: the total time it takes to prepare and cook the dish in minutes.
                    If you run into any errors please return in JSON format including:
                    - error: a brief description of the error.  
                ` 
            },
            { role: "user", content: prompt }
        ];
      
        console.log("Constructed Query:", queryMessages);

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: queryMessages,
        });

        const responseJson = JSON.parse(completion.choices[0].message.content);
        res.status(200).json(responseJson);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
