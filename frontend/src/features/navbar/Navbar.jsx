// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faCalendarDays, faRectangleList, faMap} from '@fortawesome/free-solid-svg-icons'
import tripAdvisor from './tripadvisor-choice-award.png'
import MenuPdf from '../bookings/menu/beach-house-menu.pdf'


function Navbar({currUser, setCurrUser, isTitleAtTop, isAboutAtTop}) {

    useEffect(() => {
        console.log(isAboutAtTop)
    }, [isAboutAtTop]);

    const navbarRoot = {
        '--fontColor': `${isAboutAtTop ? 'black': 'white'}`,
    }
    return (
        <nav className='navbar' style={{...navbarRoot, backdropFilter: isAboutAtTop ? "none" : "blur(2px)", backgroundColor: isAboutAtTop ? "white" : "#ffffff00" }}>
            <div className='navbar-info' style={{display: isAboutAtTop ? 'none' : 'flex'}}>
                <div className='directions'>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=-20.01557109059909,57.58057550851208" target='blank'>📍 Directions</a>
                </div>
                <div className='navbar-contact'>
                    <a href='tel:2302632599' target='blank'>📞 :(230)2632599</a>
                    <a href='https://wa.me/23054886740' target='blank' className='numbers'><FontAwesomeIcon icon={faWhatsapp} size="lg" style={{color: "#0FBA18",}} /> :(230)54886740</a>
                </div>
            </div>
            <div className='navbar-main' style={{ borderTop: isAboutAtTop ? "solid 1px rgba(0, 0, 0, 0.001)" : "solid 1px rgba(255, 255, 255, 0.236)"}}>
            <div className='image-flexbox'>
                <img src={tripAdvisor} alt="Tripadvisor Choice Award 2023" className='tripadvisor-logo-home' style={{backgroundColor: isAboutAtTop ? '#173F96' : '#11111100'}}/>
            </div>
            <Link to="/">
                <h3 className='navbar-title' style={{display: isTitleAtTop ? "flex" : 'none', color: isAboutAtTop ? '#173F96': 'white' }}>THE BEACH HOUSE</h3>
            </Link>
            <div className='navbar-links' style={{color: isAboutAtTop ? '#173F96': 'white' }}>
                <div>
                    {currUser && currUser.admin ? (
                        <>
                            <Link to="/bookings" className='booking-link'>
                                <FontAwesomeIcon icon={faRectangleList} size="xl"/>
                                <span className='booking-link-text'>All bookings</span>
                            </Link>
                        </>
                    ): null}
                </div>
                <div>
                    <a href={MenuPdf} target='blank' className='booking-link'>
                        <FontAwesomeIcon icon={faMap} size="xl" style={{color: isAboutAtTop ? '#173F96': 'white' }}/>
                        <span className='booking-link-text'>Menu</span>
                    </a>
                </div>
                <div>
                    <Link to="/new" className='booking-link shake'>
                        <FontAwesomeIcon icon={faCalendarDays} size="xl" style={{color: isAboutAtTop ? '#173F96': 'white' }}/>
                        <span className='booking-link-text' >Book Now</span>
                    </Link>
                </div>
            </div>
            </div>
        </nav>
    )

}

export default Navbar