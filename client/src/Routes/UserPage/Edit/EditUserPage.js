import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import placeholder from '../../../assets/img/placeholder.png'
import { useParams } from 'react-router-dom'
import './EditUserPage.css'
const axios = require('axios')
const infoURL = 'http://localhost:3000/userinfo'



const EditUserPage = () => {

    let navigate = useNavigate();
    const { username } = useParams();


    const [fullName, setFullName] = useState('')
    const [image, setImage] = useState('')
    const [bgColor, setBgColor] = useState('')

    const [discord, setDiscord] = useState('')
    const [twitter, setTwitter] = useState('')
    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')



    //set default useState values for later reference
    const token = window.localStorage.getItem('token')
    axios.post(infoURL, {
        token: token
    })
        .then(res => {
            console.log(res)
            setFullName(res.data.user.fullName)
            if (res.data.user.discord !== '') {
                setDiscord(res.data.user.discord)
            }
            if (res.data.user.twitter !== '') {
                setTwitter(res.data.user.twitter)
            }
            if (res.data.user.facebook !== '') {
                setFacebook(res.data.user.facebook)
            }
            if (res.data.user.instagram !== '') {
                setInstagram(res.data.user.instagram)
            }

            if (res.data.user.backgroundColor !== '') {
                setBgColor(res.data.user.backgroundColor)
            }

            if (res.data.user.image) {
                setImage(res.data.user.image)
            } else { setImage(placeholder) }
        })

    //get user token

    //pulling user info and setting useStates to those values


    //new Value states and handlers. This is to create variables
    //that will then be submitted to the server to edit user profile



    let [newFullName, setNewFullName] = useState(fullName)
    const fullNameHandler = (e) => {
        setNewFullName(e.target.value)
    }

    let [newDiscord, setNewDiscord] = useState(discord)
    const discordHandler = (e) => {
        setNewDiscord(e.target.value)
    }

    let [newImage, setNewImage] = useState(image)
    const imageHandler = (e) => {
        setNewImage(e.target.value)
    }

    let [newBgColor, setNewBgColor] = useState(bgColor)
    const bgColorHandler = (e) => {
        setNewBgColor(e.target.value)
    }

    let [newTwitter, setNewTwitter] = useState(twitter)
    const twitterHandler = (e) => {
        setNewTwitter(e.target.value)
    }

    let [newInstagram, setNewInstagram] = useState(instagram)
    const instagramHandler = (e) => {
        setNewInstagram(e.target.value)
    }

    let [newFacebook, setNewFacebook] = useState(facebook)
    const facebookHandler = (e) => {
        setNewFacebook(e.target.value)
    }


    //submit Handler for when the form gets submitted to post to the server

    const submitHandler = (e) => {

        e.preventDefault();

        if (newFullName === '') {
            newFullName = fullName
        }

        if (newDiscord === '') {
            newDiscord = discord;
        }

        if (newTwitter === '') {
            newTwitter = twitter;
        }

        if (newFacebook === '') {
            newFacebook = facebook;
        }

        if (newInstagram === '') {
            newInstagram = instagram;
        }


        if (newImage === '') {
            newImage = image;
        }

        if (newBgColor === '') {
            newBgColor = bgColor;
        }



        axios.put('http://localhost:3000/editUserProfile', {


            username: username,
            fullName: newFullName,
            image: newImage,
            bgColor: newBgColor,
            token: token,

            discord: newDiscord,
            twitter: newTwitter,
            instagram: newInstagram,
            facebook: newFacebook

        })
            .then(res => {
                console.log(res)
                navigate(`/${username}`)
            })

    }


    return (
        <div>
            <form>
                <div>
                    <input defaultValue={fullName} placeholder="Name" onChange={fullNameHandler}></input>
                    <input defaultValue={image} placeholder="Image (URL)" onChange={imageHandler}></input>
                    <input defaultValue={bgColor} placeholder="BG Color (color / #HEX)" onChange={bgColorHandler}></input>
                </div>
                <div className='mt-4'>
                    <input defaultValue={discord} placeholder="Discord#0001" onChange={discordHandler}></input>
                    <input defaultValue={twitter} placeholder="@Twitter" onChange={twitterHandler}></input>
                    <input defaultValue={instagram} placeholder="@Instagram" onChange={instagramHandler}></input>
                    <input defaultValue={facebook} placeholder="Facebook" onChange={facebookHandler}></input>
                </div>
                <button onClick={submitHandler}>Submit</button>
            </form>
        </div >
    )
}

export default EditUserPage;