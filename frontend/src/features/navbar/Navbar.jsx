/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import menu from '../bookings/menu/beach-house-menu.pdf'

// eslint-disable-next-line react/prop-types
function Navbar({currUser, isTitleAtTop,isHomeTwoAtTop }) {
    const { pathname } = useLocation();

    
    return (
        <nav className='navbar' >
            <section className='navbar-1' style={{backgroundColor: isHomeTwoAtTop ? "black": pathname !== "/react-rails-restaurant-frontend/" ? "black" : "rgba(0, 0, 0, 0)"}}>
                <div className='navbar-1-left'>
                    <div className='navbar-1-contacts'>
                        <a href='tel:2302632599' target='blank'><FontAwesomeIcon icon={faPhone} style={{color: "white",}} size='sm'/> (230) 2632599</a>
                        <a href='https://wa.me/23054886740' target='blank'><FontAwesomeIcon icon={faWhatsapp} style={{color: "#0FBA18",}} size='lg'/> <span> (230) 54886740</span></a>
                        <p>Mon-Sun 12:00 - 22:00 </p>
                    </div>
                </div>
                <Link to="/react-rails-restaurant-frontend" className='navbar-title' style={{display: isTitleAtTop ? "block": pathname !== "/react-rails-restaurant-frontend/" ? "block" : "none"}}>The Beach House</Link>
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
                    <div className='navbar-links-flex'>
                        <a href={menu} target='blank' className='booking-link'>
                            <span className='menu-link-text' >Menu</span>
                        </a>
                    </div>
                    <div className='navbar-links-flex'>
                        <Link to="/react-rails-restaurant-frontend/new" className='booking-link shake'>
                            <button>Book</button>
                        </Link>
                    </div>
                </div>
            </section>
        </nav>
    )

}

export default Navbar