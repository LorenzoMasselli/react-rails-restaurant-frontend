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
  const [isTALogoTop, setIsTALogoAtTop] = useState(false);

  const handleTitleAtTopChange = (value) => {
    setIsTitleAtTop(value);
  };
  const handleTALogoAtTopChange = (value) => {
    setIsTALogoAtTop(value);
  };

  return (
    <Router>
      <div className="app">
        <Navbar currUser={currUser} setCurrUser={setCurrUser} isTitleAtTop={isTitleAtTop} isTALogoTop={isTALogoTop} />
        <div className="app-body">
          <AppRoutes currUser={currUser} setCurrUser={setCurrUser} isTitleAtTop={isTitleAtTop} handleTitleAtTopChange={handleTitleAtTopChange} handleTALogoAtTopChange={handleTALogoAtTopChange} isTALogoTop={isTALogoTop} />
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App