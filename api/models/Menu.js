const mongoose = require('mongoose');
const {Schema} = mongoose;

// Create schema object for menu items
const menuSchema = new Schema({
    name: {
        type: String,
        trim:true,
        required: true,
        minLength: 3,
    },
    recipe:String,
    image:String,
    category:String,
    price:Number
})

// Create model
const Menu = mongoose.model('Menu',menuSchema);
module.exports = Menu;