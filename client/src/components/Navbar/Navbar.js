
import logo from '../../assets/img/logo.png'
import './Navbar.css'
import { React, useState } from 'react';
import NLINav from './NLINav';
import LINav from './LINav';
const axios = require('axios')


const Navbar = () => {







  let user = window.localStorage.getItem('token');


  if (user !== null) {
    return (
      <div>
        <LINav></LINav>
      </div>
    )
  } else {
    return (
      <div>
        <NLINav></NLINav>
      </div>
    )
  }

}

export default Navbar;