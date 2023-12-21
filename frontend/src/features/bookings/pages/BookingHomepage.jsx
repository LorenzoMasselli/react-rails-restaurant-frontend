// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect}  from 'react'
import { Link } from 'react-router-dom'
import './BookingPages.css'
import './Homepage.css'
import chicken from './images/food1.jpg'
import burger from './images/burger.jpg'
import video from './images/vid1.mp4'
import grill from './images/beach-house-steak.jpeg'
import pizza from './images/pizza.jpg'
import curry from './images/curry.jpg'
import location from './images/The-Beach-House-Location-Map.jpg'
import tripadvisor from './images/tripadvisor-choice-award.png'
import seafoodPlatter from './images/seafood-platter.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'


// eslint-disable-next-line react/prop-types
function BookingHomepage({isTitleAtTop, handleTitleAtTopChange, handleScrollPosition, handleHomeTwoAtTopChange }) {
    // eslint-disable-next-line no-unused-vars
    const [scrollPosition, setScrollPosition] = useState(0);


    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);

        const movingText = document.querySelector(".home-1-title")
        if (movingText) {
            const titleClientRect = movingText.getBoundingClientRect();
            const distanceToTop = titleClientRect.top;
            handleTitleAtTopChange(distanceToTop<35);
            handleScrollPosition(position)
        }

        const homeTwo = document.querySelector(".home-2")
        if (homeTwo) {
            const homeTwoClientRect = homeTwo.getBoundingClientRect();
            const distanceToTopHomeTwo = homeTwoClientRect.top;
            handleHomeTwoAtTopChange(distanceToTopHomeTwo < 280)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // console.log(scrollPosition)
        // handleScrollPosition(scrollPosition)
    }, [scrollPosition])
    
    const overlayFormula = `rgba(0, 0, 0,${(0.7 * scrollPosition) / 700 + 0.05})`

    const rootStyle = {
        '--height': `${0.1 * scrollPosition}px`,
        '--size': `${105-(scrollPosition/8.8)}px`,

      };

   
    return (
        <div className='home'>
            <section className='home-1'>
                {/* <div className="home-1-overlay" style={{backgroundColor: overlayFormula}}> */}
                <div className="home-1-overlay" style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
                    {/* <div className="home-1-moving-text">
                        <h1 className='home-1-title' style={{...rootStyle, opacity: isTitleAtTop ? "0.0" : "1"}}>Savoré </h1>
                    </div> */}
                    <div className="home-1-text">
                        <h1 className='home-1-t'>Savoré</h1>
                    </div>
                    {/* <div className='home-1-content'>
                        <p className='home-1-content-p'><span style={{fontWeight: "900"}}>Savoré</span>, located in the heart of Grand Baie, is a fresh take on Mediterranean bar and grill, featuring live music, live sports, a rooftop patio bar and breathtaking ocean views. </p>
                    </div> */}
                </div>
            </section>
            <section className='home-3'>
                <div className='about'>
                    <h1 className='header'>About</h1>
                    <p className='about-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                </div>
                <div className='about-image'>
                </div>
            </section>
            <section className='home-4'>
                <div className='events-image'>
                </div>
                <div className='events'>
                    <h1 className='header'>Events</h1>
                    <p className='events-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    <Link to="/react-rails-restaurant-frontend/new">
                        <button className='event-button'>Book an event</button>
                    </Link>
                </div>
            </section>
            <section className='home-5'>
                <div className='chef'>
                    <h1 className='header'>Meet the CHEFS</h1>
                    <p className='chef-text'>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                </div>
                <div className='vid-container'>
                    <div className='cooking-vid'>
                </div>
                <video id="background-video" autoPlay loop muted>
                    <source src={video} type="video/mp4"/>
                </video>
                </div>
            </section>
            {/* <section className='home-2'>
                <div className='home-2-about'>
                    <div className='home-2-about-text'>
                        <div>
                            <h4>About us</h4>
                            <p className='home-2-atc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <Link to="/react-rails-restaurant-frontend/new">
                                <button>Book a table</button>
                            </Link>
                        </div>
                        <img src={tripadvisor} alt="tripadvisor choice award 2023" />
                    </div>
                <hr className='hr-break' />
                    <div className="home-2-about-text-private-container">
                        <div className='home-2-about-text-private'>
                            <div>
                                <h4>Private Events</h4>
                                <p>Savoré can accommodate any private events from weddings to dinner parties. We have a rooftop area that offers a secluded area for guests. The area allows guests to enjoy Savoré in an intimate setting, looking out over the ocean. We will tailor your experience by helping provide personalized menu and more.</p>
                            </div>
                            <div>
                                <h4>Live Music & Sports</h4>
                                <p>With big TVs situated all around our restaurant. We show all major live sports, so that you wont miss a beat. So sit back, eat some delicious food and drink some beers while cheering on your favorite team on the big screen.</p>
                            </div>
                        </div>
                        <p>Contact us to book private dining or events:</p>
                        <div className='contact-private'>
                            <a href='tel:2302632599' target='blank'><FontAwesomeIcon icon={faPhone} style={{color: "white",}} size='sm'/> (230) 2632599</a>
                            <a href='https://wa.me/23054886740' target='blank'><FontAwesomeIcon icon={faWhatsapp} style={{color: "#0FBA18",}}  size='lg' /> <span> (230) 2632599</span></a>
                        </div>
                    </div>
                    <hr className='hr-break' />
                    <div className='home-2-about-gallery'>
                        <h3>Gallery</h3>
                        <div className='home-2-about-gallery-images'>
                            <img src={chicken} alt="Beach House Food" className='home-2-about-gallery-image'/>
                            <img src={grill} alt="Beach House Food" className='home-2-about-gallery-image'/>
                            <img src={burger} alt="Beach House Food" className='home-2-about-gallery-image'/>
                            <img src={pizza} alt="Beach House Food" className='home-2-about-gallery-image'/>
                            <img src={curry} alt="Beach House Food" className='home-2-about-gallery-image'/>
                            <img src={seafoodPlatter} alt="Beach House Food" className='home-2-about-gallery-image'/>
                        </div>
                    </div>
                    <hr className='hr-break' />
                    <div className='home-2-about-location'>
                        <div className='home-2-about-location-info'>
                            <img src={location} alt="Beach House Food" className='home-2-about-location-image'/>
                            <div className='home-2-alc'>
                                <h3>Location & Hours</h3>
                                <p>Royal Rd., B13, Grand Baie, Mauritius</p>
                                <a href="https://www.google.com/maps/dir/?api=1&destination=-20.01557109059909,57.58057550851208" target='blank'><button >Directions</button></a>
                                <hr className='hr-break-directions' />
                                <p>Open Times: Monday - Sunday, 12:00 - 22:00</p>
                                <Link to="/react-rails-restaurant-frontend/new">
                                    <button>Book a table</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </div>
    )
}

export default BookingHomepage