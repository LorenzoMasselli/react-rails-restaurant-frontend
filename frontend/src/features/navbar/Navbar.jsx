// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faRectangleList } from '@fortawesome/free-solid-svg-icons'
import tripAdvisor from './tripadvisor-choice-award.png'

function Navbar({currUser, setCurrUser, isTitleAtTop, isTALogoTop}) {
   
    
    return (
        <nav className='navbar'>
            <section className='navbar-1'>
                <div className='tripadvisor'>
                    <img src={tripAdvisor} alt="Tripadvisor Choice Award 2023" className='tripadvisor-logo' style={{display: isTALogoTop ? "block" : "none"}}/>
                </div>
                <Link to="/react-rails-restaurant-frontend" className='navbar-title' style={{display: isTitleAtTop ? "block" : "none"}}>THE BEACH HOUSE</Link>
                <div className='navbar-links'>
                    <div>
                        {currUser && currUser.admin ? (
                            <>
                                <Link to="/react-rails-restaurant-frontend/bookings" className='booking-link'>
                                    <FontAwesomeIcon icon={faRectangleList} size="2xl"/>
                                    <span className='booking-link-text'>All bookings</span>
                                </Link>
                            </>
                        ): null}
                    </div>
                    <div>
                        <Link to="/react-rails-restaurant-frontend/new" className='booking-link shake'>
                            <FontAwesomeIcon icon={faCalendarDays} size="2xl"/>
                            <span className='booking-link-text' >Book now</span>
                        </Link>
                    </div>
                </div>
            </section>
        </nav>
    )

}

export default Navbar