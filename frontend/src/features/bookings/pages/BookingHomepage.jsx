// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect}  from 'react'
import './BookingPages.css'
import './Homepage.css'
import homeTA from './images/tripadvisor-choice-award.png'

// FontAwesome
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBurger } from '@fortawesome/free-solid-svg-icons'

function BookingHomepage({isTitleAtTop, handleTitleAtTopChange, handleTALogoAtTopChange, isTALogoTop}) {
    // eslint-disable-next-line no-unused-vars
    const [scrollPosition, setScrollPosition] = useState(0);
    const [opacity, setOpacity] = useState(false);


    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);

        const movingText = document.querySelector(".home-1-moving-text")
        if (movingText) {
            const titleClientRect = movingText.getBoundingClientRect();
            const distanceToTop = titleClientRect.top;
            handleTitleAtTopChange(distanceToTop<-90);
            setOpacity(distanceToTop < 80);
            handleTALogoAtTopChange(distanceToTop<10)
            console.log(isTALogoTop)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    // const calculateOpacity = () => Math.max(0.05, 0.7 - (overlay + 1300) / 2000);

    const rootStyle = {
        '--height': `${1.3*scrollPosition}px`,
        '--size': `${140-(scrollPosition/2.9)}px`,
        '--width': `${175-(scrollPosition/2.9)}px`,
      };

   
    return (
        <div className='home'>
            <section className='home-1'>
                <div className="home-1-moving-text" style={{...rootStyle}}>
                    <div className='home-1-tripadvisor-container'>
                        <img src={homeTA} alt="Tripadvisor Choice Award" className='home-1-tripadvisor' style={{opacity: isTALogoTop ? "0.0" : "1"}}/>
                    </div>
                    <div className='home-1-text' style={{opacity: isTitleAtTop ? "0.0" : "1"}}>
                        <h5 className='home-1-welcome'>⎯ Welcome to ⎯</h5>
                        <h1 className='home-1-title'>THE BEACH HOUSE</h1>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BookingHomepage