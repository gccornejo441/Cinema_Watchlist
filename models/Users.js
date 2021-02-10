const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'User email required']
    },
    password: {
        type: String,
        required: true
    }
}, { 
    timestamps: true,
    }
);

const Users = mongoose.model('Users', userSchema);

module.exports = Users;