import { React, useState, useEffect } from 'react';
import styles from './UserPage.module.css'
import discord from '../../assets/img/discord.png'
import instagram from '../../assets/img/instagram.png'
import twitter from '../../assets/img/twitter.png'
import { useParams } from "react-router-dom";
import placeholder from '../../assets/img/placeholder.png'
const axios = require('axios');
const UserPage = () => {

    const { username } = useParams();

    // adds a page view on the backend
    useEffect(() => {
        axios.put('/addPageView', { username: username })
            .then((res) => {
                console.log(res)
            })
    }, [])


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

    // test... functions are used to decided whether or not to display
    // a new list item on the userpage based on whether or not the user
    // has one of these social media on their profile
    const testDiscord = () => {
        if (currentDiscord) {
            return (

                <li className={`shadow ${styles.discord} py-1 px-3`}><img src={discord} className={styles.icon} alt="discord"></img>{currentDiscord}</li>
            )
        } else return;
    }

    const testTwitter = () => {
        if (currentTwitter) {
            return (

                <a className="link" href={`https://twitter.com/${currentTwitter}`}><li className={`shadow ${styles.discord} py-1 px-3`}><img src={twitter} className={styles.icon} alt="twitter"></img>@{currentTwitter}</li></a>
            )
        } else return;
    }

    const testInstagram = () => {
        if (currentInstagram) {
            return (

                <a className="link" href={`https://instagram.com/${currentInstagram}`}><li className={`shadow ${styles.discord} py-1 px-3`}><img src={instagram} className={styles.icon} alt="instagram"></img>@{currentInstagram}</li></a>
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

    // changes background of user profile based on their submitted value
    const changeBackground = () => {
        if (!backgroundColor) {
            document.body.style = 'background: #eff7f6;'
        } else document.body.style = `background: ${backgroundColor} ;`

    }
    return (

        <div className="container d-flex flex-column align-items-center mt-5">
            {changeBackground()}
            <img className={styles.userPic} src={currentImage} alt="user profile pic"></img>
            <div class={`mt-3 ${styles.userFullName}`}>{fullName}</div>
            <div class={styles.userName}>@{username}</div>


            <div className={styles.socials__bar}>
                {testDiscord()}
                {testTwitter()}
                {testInstagram()}
                {testFacebook()}
            </div>
        </div>

    )
}

export default UserPage;