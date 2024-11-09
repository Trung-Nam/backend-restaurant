const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    menus: [
        {
            menuId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            addedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = mongoose.model('Favorite', favoriteSchema);
