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
    
    // const overlayFormula = `rgba(0, 0, 0,${(0.7 * scrollPosition) / 700 + 0.05})`

    // const rootStyle = {
    //     '--height': `${0.1 * scrollPosition}px`,
    //     '--size': `${105-(scrollPosition/8.8)}px`,

    //   };

   
    return (
        <div className='home'>
            <section className='home-1'>
                {/* <div className="home-1-overlay" style={{backgroundColor: overlayFormula}}> */}
                <div className="home-1-overlay" style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
                    <div className="home-1-text">
                        <h1 className='home-1-t'>Savoré</h1>
                    </div>

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
        </div>
    )
}

export default BookingHomepage