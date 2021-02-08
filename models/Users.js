const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        index: { unique: true }
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'User email required']
    },
    password: {
        type: String,
        trim: true,
        required: true,
    }
}, { 
    timestamps: true,
    }
);

userSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
}

const Users = mongoose.model('Users', userSchema);

module.exports = Users;