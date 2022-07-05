const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
require('dotenv').config();
const User = require('./models/User');
const cors = require('cors');

const corsOptions ={
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.set('view engine', 'ejs');
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Mongo connection open')

    })
    .catch(err => {
        console.log("oh no, Mongo error", err)
    })
app.get('/signup', (req, res) => {
    res.render('post')
})
app.post('/signup', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect('/signup')

    
  })

app.listen(3001, () => {
    console.log(`Server listening on 3001`);
  });

 