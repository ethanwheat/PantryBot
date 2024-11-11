const express = require('express');
const router = express.Router();
const config = require('../config');
const authenticateToken = require("../middleware/authenticateToken");
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: config.openAIKey});

router.get("/", authenticateToken, async (req, res) => {
    try {
        const { prompt, usePantry, useGroceryList } = req.query;

        // These are placeholders, please replace with an access to the database to get pantry items and grocery items
        // depending on if usePantry or useGroceryList is true.
        let pantryItems = ["chicken"]
        let groceryListItems = ["onion", "garlic"];

        if (!prompt) {
            return res.status(400).json({ error: 'A valid prompt is required.' });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: `
                    You are a recipe lookup assistant. Please find a recipe based on the following prompt: ${prompt}. 
                    ${usePantry && useGroceryList ? `Use only items listed here: ${[...pantryItems, ...groceryListItems].join(', ')}` : 
                        usePantry ? `Use only items listed here: ${[...pantryItems].join(', ')}` :
                        useGroceryList && `Use only items listed here: ${[...groceryListItems].join(', ')}`
                    }
                    Return the recipe details in JSON, do not do any code formatting or markdown. Include:
                    - recipeDescription: a brief description of the recipe, 
                    - estimatedCookingTime: the total time it takes to prepare and cook the dish, 
                    - ingredients: a list of ingredients needed for the recipe with the units needed, put in this format: { ingredient: "ingredient name", quanity: "quanity" }, 
                    - steps: a numbered list of steps to follow for preparation and cooking.
                    If you run into any errors please return in JSON format including:
                    - error: a breif description of the error. If insufficient supplies, please give the error:
                    You do not have the ingredients needed to make this recipe.
                    ` },
                {
                    role: "user",
                    content: prompt
                },
            ],
        });

        const responseJson = JSON.parse(completion.choices[0].message.content);
        res.status(200).json(responseJson);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
