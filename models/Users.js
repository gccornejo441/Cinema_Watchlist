const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;