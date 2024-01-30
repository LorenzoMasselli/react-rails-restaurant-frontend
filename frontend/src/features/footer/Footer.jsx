import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faXTwitter} from '@fortawesome/free-brands-svg-icons'
import { Link, useLocation } from 'react-router-dom'


function Footer() {
    const { pathname } = useLocation();

    return (
        <footer style={{display: pathname == "/react-rails-restaurant-frontend/home" ? "block" : "none"}}>
            <div className="footer">
                <div className='footer-left'>
                    <h2 className='footer-left-header'>Savoré</h2>
                    <p>We look forward to having you come visit</p>
                </div>
                <div className='footer-center'>
                        <h3 className='footer-center-header'>Restaurant Info</h3>
                        <p>Monday - Sunday 12:00 - 22:00</p>
                        <p>Puerta 781, Tarragona, Bal 03947</p>
                        <a href='tel:23000000000' target='blank'>Tel: +44-0000-0000</a>
                </div>
                <div className='footer-center'>
                        <h3 className='footer-center-header'>Administrative</h3>
                        <Link to="/react-rails-restaurant-frontend/admin"> <span>Admin Login</span></Link>
                </div>
                <div className='footer-center'>
                <div className='footer-right-container'>
                            <h3 className='footer-right-header'>Socials</h3>
                            <div className="footer-icons">
                                <a href='https://www.instagram.com' target='blank'><FontAwesomeIcon icon={faInstagram}  alt="Instagram logo" size="xl"/></a>
                                <a href='https://www.twitter.com' target='blank'><FontAwesomeIcon icon={faXTwitter} alt="Twitter logo" size="xl"/></a>
                                <a href='https://www.facebook.com' target='blank'><FontAwesomeIcon icon={faFacebook}  alt="Instagram logo"  size="xl"/></a>
                            </div>
                        </div>
                </div>
            </div>
            <hr />
            <div className='footer-bottom'>
                <p>Privacy policy</p>
                <p>All rights reserved @LorenzoMasselli</p>
                <p>Terms & Conditions</p>
            </div>
        </footer>
    )
}

export default Footer