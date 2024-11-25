const express = require('express');
const router = express.Router();
const config = require('../config');
const authenticateToken = require("../middleware/authenticateToken");
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: config.openAIKey});

router.get("/", authenticateToken, async (req, res) => {
    try {
        const { prompt, usePantry, useDiet, useAllergies, budget } = req.query;

        // These are placeholders, please replace with an access to the database to get pantry items and grocery items
        // depending on if usePantry or useGroceryList is true.
        let pantryItems = ["chicken"]

        if (!prompt) {
            return res.status(400).json({ error: 'A valid prompt is required.' });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: `
                    You are a recipe lookup assistant. Please find a recipe based on the following prompt: ${prompt}. 
                    ${usePantry === "true" ? `Use only items listed here: ${[...pantryItems].join(', ')}.` : ''}
                    Return the recipe details in JSON, do not do any code formatting or markdown. Include:
                    - name: the name of the recipe,
                    - description: a brief description of the recipe and steps to make it, 
                    - ingredients: a list of ingredients needed for the recipe with the units needed (all fields required), put in this format: { name: "ingredient name", quantity: "quantity (as a float)", unit: "unit (cannot be empty string)" }, 
                    - estimatedTime: the total time it takes to prepare and cook the dish in minutes.
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
