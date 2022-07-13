import { React, useState } from 'react'
import styles from './InfographicLeft.module.css'
const axios = require('axios');
const url = '/checkUserToken';

const InfographicLeft = () => {

    // check whether or not user is logged in to change the status of the button on return

    const token = window.localStorage.getItem('token')
    let isLoggedIn = false;
    if (token !== null) {
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
        <div className={styles.infographic__textarea}>
            <div class={styles.infographic__heading}>Create your own shortened URL with ease.</div>
            <div class={styles.infographic__subheading}>Completely accessible, completely free</div>
            {isLoggedIn ? <a className={`${styles.infographic__button} py-3 px-3`} href={`/${username}/edit`}>Edit link</a> : <a className={`${styles.infographic__button} py-3 px-3`} href="/signup">Create a link</a>}
        </div>
    )
}

export default InfographicLeft;