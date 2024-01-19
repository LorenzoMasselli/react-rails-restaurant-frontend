// API comes from .env.development file 
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react'
import './BookingPages.css'
import BookingsTable from './BookingsTable'
import BookingsCalendar from './BookingsCalendar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom"
// eslint-disable-next-line no-unused-vars
import { faChevronLeft, faChevronRight, faShapes, faSquarePollHorizontal, faBars, faHouse } from '@fortawesome/free-solid-svg-icons'



function BookingsList({currUser, setCurrUser}) {
    const [bookings, setBookings] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null)
    const [formattedDate, setFormattedDate] = useState('');
    const [activeDate, setActiveDate] = useState(new Date().toISOString().slice(0, 10))
    const [activeSection, setActiveSection] = useState('dashboard'); 
    const [menuLabelsVisible, setMenuLabelsVisible] = useState(false);
    const navigate = useNavigate()
    
  
    //  fetch bookings from API
    useEffect(() => {
        async function loadBookings() {
          try {
            const response = await fetch(`https://restaurant-rails-api-app-e94a97c38b74.herokuapp.com//api/v1/bookings`);
            if (response.ok) {
              const json = await response.json();
      
              // Sort the booking objects by date
              json.sort((a, b) => {
                const dateA = new Date(a.date + " " + a.time);
                const dateB = new Date(b.date + " " + b.time);
                return dateA - dateB;
              });
      
              setBookings(json);
            } else {
              throw response;
            }
          } catch (e) {
            setError('An error occured');
            console.log('An error occured');
          } finally {
            setLoading(false);
          }
        }
        loadBookings();
      }, [setBookings]);

        // store emails list and repeat customers 
         // Create a map to store the count of each email
        //  const emailCountMap = {};
   
        //  // Iterate through filteredBookings to populate the emailCountMap
        //  bookings.forEach((booking) => {
        //    const email = booking.email;
   
        //    // If the email is not in the map, initialize its count to 1
        //    if (!emailCountMap[email]) {
        //      emailCountMap[email] = 1;
        //    } else {
        //      // If the email is already in the map, increment its count
        //      emailCountMap[email]++;
        //    }
        //  });
        //  console.log(emailCountMap)


    
    const confirmBooking = async (booking) => {
        try {
          const response = await fetch(`https://restaurant-rails-api-app-e94a97c38b74.herokuapp.com//api/v1/bookings/${booking.id}`, {
            method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                  confirmed: true,
                })
          });
          if (response.ok) {
            setBookings((prevBookings) =>
            prevBookings.map((prevBooking) =>
              prevBooking.id === booking.id ? { ...prevBooking, confirmed: true } : prevBooking
            ))
          } else {
            throw response
          }
        } catch(e) {
          console.log(e)
        }
      } 

    const deleteBooking = async (id) => {
      try {
        const response = await fetch(`https://restaurant-rails-api-app-e94a97c38b74.herokuapp.com//api/v1/bookings/${id}`, {
          method: "DELETE"
        });
        if (response.ok) {
          setBookings(bookings.filter((booking) => booking.id !== id))
        } else {
          throw response
        }
      } catch(e) {
        console.log(e)
      }
    } 

    const backwardDate = () => {
      const currentDate = new Date(activeDate)
      currentDate.setDate(currentDate.getDate() - 1);
      setActiveDate(currentDate.toISOString().slice(0, 10));
    }
    const forwardDate = () => {
      const currentDate = new Date(activeDate)
      currentDate.setDate(currentDate.getDate() + 1);
      setActiveDate(currentDate.toISOString().slice(0, 10));
    }
    
    useEffect(() => {
      const convertDateToString = new Date(activeDate);
      const formattedDateString = convertDateToString.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setFormattedDate(formattedDateString);
    }, [activeDate]);
    
    return (
      <div className='booking-container'>
        <div className='menu-options'>
          <ul>
            <li>
              <div className="menu-option-container" style={{display: menuLabelsVisible === true ? "flex": ""}} onClick={() => setMenuLabelsVisible(prevValue => !prevValue)}>
              <FontAwesomeIcon icon={faBars} size='xl'/>
                <div className="menu-label" style={{display: menuLabelsVisible === true ? "block": "none"}}>
                  Menu
                </div>
              </div>
            </li>
            <li>
              <div className="menu-option-container" id={activeSection === "dashboard" ? "active-menu-dashboard-calendar" : null} style={{display: menuLabelsVisible === true ? "flex": ""}}  onClick={() => setActiveSection('dashboard')}>
                <FontAwesomeIcon id='dashboard' icon={faShapes} style={{color: "#ffffff",}} size="xl" />
                <div className="menu-label" style={{display: menuLabelsVisible === true ? "block": "none"}}>
                  Dashboard
                </div>
              </div>
            </li>
            <li>
              <div className="menu-option-container" id={activeSection === "calendar" ? "active-menu-dashboard-calendar" : null} style={{display: menuLabelsVisible === true ? "flex": ""}}  onClick={() => setActiveSection('calendar')}>
                <FontAwesomeIcon icon={faSquarePollHorizontal} style={{color: "#ffffff",}} size="xl" />
                <div className="menu-label" style={{display: menuLabelsVisible === true ? "block": "none"}}>
                  Calendar
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div className="menu-option-container" style={{display: menuLabelsVisible === true ? "flex": ""}} onClick={() => navigate('/react-rails-restaurant-frontend/home')}>
                <FontAwesomeIcon icon={faHouse} style={{color: "#ffffff",}} size="xl" />
                <div className="menu-label" style={{display: menuLabelsVisible === true ? "block": "none"}}>
                  Website
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className='booking-right'>
          {activeSection === 'calendar' ? (
            <div>
              <h2 className="dashboard-heading">Calendar</h2>
              <BookingsCalendar bookings={bookings} activeDate={activeDate} formattedDate={formattedDate} backwardDate={backwardDate}
              forwardDate={forwardDate} />
            </div>
            ) : (
              <BookingsTable setBookings={setBookings}  bookings={bookings} confirmBooking={confirmBooking} deleteBooking={deleteBooking} currUser={currUser} setCurrUser={setCurrUser}/>
            )}
        </div>
      </div>
  )
}

export default BookingsList



