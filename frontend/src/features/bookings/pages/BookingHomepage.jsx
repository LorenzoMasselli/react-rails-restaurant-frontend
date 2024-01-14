// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect}  from 'react'
import { Link } from 'react-router-dom'
import './BookingPages.css'
import './Homepage.css'
import video from './images/vid1.mp4'
import NewBookingForm from '../forms/NewBookingForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCircleXmark } from '@fortawesome/free-solid-svg-icons'



// eslint-disable-next-line react/prop-types
function BookingHomepage({isTitleAtTop, handleTitleAtTopChange, handleScrollPosition, handleHomeTwoAtTopChange, activeForm, currUser, setCurrUser, setActiveForm }) {
    // eslint-disable-next-line no-unused-vars
    const [scrollPosition, setScrollPosition] = useState(0);


    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);

        const movingText = document.querySelector(".home-1-t")
        if (movingText) {
            const titleClientRect = movingText.getBoundingClientRect();
            const distanceToTop = titleClientRect.top;
            handleTitleAtTopChange(distanceToTop<-180);
            handleScrollPosition(position)
        }

        const homeTwo = document.querySelector(".home-3")
        if (homeTwo) {
            const homeTwoClientRect = homeTwo.getBoundingClientRect();
            const distanceToTopHomeTwo = homeTwoClientRect.top;
            handleHomeTwoAtTopChange(distanceToTopHomeTwo < 310)
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

    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    };

    useEffect(() => {
        const elementsToObserve = document.querySelectorAll('.home-1, .home-3, .home-4, .home-5');

        const observer = new IntersectionObserver(handleIntersection, { threshold: 0.2 });

        elementsToObserve.forEach(element => {
            observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

   
    return (
        <div className='home'>
            {activeForm ? <div className="home-new-booking-form"><NewBookingForm currUser={currUser} setCurrUser={setCurrUser} /><FontAwesomeIcon icon={faCircleXmark} style={{color: "#ffffff",}} className="form-close" onClick={() => setActiveForm(false)}/></div> : <></>}
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