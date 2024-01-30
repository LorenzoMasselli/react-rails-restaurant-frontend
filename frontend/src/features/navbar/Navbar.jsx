import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types';
import './Navbar.css'
import menu from '../bookings/menu/beach-house-menu.pdf'

// eslint-disable-next-line react/prop-types
function Navbar({currUser, isTitleAtTop,isHomeTwoAtTop, setActiveForm  }) {
    const { pathname } = useLocation();

    
    return (
        <nav className='navbar' role="navigation" style={{display: pathname !== "/react-rails-restaurant-frontend/bookings" ? "flex" : "none", borderBottom: isHomeTwoAtTop ? "1px solid black" : ""}}>
            <section className='navbar-1' role="navigation-1" style={{backgroundColor: isHomeTwoAtTop ? "rgba(255, 255, 255)": "rgba(255, 255, 255, 0)"}}>
                <div className='navbar-1-left'>
                    <div className='navbar-1-contacts'>
                        <a role="directions-link"href="https://www.google.com/maps/dir/?api=1&destination=-20.01557109059909,57.58057550851208" style={{color: isHomeTwoAtTop ? "black": "white"}} >20.0156° S, 57.5806° E </a>
                    </div>
                </div>
                <div role="title-navigation" className='navbar-title' style={{color: isHomeTwoAtTop ? "black": "white"}}>Savoré</div>
                <div className='navbar-links'>
                    <div>
                        {currUser && currUser.admin ? (
                            <>
                                <Link to="/react-rails-restaurant-frontend/bookings" className='booking-link'>
                                    <span className='booking-link-text' style={{color: isHomeTwoAtTop ? "black": "white"}} >Dashboard</span>
                                </Link>
                            </>
                        ): null}
                    </div>
                    <div className='navbar-links-flex' style={{display: "flex"}}>
                        <a href={menu} target='blank' className='booking-link'>
                            <span className='menu-link-text' style={{color: isHomeTwoAtTop ? "black": "white"}}  >Menu</span>
                        </a>
                    </div>
                    <div className='navbar-links-flex' style={{display: "flex"}}>
                        <div className='booking-link shake'>
                            <button onClick={() => { setActiveForm(true) }} className={isHomeTwoAtTop ? "main-button" : "secondary-button"}>Reserve</button>
                        </div>
                    </div>
                </div>
            </section>
        </nav>
    )

}

Navbar.propTypes = {
    currUser: PropTypes.shape({
        admin: PropTypes.bool.isRequired,
    }),
};


export default Navbar