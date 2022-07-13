import Navbar from '../../components/Navbar/Navbar';
import './TopUsers.css';
import { React, useState, useEffect } from 'react';
import TopUser from './TopUser';
import placeholder from '../../assets/img/placeholder.png'
import OtherTopUsers from './OtherTopUsers';
import axios from 'axios'

const TopUsers = () => {
    const [topUser, setTopUser] = useState([])


    useEffect(() => {
        axios.get('/getTopUsers')
            .then((res) => {
                const response = res;
                const topUser = response.data.slice(0, 1)
                setTopUser(topUser[0])


            })
    }, [])


    return (


        < div className="home">
            <Navbar />
            <TopUser image={topUser.image} username={topUser.username} pageVisits={topUser.pageVisits} fullName={topUser.fullName} />
            <OtherTopUsers position='2' />
            <OtherTopUsers position='3' />
            <OtherTopUsers position='4' />
            <OtherTopUsers position='5' />


        </div >
    )

}

export default TopUsers;