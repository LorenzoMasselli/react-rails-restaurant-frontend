import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faXTwitter} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'


function Footer() {
    

    return (
        <footer>
            <div className="footer">
                <div className='footer-left'>
                    <h2 className='footer-left-header'>Savoré</h2>
                    <div className="footer-icons">
                        <a href='https://www.instagram.com' target='blank'><FontAwesomeIcon icon={faInstagram}  alt="Instagram logo" size="xl"/></a>
                        <a href='https://www.twitter.com' target='blank'><FontAwesomeIcon icon={faXTwitter} alt="Twitter logo" size="xl"/></a>
                        <a href='https://www.facebook.com' target='blank'><FontAwesomeIcon icon={faFacebook}  alt="Instagram logo"  size="xl"/></a>
                    </div>
                </div>
                <div className='footer-center'>
                        <h3 className='footer-center-header'>Time & Location</h3>
                        <p>Monday - Sunday 12:00 - 22:00</p>
                        <p>Puerta 781, Tarragona, Bal 03947</p>
                </div>
                <div className='footer-right'>
                        <h3 className='footer-right-header'>Contact & admins</h3>
                        <a href='tel:23000000000' target='blank'>+ (230) 0000 0000</a>
                        <Link to="/react-rails-restaurant-frontend/admin"> <span style={{color:"white"}}>Admin Login</span></Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer