import {React, useState} from 'react';
import Navbar from "../../components/Navbar/Navbar";
import './UserPage.css'
import { useParams } from "react-router-dom";
import placeholder from '../../assets/img/placeholder.png'
const axios = require('axios');
const UserPage = () => {

    const { username } = useParams();

    const url = 'http://localhost:3001/getUserInfo';
    
const [fullName, setFullName] = useState('');
const [currentImage, setCurrentImage] = useState('');

    axios.post(url, {
        username: username
    })
    .then(res => {
        console.log(res)
        setFullName(res.data.fullName);
        if (!res.data.image) {
            setCurrentImage(placeholder)
        } else {
        setCurrentImage(res.data.image);
        }
    })
    .catch(err => {
        setFullName('User does not currently exist')
    })



    return (<div className="container d-flex flex-column align-items-center mt-5">
        <img className="userPic" src={currentImage}></img>
        <div class="userFullName">{fullName}</div>
        <div class="userName">@{username}</div>
        </div>
       
    )
}

export default UserPage;