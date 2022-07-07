import { React, useState } from 'react';
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
    const [currentDiscord, setCurrentDiscord] = useState('');
    const { username } = useParams();
    const [currentBgColor, setCurrentBgColor] = useState('')

    const [newBackgroundColor, setNewBackgroundColor] = useState('')
    const backgroundColorHandler = (e) => {
        setNewBackgroundColor(e.target.value)
    }

    const [newDiscord, setNewDiscord] = useState('')
    const discordHandler = (e) => {
        setNewDiscord(e.target.value)
    }
    const [newImage, setNewImage] = useState('')
    const imageHandler = (e) => {
        setNewImage(e.target.value);
    }

    const [newFullName, setNewFullName] = useState('')
    const fullNameHandler = (e) => {
        setNewFullName(e.target.value);
    }


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

    const changeBackground = () => {
        if (!currentBgColor) {
            document.body.style = 'background: #eff7f6;'
        } else document.body.style = `background: ${currentBgColor} ;`

    }
    const GetEditForm = () => {
        const url = 'http://localhost:3001/getUserInfo';



        axios.post(url, {
            username: username
        })
            .then(res => {
                console.log(res)
                if (!res.data.backgroundColor) { setCurrentBgColor('') }
                else { setCurrentBgColor(res.data.backgroundColor) }
                if (!res.data.discord) { setCurrentDiscord('') }
                else { setCurrentDiscord(res.data.discord) }
                setFullName(res.data.fullName);

                if (!res.data.image) { setCurrentImage(placeholder) }
                else {
                    setCurrentImage(res.data.image);
                }
            })
            .catch(err => {
                setFullName('User does not currently exist')
            })
    }

    const submitHandler = (e) => {
        e.preventDefault();

        axios.put('http://localhost:3001/editUserProfile', {
            token: token,
            username: username,
            image: newImage,
            fullName: newFullName,
            discord: newDiscord,
            backgroundColor: newBackgroundColor

        })
        navigate(`/${username}`)
            .then(response => {
                console.log(response);

            });
        // axios.post(url, user)

    }

    return (
        <div>
            {changeBackground()}
            <form onSubmit={submitHandler}>
                <div className="p-3">
                    <label for='bgcolor'>Background color (solid / HEX value with #)</label>
                    <input placeholder="# / color" className="my-3" name="image" id="bgColor" onChange={backgroundColorHandler}></input>
                </div>
                <div className="container d-flex flex-column align-items-center mt-5">
                    <img className="userPic" src={currentImage} alt="user profpic"></img>
                    <div className="d-flex flex-row">
                        <input placeholder="New Image Link" className="my-3" name="image" onChange={imageHandler}></input>
                    </div>
                    <input placeholder="Discord username" className="my-3" name="discord" onChange={discordHandler}></input>
                    <input placeholder={fullName} name="fullName" className="my-3" onChange={fullNameHandler}></input>
                    <div class="userName mt-3">@{username}</div>
                    <button type="submit" className="text-center mt-3 submitButton py-2 px-4">Submit</button>
                </div>

            </form >
        </div>
    )
}

export default EditUserPage;