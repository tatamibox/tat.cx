import Navbar from '../../components/Navbar/Navbar';
import './TopUsers.css';
import { React, useState, useEffect } from 'react';
import TopUser from './TopUser';
const axios = require('axios');

const TopUsers = () => {
    const [topUser, setTopUser] = useState([])


    useEffect(() => {
        axios.get('/getTopUsers')
            .then((res) => {
                const topUser = res.data.slice(0, 1)
                setTopUser(topUser[0])
            })
    }, [])

    useEffect(() => {
        axios.get('/getTopUsers')
            .then((res) => {
                const otherTopUsers = res.data.slice(1, 5)


            })
    }, [])




    return (


        < body className="home">
            <Navbar />
            <TopUser image={topUser.image} username={topUser.username} pageVisits={topUser.pageVisits} />

        </body >
    )

}

export default TopUsers;