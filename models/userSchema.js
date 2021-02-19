const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    genre: {
        type: String,
        required: [true, 'Genre field cannot be empty']
    },
    title: {
        type: String,
        required: [true, 'Title field cannot be empty'],
        trim: true
    },
    director: {
        type: String,
        required: [true, 'Director field cannot be empty'],
    },
    'release date': {
        type: Number,
        required: [true, 'Release date field cannot be empty'],
        validate: {
            validator: (val) => {
                return val.toString().length == 4;
            },
            message: 'Value must be a four digit integer'
        }
    },
    producer: {
        type: String,
        required: [true, 'Producer field cannot be empty']
    },
    rating: {
        type: Number,
        required: [true, 'Rating field cannot be empty'],
        validate: {
            validator: (val) => {
                return 1 <= val && val <= 5;
            },
            message: 'Must be less than 5 or more than 1!'
          }
    }
}, { 
    versionKey: false, 
    timestamps: new Date() 
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true, 
    },
    username: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'User email required']
    },
    password: {
        type: String,
        required: true
    },
    submittedMovies: [movieSchema]
}, { 
    timestamps: new Date(),
    versionKey: false
    }
);

const Users = mongoose.model('Users', userSchema);

module.exports = Users;