/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
// import { faPhone } from '@fortawesome/free-solid-svg-icons'
import menu from '../bookings/menu/beach-house-menu.pdf'

// eslint-disable-next-line react/prop-types
function Navbar({currUser, isTitleAtTop,isHomeTwoAtTop, setActiveForm  }) {
    const { pathname } = useLocation();

    
    return (
        <nav className='navbar' style={{display: pathname !== "/react-rails-restaurant-frontend/bookings" ? "flex" : "none"}}>
            <section className='navbar-1' style={{backgroundColor: isHomeTwoAtTop ? "rgba(255, 255, 255, 1)": pathname !== "/react-rails-restaurant-frontend/home" ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)"}}>
                <div className='navbar-1-left' style={{display: pathname !== "/react-rails-restaurant-frontend/home" ? "none" : "flex"}}>
                    <div className='navbar-1-contacts'>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=-20.01557109059909,57.58057550851208">20.0156° S, 57.5806° E </a>
                    </div>
                </div>
                <Link to="/react-rails-restaurant-frontend/home" className='navbar-title' style={{display: isTitleAtTop ? "block": pathname !== "/react-rails-restaurant-frontend/home" ? "block" : "none"}}>Savoré</Link>
                <div className='navbar-links'>
                    <div>
                        {currUser && currUser.admin ? (
                            <>
                                <Link to="/react-rails-restaurant-frontend/bookings" className='booking-link'>
                                    <span className='booking-link-text'>All bookings</span>
                                </Link>
                            </>
                        ): null}
                    </div>
                    <div className='navbar-links-flex' style={{display: pathname !== "/react-rails-restaurant-frontend/home" ? "none" : "flex"}}>
                        <a href={menu} target='blank' className='booking-link'>
                            <span className='menu-link-text' >Menu</span>
                        </a>
                    </div>
                    <div className='navbar-links-flex' style={{display: pathname !== "/react-rails-restaurant-frontend/home" ? "none" : "flex"}}>
                        <div className='booking-link shake'>
                            <button onClick={() => { setActiveForm(true) }} className='main-button'>Book</button>
                        </div>
                    </div>
                </div>
            </section>
        </nav>
    )

}

export default Navbar