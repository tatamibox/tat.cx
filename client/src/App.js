import React, {useEffect, useState} from 'react'
import Navbar from './components/Navbar/Navbar';
import Infographic from './components/Infographic/Infographic'
import Pitch from './components/Pitch/Pitch';
import './App.css';
function App() {
  
  return (
    <body>
    <Navbar></Navbar>
    <Infographic></Infographic>
    <Pitch></Pitch>
    </body>
  )

}

export default App