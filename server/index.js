const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config();
const User = require('./models/User');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongo connection open')

    })
    .catch(err => {
        console.log("oh no, Mongo error", err)
    })

app.get('/', (req, res) => {
    res.json({message: 'Hello from the server.'})
  })

app.listen(3001, () => {
    console.log(`Server listening on 3001`);
  });

 