import React, {useEffect, useState} from 'react'
import Navbar from './components/Navbar/Navbar';
import Infographic from './components/Infographic/Infographic'
import Pitch from './components/Pitch/Pitch';
import Home from './Routes/Home';
import CreateLink from './Routes/CreateLink/CreateLink';
import SignUp from './Routes/SignUp/SignUp';
import LogIn from './Routes/SignUp/LogIn/LogIn';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



import './App.css';
function App() {
  
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/create" element={<CreateLink />} />
    <Route exact path="/signup" element={<SignUp />} />
    <Route exact path="/login" element={<LogIn />} />
    </Routes>
    </Router>
      
  )

}

export default App