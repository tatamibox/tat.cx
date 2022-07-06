
import './Navbar.css'
import {React, useState} from 'react';
import profpic from '../../assets/img/placeholder.png'
import { Navigate } from 'react-router-dom';
const axios = require('axios');


const LINav = () => {

    const logOut = () => {
        window.localStorage.setItem('token', '');
        Navigate('/')
    }

    const [currentUsername, setCurrentUsername] = useState('');



    const url = 'http://localhost:3001/userinfo';
    const token = window.localStorage.getItem('token');
    axios.post(url, {token: token})
    .then((res) => {
     setCurrentUsername(res.data.decoded.currentUser.username)
      
    })

    console.log(currentUsername)


  

    return (
        <div>
        <nav class="navbar navbar-expand-lg navbar-light sticky-top">
    <div class="nav__container container-fluid my-2">
        <a class="navbar-brand brandName" href="/">tat.cx</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar__main collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                
            </ul>
            <ul class="navbar-nav navbar__ul">
            <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item d-flex flex-row align-items-center">
                    <a class="nav-link" href="/signup"><img src={profpic} className="userProfPic"></img></a><div>{currentUsername}</div>
                </li>
                <li class="nav-item">
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