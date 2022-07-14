//all dependencies
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
    origin: ["URL ALLOWED", "https://tatpreview.herokuapp.com/"],
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.set('view engine', 'ejs');
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

// process.env.port used for heroku integration
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on 3001`);
});


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Mongo connection open')

    })
    .catch(err => {
        console.log("oh no, Mongo error", err)
    })

// backend for signup form --> takes inputted fullname, usernanme, password
// and checks if user exists --> if not, will create a new user, if so then sends an error
// also uses BCrypt to hash passwords stored in DB

app.post('/signup', async (req, res) => {
    const { fullName, username, password } = req.body;
    const checkForExistingUser = await User.findOne({ username: username });
    console.log(checkForExistingUser)
    if (checkForExistingUser !== null) {
        res.status(500).send('Sorry, this user already exists')
    } else {
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName: fullName, username: username, password: hash });
        newUser.save();
    }
})

//login backend, checks user from inputted username, if user exists
//then uses BCrypt compare method to unhash password and compare raw password
//to inputted password
// if verified, jwt token signed to the user which expires in 30d
app.post('/login', catchAsync(async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await User.findOne({ username: username });
    await bcrypt.compare(password, currentUser.password, function (err, isValid) {
        if (isValid) {
            const token = jwt.sign({ currentUser }, process.env.MY_SECRET, { expiresIn: '30d' });
            res.json({ data: token });
        } else if (err) {
            res.json({ message: 'INVALID PASSWORD' })
        }
    });


}))

// runs on every user page refresh, searches the user up on
// the database and increments pageVisits property by 1
app.put('/addPageView', catchAsync(async (req, res) => {
    const { username } = req.body;
    await User.findOneAndUpdate({ username: username }, { $inc: { pageVisits: 1 } })
    const user = await User.findOne({ username: username })
    console.log(user.pageVisits)
}))

// sorts users based on the pageVisits variable from highest page visits to lowest page visits
// this is used on the /top URL in order to constantly display the top 5 users at that time
app.get('/getTopUsers', catchAsync(async (req, res) => {
    const topUsers = await User.find().sort({ pageVisits: -1 }).collation({ locale: "en_US", numericOrdering: true });
    res.json(topUsers)
}
))

// main sources of getting a users info, for displaying on user pages or navbars
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
//


// used to check the current users token and sees whether or not a certain
// user has the rights to perform an action, such as editing their profile.
app.post('/checkUserToken', catchAsync(async (req, res) => {
    const { data } = req.body;
    const decoded = await jwt.verify(data, process.env.MY_SECRET)
    res.json(decoded);
}))

// jwt token is checked to see whether or not a user has rights to edit the profile
// if so, any inputted data will be changed on MongoDB and what is displayed on the site.
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

// used for HerokuApp integration, by serving anything that is typed in the url to the build index.html file. 
// works with our React routes as well
if (process.env.NODE_ENV === "production") {
    // Set the static assets folder (ie, client build)
    app.use(express.static('client/build'));
    app.get('*', function (req, res) {
        const fullPath = path.join(__dirname, '../client', 'build', 'index.html')
        res.sendFile(fullPath)
    })
}
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});



