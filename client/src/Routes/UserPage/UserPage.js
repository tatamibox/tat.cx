import { React, useState } from 'react';
import './UserPage.css'
import discord from '../../assets/img/discord.png'
import { useParams } from "react-router-dom";
import placeholder from '../../assets/img/placeholder.png'
const axios = require('axios');
const UserPage = () => {

    const { username } = useParams();

    const url = 'http://localhost:3001/getUserInfo';

    const [fullName, setFullName] = useState('');
    const [currentImage, setCurrentImage] = useState('');
    const [currentDiscord, setCurrentDiscord] = useState('');

    axios.post(url, {
        username: username
    })
        .then(res => {
            console.log(res)
            setFullName(res.data.fullName);
            setCurrentDiscord(res.data.discord);
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

                <li className="shadow py-1 px-3"><img src={discord} className="icon" alt="discord"></img>{currentDiscord}</li>

            )
        } else return;
    }

    const changeBackground = () => {
    }
    return (

        <div className="container d-flex flex-column align-items-center mt-5">
            {changeBackground()};
            <img className="userPic" src={currentImage} alt="user profile pic"></img>
            <div class="userFullName mt-3">{fullName}</div>
            <div class="userName">@{username}</div>


            <div className="socials__bar">
                {testDiscord()}
            </div>
        </div>

    )
}

export default UserPage;