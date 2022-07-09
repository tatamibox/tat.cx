import { React, useState } from 'react'
import './InfographicLeft.css';
const axios = require('axios');
const url = 'http://localhost:3000/checkUserToken'
const InfographicLeft = () => {

    // check whether or not user is logged in to change the status of the button on return

    const token = window.localStorage.getItem('token')
    let isLoggedIn = false;
    if (token !== '') {
        isLoggedIn = true;
    }

    // useState for current user's username

    const [username, setUsername] = useState('')
    // axios post to get current user's username in order to input onto the edit button's href

    axios.post(url,
        { data: token }
    )
        .then((res) => {
            setUsername(res.data.currentUser.username)
        })



    return (
        <div class="infographic__textarea">
            <div class="infographic__heading">Create your own shortened URL with ease.</div>
            <div class="infographic__subheading">Completely accessible, completely free</div>
            {isLoggedIn ? <a class="infographic__button__edit py-3 px-3" href={`/${username}/edit`}>Edit link</a> : <a class="infographic__button py-3 px-3" href="/signup">Create a link</a>}
        </div>
    )
}

export default InfographicLeft;