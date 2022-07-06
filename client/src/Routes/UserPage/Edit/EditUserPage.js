import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../../components/Navbar/Navbar";
import './EditUserPage.css'
import editpencil from '../../../assets/img/editpencil.png'
import { useParams } from "react-router-dom";
import placeholder from '../../../assets/img/placeholder.png'
const axios = require('axios');


const EditUserPage = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [currentImage, setCurrentImage] = useState('');
    const { username } = useParams();

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
        if(!res.data.image) {setCurrentImage(placeholder)}
        else {
        setCurrentImage(res.data.image);
        }
    })
    .catch(err => {
        setFullName('User does not currently exist')
    })

}

const [newImage, setNewImage] = useState('')
const imageHandler = (e) => {
    setNewImage(e.target.value);
}

const [newFullName, setNewFullName] = useState('')
const fullNameHandler = (e) => {
    setNewFullName(e.target.value);
}

const submitHandler = (e) => {
    e.preventDefault();
    
    axios.put('http://localhost:3001/editUserProfile', {
        token: token,
        username: username,
        image: newImage,
        fullName: newFullName
        
    })
    navigate(`/${username}`)
      .then(response => {
        console.log(response);
      
      });
    // axios.post(url, user)

  }

    return (
        <form onSubmit={submitHandler}>
    <div className="container d-flex flex-column align-items-center mt-5">
        <img className="userPic" src={currentImage}></img>
        <div className="d-flex flex-row">
        <input placeholder="New Image Link" className="my-3" name="image" onChange={imageHandler}></input>
        </div>
        <input placeholder="New Full Name" name="fullName" onChange={fullNameHandler}></input>
        <div class="userName mt-3">@{username}</div>
        <button type="submit" className="text-center mt-3">Submit</button>
        </div>
     
        </form>
       
    )
}

export default EditUserPage;