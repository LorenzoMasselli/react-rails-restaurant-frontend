// eslint-disable-next-line no-unused-vars
import {useState, useEffect}  from 'react'
import './BookingPages.css'
import './Homepage.css'
import NewBookingForm from '../forms/NewBookingForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import aboutImage from './images/food2.jpg'
import aboutImageTwo from './images/food3.jpg'
import aboutImageThree from './images/food4.jpg'
import chef from './images/chef.jpg'


// eslint-disable-next-line react/prop-types
function BookingHomepage({ handleTitleAtTopChange, handleScrollPosition, handleHomeTwoAtTopChange, activeForm, currUser, setCurrUser, setActiveForm }) {
    // eslint-disable-next-line no-unused-vars
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleNewFormCloseHome = () => {
        setActiveForm(false);
        setTimeout(() => {
            window.alert("Congratulations! You have requested a new booking. You will receive an email once the booking has been accepted.🎉");
        }, 500);
    };


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

        const homeTwo = document.querySelector(".home-2")
        if (homeTwo) {
            const homeTwoClientRect = homeTwo.getBoundingClientRect();
            const distanceToTopHomeTwo = homeTwoClientRect.top;
            handleHomeTwoAtTopChange(distanceToTopHomeTwo < 310)
        }

        slideInLeft('about');
        slideInRight('chef');
    };

    const slideInLeft = (elemClass) => {
        const element = document.querySelector(`.${elemClass}`);
        
        if (element) {
            const elementInView = element.getBoundingClientRect();
            // console.log(`${elemClass} ${elementInView}`)
            
            if (elementInView.top > 500 && elementInView.top < window.innerHeight) {
                element.classList.add('element-in-view-left');
            }
        }
    };
    const slideInRight = (elemClass) => {
        const element = document.querySelector(`.${elemClass}`);
        
        if (element) {
            const elementInView = element.getBoundingClientRect();
            
            if (elementInView.top > 500 && elementInView.top < window.innerHeight) {
                element.classList.add('element-in-view-right');
            }
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

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
            {activeForm ? <div className="home-new-booking-form"><NewBookingForm currUser={currUser} setCurrUser={setCurrUser} onNewFormClose={handleNewFormCloseHome}/><FontAwesomeIcon icon={faCircleXmark} style={{color: "#ffffff",}} className="form-close" onClick={() => setActiveForm(false)}/></div> : <></>}
            <section className='home-1'>
                {/* <div className="home-1-overlay" style={{backgroundColor: overlayFormula}}> */}
                <div className="home-1-overlay" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <div className="scrolling-text-container">
                        <div className="scrolling-text-inner" role="marquee">
                            <div className="scrolling-text">
                                <div className="scrolling-text-item">All-day restaurant and bar</div>
                                <div className="dot"></div>
                                <div className="scrolling-text-item">All-day restaurant and bar</div>
                                <div className="dot"></div>
                                <div className="scrolling-text-item">All-day restaurant and bar</div>
                                <div className="dot"></div>
                                <div className="scrolling-text-item">All-day restaurant and bar</div>
                                <div className="dot"></div>
                                <div className="scrolling-text-item">All-day restaurant and bar</div>
                                <div className="dot"></div>
                            </div>
                            <div className="scrolling-text">
                                <div className="scrolling-text-item">All-day restaurant and bar</div>
                                <div className="dot"></div>
                                <div className="scrolling-text-item">All-day restaurant and bar</div>
                                <div className="dot"></div>
                                <div className="scrolling-text-item">All-day restaurant and bar</div>
                                <div className="dot"></div>
                                <div className="scrolling-text-item">All-day restaurant and bar</div>
                                <div className="dot"></div>
                                <div className="scrolling-text-item">All-day restaurant and bar</div>
                                <div className="dot"></div>
                            </div>
                        </div>
                    </div>
                    <div className="home-1-text">
                        <p className='home-1-t'>INSPIRED BY THE FOOD, ENERGY, AND WARMTH OF THE KITCHENS OF TURKEY </p>
                    </div>

                </div>
            </section>
            <div className='home-content-container'>
                <section className='home-2'>
                    <div className='about'>
                        <h1 className='header'><hr style={{width:"10%", border: "0.5px solid black", margin: "0"}}/>About<hr style={{width:"10%", border: "0.5px solid black", margin: "0"}}/></h1>
                        <p className='about-text'>At Savoré, we view dining as an art form, dedicated to redefining fine cuisine through immersive experiences. Our commitment to culinary excellence transforms each dish into a masterpiece, with flavors, textures, and aromas meticulously curated. Indulgence is woven into every detail, from ambiance to table settings, ensuring each moment becomes a celebration of the culinary arts. Join us at Savoré, where every bite is a revelation, and fine dining is an exquisite sensory adventure.</p>
                    </div>
                    <div className='about-container'>
                        <div className='about-images'>
                            <img className='image-1-about' src={aboutImage} alt="Plate of food" loading="lazy"/>
                            <img className='image-2-about' src={aboutImageTwo} alt="Plate of food" loading="lazy"/>
                            <img className='image-3-about' src={aboutImageThree} alt="Plate of food" loading="lazy"/>
                        </div>
                    </div>
                </section>
                <section className='home-3'>
                    <div className='contact-container'>
                        <div className='contact'>
                            <h3 className='header'><hr style={{width:"10%", border: "0.5px solid black", margin: "0"}}/>Email us</h3>
                            <p className='contact-text'>info@savore.com</p>
                        </div>
                        <div className='contact'>
                            <h3 className='header'><hr style={{width:"10%", border: "0.5px solid black", margin: "0"}}/>Phone us</h3>
                            <p className='contact-text'>+44-0000-000</p>
                        </div>
                    </div>
                    <div className='contact-container'>
                        <div className='contact'>
                            <h3 className='header'><hr style={{width:"10%", border: "0.5px solid black", margin: "0"}}/>Hours</h3>
                            <p className='contact-text bold'>Lunch</p>
                            <p className='contact-text'>12:00 - 16:00</p>
                            <p className='contact-text bold '>Dinner</p>
                            <p className='contact-text'>16:00 - 22:00</p>
                        </div>
                    </div>
                    <div className='contact-container'>
                        <div className='contact'>
                            <h3 className='header'><hr style={{width:"10%", border: "0.5px solid black", margin: "0"}}/>Find us</h3>
                            <p className='contact-text'>Puerta 781, Tarragona, Bal 03947</p>
                            <p className='contact-text'>Istanbul, Turkey</p>
                        </div>
                    </div>
                </section>
                <section className='home-4'>
                    <div className='chef-container'>
                        <div className='chef-images-container'>
                            <div className='chef-images'>
                                <p className='chef-title'>John Doe</p>
                                <img className='image-1-chef' src={chef} alt="Chef" loading="lazy"/>
                            </div>
                        </div>
                    </div>
                    <div className='chef'>
                        <h1 className='header' style={{justifyContent: "flex-end"}}><hr style={{width:"10%", border: "0.5px solid black", margin: "0"}}/>Meet the chef<hr style={{width:"10%", border: "0.5px solid black", margin: "0"}}/></h1>
                        <p className='chef-text'>John Doe is a beloved champion of Turkey's extraordinarily diverse and vibrant culinary landscape. He and his team offers a menu that celebrates global flavours with the finest ingredients crafted into culinary masterpieces. From starters to desserts, each dish is an exquisite experience that invites you on a gastronomic journey like no other.</p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default BookingHomepage