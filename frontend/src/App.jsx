// import { useState } from 'react';
import {BrowserRouter as Router } from "react-router-dom"
import './App.css'
import { useState } from "react"
import Navbar from './features/navbar/Navbar.jsx'
import AppRoutes from './features/appRoutes/AppRoutes.jsx'
import Footer from "./features/footer/Footer.jsx"

function App() {
  const [currUser, setCurrUser]=useState(null);
  const [isTitleAtTop, setIsTitleAtTop] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [scroll, setScroll] = useState(0)
  const [isHomeTwoAtTop, setIsHomeTwoAtTop] = useState(false)
  const [activeForm, setActiveForm] = useState(false);

  const handleTitleAtTopChange = (value) => {
    setIsTitleAtTop(value);
  };
  const handleScrollPosition = (value) => {
    setScroll(value);
  };
  const handleHomeTwoAtTopChange = (value) => {
    setIsHomeTwoAtTop(value);
  };

  const handleSetActiveForm = (value) => {
    setActiveForm(value);
  };


  return (
    <Router>
      <div className="app">
        <Navbar currUser={currUser} isTitleAtTop={isTitleAtTop} isHomeTwoAtTop={isHomeTwoAtTop} setActiveForm={handleSetActiveForm}/>
        <div className="app-body">
          <AppRoutes activeForm={activeForm} currUser={currUser} setCurrUser={setCurrUser} isTitleAtTop={isTitleAtTop} handleTitleAtTopChange={handleTitleAtTopChange} handleScrollPosition={handleScrollPosition} handleHomeTwoAtTopChange={handleHomeTwoAtTopChange} setActiveForm={handleSetActiveForm}/>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App