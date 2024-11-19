const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create schema object for Menu Items
const menuSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    category: {
        name: {
            type: String,
            default: ""
        },
        image:
        {
            type: String,
            default: ""
        }
    },
    price: {
        type: Number,
        required: true
    },
    ingredients: [
        {
            ingredientName: {
                type: String,
                required: true
            },
            ingredientImage: {
                type: String,
                default: ""
            }
        }
    ],
    instructions: [
        {
            description: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create model
const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
