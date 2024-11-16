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

// Define grocery list schema
const GroceryListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    items: [ItemSchema] 
});

module.exports = mongoose.model('GroceryList', GroceryListSchema);
