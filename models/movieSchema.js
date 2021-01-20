const mongoose = require('mongoose');
const assert = require('assert');

const movieSchema = new mongoose.Schema({
    genre: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    director: {
        type: String,
        required: true
    },
    'release date': {
        type: Number,
        required: true
    },
    producer: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    }
}, 
{ versionKey: false }
);

const Movies = mongoose.model('Movies', movieSchema);


module.exports = Movies;