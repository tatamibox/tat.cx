const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }

})

const User = mongoose.model('User', userSchema)

module.exports = User;