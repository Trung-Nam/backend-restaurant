const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema model
const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        trim: true,
        minlength: 3,
        unique: true
    },
    photoURL: {
        type: String,
        default:"https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    address: {
        street: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        zipCode: {
            type: String,
            default: ""
        },
        country: {
            type: String,
            default: ""
        }
    }
});

// create a model instance
const User = mongoose.model('User', userSchema);

module.exports = User;
