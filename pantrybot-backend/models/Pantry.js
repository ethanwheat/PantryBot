// pantrybot-backend/models/Pantry.js
const mongoose = require('mongoose');

// Define item schema
const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    unit: {
        type: String,
        required: true,
        enum: ['kg', 'lb', 'oz', 'g', 'l', 'ml']
    }
}, { _id: true }); 

// Define pantry schema
const PantrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [ItemSchema] 
});

module.exports = mongoose.model('Pantry', PantrySchema);