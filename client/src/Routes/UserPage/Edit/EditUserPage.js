import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import placeholder from '../../../assets/img/placeholder.png'
import { useParams } from 'react-router-dom'
import './EditUserPage.css'
const axios = require('axios')
const infoURL = '/userinfo'



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



    //checks if values exist on the backend, if they do it will
    //change the states above with their existing values
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


    //handlers and states for all new edited values on the edit form

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


        // updating all the past info with the new info from the edit form
        axios.put('/editUserProfile', {


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
                    <label for='img'>Profile Image URL</label>
                    <input placeholder="Direct image link (https://...)" defaultValue={image} onChange={imageHandler} id="image"></input>
                    <input defaultValue={bgColor} placeholder="BG Color #HEX (with #)" onChange={bgColorHandler}></input>
                </div>
                <div className='mt-4'>
                    <input type="text" defaultValue={discord} onChange={discordHandler} class="form-control mb-4 mr-sm-2" id="discord" placeholder="DiscordUsername#0001" name="discord" />
                    <div class="input-group mb-4 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">@</div>
                        </div>
                        <input type="text" class="form-control" id="twitter" placeholder="twitter" name="twitter" defaultValue={twitter} onChange={twitterHandler} />
                    </div>
                    <div class="input-group mb-4 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">@</div>
                        </div>
                        <input type="text" class="form-control" id="instagram" placeholder="Instagram" name="instagram" defaultValue={instagram} onChange={instagramHandler} />
                    </div>

                </div>
                <button onClick={submitHandler}>Submit</button>
            </form>
        </div >
    )
}

export default EditUserPage;