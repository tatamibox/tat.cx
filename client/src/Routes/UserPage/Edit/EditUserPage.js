import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../../components/Navbar/Navbar";
import './EditUserPage.css'
import { useParams } from "react-router-dom";
import placeholder from '../../../assets/img/placeholder.png'
const axios = require('axios');


const EditUserPage = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const { username } = useParams();
    const [isCurrentUser, setIsCurrentUser] = useState(false);

    const token = window.localStorage.getItem('token');
    const url = 'http://localhost:3001/checkUserToken';
    axios.post(url, {
                data: token
            })
            .then(res => {
                const tokenUser = res.data.currentUser.username;
                if (tokenUser.toString() === username.toString()) {
                    console.log('This user is verified.')
                    GetEditForm();
                } else {
                    console.log('You are not allowed to edit this page.');
                    setFullName('You do not have permission to edit this page.')
                    navigate('/')
                    
                }
                
            })
    
const GetEditForm = () => {
    const url = 'http://localhost:3001/getUserInfo';
    


    axios.post(url, {
        username: username
    })
    .then(res => {
        setFullName(res.data.fullName);
    })
    .catch(err => {
        setFullName('User does not currently exist')
    })

}

const getForbidden = () => {
    return (
        <div>You are not allowed to edit this page.</div>
    )
}

    return (
    <div className="container d-flex flex-column align-items-center mt-5">
        Edit<img className="img-fluid userPic" src={placeholder}></img>
        <div class="userFullName">{fullName}</div>
        <div class="userName">@{username}</div>
        </div>
       
    )
}

export default EditUserPage;