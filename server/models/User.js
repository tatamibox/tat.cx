const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: String,
    backgroundColor: String,

    discord: String,
    twitter: String,
    facebook: String,
    instagram: String,
    github: String

})

const User = mongoose.model('User', userSchema)

module.exports = User;