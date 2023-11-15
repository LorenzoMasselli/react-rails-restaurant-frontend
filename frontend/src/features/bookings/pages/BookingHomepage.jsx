// eslint-disable-next-line no-unused-vars
import React, {useState}  from 'react'
import './BookingPages.css'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBurger } from '@fortawesome/free-solid-svg-icons'

// images and menu
import ImageSlider from '../imageSlider/ImageSlider'
import MenuPdf from '../menu/beach-house-menu.pdf'
import Image1 from '../imageRollerImages/event-image-1.jpg'
import Image2 from '../imageRollerImages/event-image-2.jpg'
import Image3 from '../imageRollerImages/event-image-1.jpg'
import Image4 from '../imageRollerImages/event-image-2.jpg'
import Image5 from '../imageRollerImages/event-image-1.jpg'
import Image6 from '../imageRollerImages/event-image-2.jpg'




function BookingHomepage() {
    const [activeMenuDiv, setActiveMenuDiv] = useState('about');

    
    function handleMenuItemClick(menuDiv) {
        setActiveMenuDiv(menuDiv);
      }
      const images = [Image1, Image2, Image3, Image4, Image5, Image6];

    return (
        <div className='home'>
            <div className='contact-card'>
            <FontAwesomeIcon icon={faBurger} style={{color: "#171C8F",}} />
                <div>
                    <h3>Contact card</h3>
                </div>
                <div className='contact-directions'>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=-20.01557109059909,57.58057550851208" target='blank'>📍 Directions</a>
                </div>
                <div className='contact-numbers'>
                    <div><a href='tel:2302632599' target='blank'>📞:(230)2632599</a></div>
                    <div><a href='https://wa.me/23054886740' target='blank'>T:(230)54886740</a></div>   
                </div>
            </div>
            <div className='menu-home'>
                <h3>
                    <a href="#" className={ `about-link ${activeMenuDiv === 'about' ? 'active' : '' }`} onClick={() => handleMenuItemClick('about')}>About</a>
                </h3>
                <h3>
                    <a href="#" className={ `events-link ${activeMenuDiv === 'events' ? 'active' : '' }`} onClick={() => handleMenuItemClick('events')}>Events</a>
                </h3>
                <h3>
                    <a href={MenuPdf} className='menu-link' target='blank'>Menu</a>
                </h3>
            </div>
            <div className="about" style={{ display: activeMenuDiv === 'about' ? 'flex' : 'none' }}>
                <div className='about-left-content'>
                    <h2>About</h2>
                    <p className='about-left-content-header'>The Beach House aims to tantalize your taste buds and treat you to an unforgettable dining experience. Step into a stunning beachside setting with breathtaking views of the ocean and let yourself be enveloped by the delightful atmosphere.</p>
                    <p>Embark on a culinary journey while taking in the breathtaking views of the ocean. Enjoy a leisurely lunch paired with refreshing cocktails and cold beer, or savor our rustic bar and grill favorites as the sun sets over the beach.</p>
                    <p className="about-left-time">Opening times: Mon-Sun 12:00 - 22:00</p>
                </div>
                <div className='right-about'>
                    <ImageSlider/>

                </div>
            </div>
            <div className="events" style={{ display: activeMenuDiv === 'events' ? 'flex' : 'none' }}>
                <div className='events-left'>
                    <h2>Events</h2>
                    <p>Whether youre looking to celebrate a special occasion, cheer on your favorite team, or enjoy a night of live music, The Beach House has you covered. With our stunning beachside setting and breathtaking views of the ocean, were the perfect place to host your next event or simply let loose and have some fun.</p>
                </div>
                <div className='events-right'>
                    <div className='events-right-content'>
                        <div>
                            <h3 className='events-right-content-header'>Events at the Beach House</h3>
                            
                            <p>The Beach House also hosts private parties, so you can celebrate your special occasion in style with your loved ones. You can also watch your favorite sports team play on our big screens, or join us for one of our many events throughout the year, such as Mauritian Independence Day and New Years Eve.</p>
                            <p>*Please contact us if you would like to organize a private event</p>
                            <p className="about-left-time">Opening times: Mon-Sun 12:00 - 22:00</p>
                        </div>
                    </div>
                    <div className="image-scroller">
                        <div className="image-container">
                            {images.map((image, index) => (
                                <img src={image} alt="" key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingHomepage