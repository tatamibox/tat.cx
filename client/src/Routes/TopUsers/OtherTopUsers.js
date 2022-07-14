import { React, useState, useEffect } from 'react'
import styles from './OtherTopUsers.module.css'
import placeholder from '../../assets/img/placeholder.png'
import axios from 'axios'
const OtherTopUsers = (props) => {

    const [user, setUser] = useState()
    const [image, setImage] = useState(placeholder)
    const [username, setUsername] = useState('username')
    const [pageVisits, setPageVisits] = useState(0)
    const [fullName, setFullName] = useState()

    //changes states of current user after receiving the top 4 users (which are passed in by props.position from TopUsers.js)
    useEffect(() => {
        const arrayPosition = parseInt(props.position) - 1
        axios.get('/getTopUsers')
            .then((res) => {
                setImage(res.data[arrayPosition].image)
                setUsername(res.data[arrayPosition].username)
                setPageVisits(res.data[arrayPosition].pageVisits)
                setFullName(res.data[arrayPosition].fullName)
            })
    }, [])


    return (
        <div class={`card mx-auto ${styles.otherUser}`}>
            <img src={image} className="otherUser cardImage" alt={username} />
            <div class={styles[`card-body`]}>
                <h5 class="otherUser card-title">#{props.position}. <span className={styles.fullName}>{fullName}</span></h5>
                <p class="card-text">@{username}</p>
                <p class="card-text">total visits: {pageVisits}</p>
                <a href={`/${username}`} class="btn btn-warning">Visit {username}</a>
            </div>
        </div>
    )
}

export default OtherTopUsers