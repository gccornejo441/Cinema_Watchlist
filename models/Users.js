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
    }
}, { 
    timestamps: new Date(),
    versionKey: false,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `toObject()` output includes virtuals
    }
);

userSchema.virtual('submittedMovies', {
    ref: 'Movies', // The model to use
    localField: 'title', // Find people where `localField`
    foreignField: 'director', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false,
  });


const Users = mongoose.model('Users', userSchema);

module.exports = Users;