import React, {useEffect, useState} from 'react'
import Navbar from './components/Navbar/Navbar';
import Infographic from './components/Infographic/Infographic'
import Pitch from './components/Pitch/Pitch';
import Home from './Routes/Home';
import SignUp from './Routes/SignUp/SignUp';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



import './App.css';
function App() {
  
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/signup" element={<SignUp />} />
    </Routes>
    </Router>
      
  )

}

export default App