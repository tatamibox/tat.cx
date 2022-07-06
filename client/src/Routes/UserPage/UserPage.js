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

    axios.post(url, {
        username: username
    })
    .then(res => {
        setFullName(res.data.fullName);
    })
    .catch(err => {
        setFullName('User does not currently exist')
    })



    return (<div className="container d-flex flex-column align-items-center mt-5">
        <img className="img-fluid userPic" src={placeholder}></img>
        <div class="userFullName">{fullName}</div>
        <div class="userName">@{username}</div>
        </div>
       
    )
}

export default UserPage;