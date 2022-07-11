const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const dotenv = require("dotenv")
require('dotenv').config();
const User = require('./models/User');
const cors = require('cors');
const uri = process.env.MONGODB_URI
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const catchAsync = require('./utils/catchAsync')
const corsOptions = {
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.set('view engine', 'ejs');
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());


if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI)
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
    const { fullName, username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName: fullName, username: username, password: hash });
    newUser.save();
})

//login
app.post('/login', catchAsync(async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await User.findOne({ username: username });
    console.log(currentUser)
    await bcrypt.compare(password, currentUser.password, function (err, isValid) {
        if (isValid) {
            const token = jwt.sign({ currentUser }, process.env.MY_SECRET, { expiresIn: '30d' });
            res.json({ data: token });
        } else if (err) {
            res.json({ message: 'INVALID PASSWORD' })
        }
    });


}))

app.post('/userinfo', catchAsync(async (req, res) => {
    const { token } = req.body;
    const decoded = await jwt.verify(token, process.env.MY_SECRET)
    const tempUser = decoded.currentUser._id;
    const user = await User.findById(tempUser);
    console.log(user)
    res.json({ user });
}))
app.post('/getUserInfo', catchAsync(async (req, res) => {
    const { username } = req.body;
    const currentUser = await User.findOne({ username: username });
    res.json({ discord: currentUser.discord, username: currentUser.username, fullName: currentUser.fullName, image: currentUser.image, backgroundColor: currentUser.backgroundColor, twitter: currentUser.twitter, facebook: currentUser.facebook, instagram: currentUser.instagram });
}))

app.post('/checkUserToken', catchAsync(async (req, res) => {
    const { data } = req.body;
    const decoded = await jwt.verify(data, process.env.MY_SECRET)
    res.json(decoded);
}))

app.put('/editUserProfile', catchAsync(async (req, res) => {
    const { username, fullName, image, bgColor, token, discord, facebook, instagram, twitter } = req.body;
    const decoded = await jwt.verify(token, process.env.MY_SECRET)
    if (decoded.currentUser.username.toString() === username.toString()) {
        const user = await User.findOne({ username: username })
        const id = user._id;
        await User.findByIdAndUpdate(id, { fullName: fullName, image: image, discord: discord, backgroundColor: bgColor, twitter: twitter, instagram: instagram, facebook: facebook })
        res.json({ message: 'update success' })
    } else res.status(403).send('Invalid user. You do not have permission to edit this profile.')

}))


app.listen(PORT, () => {
    console.log(`Server listening on 3001`);
});

