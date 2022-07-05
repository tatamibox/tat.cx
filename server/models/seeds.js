const mongoose = require('mongoose');
const Test = require('./Test');
require('dotenv').config();


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo connection open')

    })
    .catch(err => {
        console.log("oh no, Mongo error", err)
    })

const m = new Test({
    name: 'Halls',
    age: 12
})
m.save();