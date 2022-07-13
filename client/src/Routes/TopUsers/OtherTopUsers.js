import { React, useState, useEffect } from 'react'
import './OtherTopUsers.css'
import placeholder from '../../assets/img/placeholder.png'
import axios from 'axios'
const OtherTopUsers = (props) => {

    const [user, setUser] = useState()
    const [image, setImage] = useState(placeholder)
    const [username, setUsername] = useState('username')
    const [pageVisits, setPageVisits] = useState(0)
    useEffect(() => {
        const arrayPosition = parseInt(props.position) - 1
        axios.get('/getTopUsers')
            .then((res) => {
                setImage(res.data[arrayPosition].image)
                setUsername(res.data[arrayPosition].username)
                setPageVisits(res.data[arrayPosition].pageVisits)
            })
    }, [])


    return (
        <div class="card otherUser mx-auto">
            <img src={image} className="otherUser cardImage" alt={username} />
            <div class="card-body">
                <h5 class="otherUser card-title">#{props.position}. @{username}</h5>
                <p class="card-text">total visits: {pageVisits}</p>
                <a href="/" class="btn btn-warning">Visit {username}</a>
            </div>
        </div>
    )
}

export default OtherTopUsers