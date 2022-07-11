import { React, useState } from 'react';
import './UserPage.css'
import discord from '../../assets/img/discord.png'
import { useParams } from "react-router-dom";
import placeholder from '../../assets/img/placeholder.png'
const axios = require('axios');
const UserPage = () => {

    const { username } = useParams();

    const url = '/getUserInfo';

    const [fullName, setFullName] = useState('');
    const [currentImage, setCurrentImage] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');

    const [currentDiscord, setCurrentDiscord] = useState('');
    const [currentTwitter, setCurrentTwitter] = useState('');
    const [currentInstagram, setCurrentInstagram] = useState('');
    const [currentFacebook, setCurrentFacebook] = useState('');

    axios.post(url, {
        username: username
    })
        .then(res => {
            console.log(res)
            setBackgroundColor(res.data.backgroundColor)
            setFullName(res.data.fullName);
            setCurrentDiscord(res.data.discord);
            setCurrentFacebook(res.data.facebook);
            setCurrentInstagram(res.data.instagram);
            setCurrentTwitter(res.data.twitter);
            setCurrentFacebook(res.data.facebook);

            if (!res.data.image) {
                setCurrentImage(placeholder)
            } else {
                setCurrentImage(res.data.image);
            }
        })
        .catch(err => {
            setFullName('User does not currently exist')
        })

    const testDiscord = () => {
        if (currentDiscord) {
            return (

                <li className="discord shadow py-1 px-3"><img src={discord} className="icon" alt="discord"></img>{currentDiscord}</li>
            )
        } else return;
    }

    const testTwitter = () => {
        if (currentTwitter) {
            return (

                <li className="discord shadow py-1 px-3">{currentTwitter}</li >
            )
        } else return;
    }

    const testInstagram = () => {
        if (currentInstagram) {
            return (

                <li className="discord shadow py-1 px-3">{currentInstagram}</li >
            )
        } else return;
    }
    const testFacebook = () => {
        if (currentFacebook) {
            return (

                <li className="discord shadow py-1 px-3">{currentFacebook}</li >
            )
        } else return;
    }


    const changeBackground = () => {
        if (!backgroundColor) {
            document.body.style = 'background: #eff7f6;'
        } else document.body.style = `background: ${backgroundColor} ;`

    }
    return (

        <div className="container d-flex flex-column align-items-center mt-5">
            {changeBackground()}
            <img className="userPic" src={currentImage} alt="user profile pic"></img>
            <div class="userFullName mt-3">{fullName}</div>
            <div class="userName">@{username}</div>


            <div className="socials__bar">
                {testDiscord()}
                {testTwitter()}
                {testInstagram()}
                {testFacebook()}
            </div>
        </div>

    )
}

export default UserPage;