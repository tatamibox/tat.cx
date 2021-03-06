
import styles from './Navbar.module.css'
import { React, useState } from 'react';
import profpic from '../../assets/img/placeholder.png'
import { Navigate } from 'react-router-dom';
const axios = require('axios');


const LINav = () => {

    // callback which will be used to log the user out by removing their token

    const logOut = () => {
        window.localStorage.removeItem('token');
        Navigate('/')
    }


    const [currentImage, setCurrentImage] = useState('')
    const [currentUsername, setCurrentUsername] = useState('');


    // posting to /userinfo in order to receive user info necessary for navbar details

    const url = '/userinfo';
    const token = window.localStorage.getItem('token');
    axios.post(url, { token: token })
        .then((res) => {
            setCurrentUsername(res.data.user.username)
            if (!res.data.user.image) {
                setCurrentImage(profpic)
            } else {
                setCurrentImage(res.data.user.image);
            }

        })





    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light sticky-top">
                <div class="nav__container container-fluid my-2">
                    <a class={`${styles.brandName} navbar-brand`} href="/">tat.cx</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class={`collapse navbar-collapse ${styles.navbar__main}`} id="navbarContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                        </ul>
                        <ul class={`navbar-nav ${styles.navbar__ul}`}>
                            <li class={styles[`nav-item`]}>
                                <a class="nav-link" href="/top">Top Users</a>
                            </li>
                            <li class={styles[`nav-item`]}>
                                <a class="nav-link" href="/">About</a>
                            </li>
                            <li class={`${styles[`nav-item`]} d-flex flex-row align-items-center`}>
                                <a class="nav-link" href={currentUsername}><img src={currentImage} className={styles.userProfPic}></img></a>
                            </li>
                            <li class={styles[`nav-item`]}>
                                <a class="nav-link" href="/" onClick={logOut}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default LINav;