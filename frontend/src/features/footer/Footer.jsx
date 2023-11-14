import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import tripAdvisor from './tripadvisor.png'
import { Link } from 'react-router-dom'

function Footer() {
    

    return (
        <footer className="footer">
            <div>
                <h2 className='footer-left-header'>The BeachHouse</h2>
                <div className="footer-icons">
                    <a href='https://www.instagram.com/thebeachhousemu/' target='blank'><FontAwesomeIcon icon={faInstagram} style={{color: "#ffffff",}} alt="Instagram logo" /></a>
                    <a href='https://www.tripadvisor.com/Restaurant_Review-g488103-d1674515-Reviews-The_Beach_House_Restaurant_Beach_Bar-Grand_Baie.html' target='blank'><img src={tripAdvisor} alt="Tripadvisor logo" /></a>
                    <a href='https://www.facebook.com/thebeachhousemu/' target='blank'><FontAwesomeIcon icon={faFacebook} style={{color: "#ffffff",}} alt="Instagram logo"  /></a>
                    <Link to="/admin"><FontAwesomeIcon icon={faUser} style={{color: "#ffffff", marginLeft: '15px'}} /></Link>
                </div>
            </div>
            <div className='footer-right'>
                <div className='footer-right-content'>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=-20.01557109059909,57.58057550851208" target='blank'>📍 Directions</a>
                    <h4>Opening times: </h4>
                    <p>Mon-Sun 12:00 - 22:00</p>
                </div>
                <div className='footer-right-contact'>
                    <h4>Contact us:</h4>
                    <a href='tel:2302632599' target='blank'>📞:(230)2632599</a>
                    <a href='https://wa.me/23054886740' target='blank'>Whatsapp:(230)54886740</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer