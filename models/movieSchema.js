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
        required: true,
        validate: {
            validator: (val) => {
                return val.toString().length == 4;
            },
            message: 'Value must be a four digit integer'
        }
    },
    producer: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        validate: {
            validator: (val) => {
                return 1 <= val && val <= 5;
            },
            message: 'Must be less than 5 or more than 1!'
          }
    }
}, 
{ versionKey: false }
);

const Movies = mongoose.model('Movies', movieSchema);


module.exports = Movies;