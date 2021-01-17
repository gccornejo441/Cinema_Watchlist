const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    isbn: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true
    },
    'published date': {
        type: Number,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    'number of pages': {
        type: Number,
        required: true
    }
}, 
{ versionKey: false }
);

const Books = mongoose.model('Books', bookSchema);

module.exports = Books;