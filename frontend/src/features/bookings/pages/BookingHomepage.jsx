// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect}  from 'react'
import './BookingPages.css'
import './Homepage.css'
import homeTA from './images/tripadvisor-choice-award.png'
import platter from './images/beach-house-tapas-board.jpeg'
import burger from './images/burger.jpg'
import grill from './images/beach-house-steak.jpeg'
import pizza from './images/pizza.jpg'
import curry from './images/curry.jpg'
import seafoodPlatter from './images/seafood-platter.jpg'

// FontAwesome
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBurger } from '@fortawesome/free-solid-svg-icons'


// eslint-disable-next-line react/prop-types
function BookingHomepage({isTitleAtTop, handleTitleAtTopChange, handleTALogoAtTopChange, isTALogoTop, handleScrollPosition}) {
    // eslint-disable-next-line no-unused-vars
    const [scrollPosition, setScrollPosition] = useState(0);


    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);

        const movingText = document.querySelector(".home-1-moving-text")
        if (movingText) {
            const titleClientRect = movingText.getBoundingClientRect();
            const distanceToTop = titleClientRect.top;
            handleTitleAtTopChange(distanceToTop<-65);
            handleTALogoAtTopChange(distanceToTop<10);
            handleScrollPosition(position)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // console.log(scrollPosition)
        // handleScrollPosition(scrollPosition)
    }, [scrollPosition])
    
    const overlayFormula = `rgba(0, 0, 0,${(0.8 * scrollPosition) / 750 + 0.05})`

    const rootStyle = {
        '--height': `${1.2*scrollPosition}px`,
        '--size': `${145-(scrollPosition/2.9)}px`,
        '--width': `${175-(scrollPosition/2.9)}px`,
      };

   
    return (
        <div className='home'>
            <section className='home-1'>
                <div className="home-1-overlay" style={{backgroundColor: overlayFormula}}></div>
                <div className="home-1-moving-text" style={{...rootStyle}}>
                    <div className='home-1-tripadvisor-container'>
                        <img src={homeTA} alt="Tripadvisor Choice Award" className='home-1-tripadvisor' style={{opacity: isTitleAtTop ? "0.0" : "1"}}/>
                    </div>
                    <div className='home-1-text' style={{opacity: isTitleAtTop ? "0.0" : "1"}}>
                        {/* <h5 className='home-1-welcome'>⎯ Welcome to ⎯</h5> */}
                        <h1 className='home-1-title'>THE BEACH HOUSE</h1>
                    </div>
                </div>
            </section>
            <section className='home-2'>
                <div className='home-2-about'>
                    <div className='home-2-about-text'>
                        <h5>⎯ Amazing food ⎯</h5>
                        <h4>Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        <button>Book a table</button>
                    </div>
                    <hr className='hr-break' />
                    <div className='home-2-about-gallery'>
                        <h3>Gallery</h3>
                        <div className='home-2-about-gallery-images'>
                            <img src={platter} alt="Beach House Food" className='home-2-about-gallery-image'/>
                            <img src={grill} alt="Beach House Food" className='home-2-about-gallery-image'/>
                            <img src={burger} alt="Beach House Food" className='home-2-about-gallery-image'/>
                            <img src={pizza} alt="Beach House Food" className='home-2-about-gallery-image'/>
                            <img src={curry} alt="Beach House Food" className='home-2-about-gallery-image'/>
                            <img src={seafoodPlatter} alt="Beach House Food" className='home-2-about-gallery-image'/>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default BookingHomepage