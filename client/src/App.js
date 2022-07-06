import React, {useEffect, useState, Component} from 'react'
import Navbar from './components/Navbar/Navbar';
import Infographic from './components/Infographic/Infographic'
import Pitch from './components/Pitch/Pitch';
import UserPage from './Routes/UserPage/UserPage';
import Home from './Routes/Home';
import EditUserPage from './Routes/UserPage/Edit/EditUserPage';
import CreateLink from './Routes/CreateLink/CreateLink';
import SignUp from './Routes/SignUp/SignUp';
import LogIn from './Routes/SignUp/LogIn/LogIn';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



import './App.css';
function App() {
  
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route exact path="/create" element={<CreateLink />} />
    <Route exact path="/signup" element={<SignUp />} />
    <Route exact path="/login" element={<LogIn />} />
    <Route path="/:username" element={<UserPage />} />
    <Route path="/:username/edit" element={<EditUserPage />} />
    
    </Routes>
    </Router>
      
  )

}

export default App