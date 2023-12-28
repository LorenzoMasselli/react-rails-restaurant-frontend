// API comes from .env.development file 
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import './BookingPages.css'
import BookingsTable from './BookingsTable'
import BookingsConfirmed from './BookingsConfirmed'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// eslint-disable-next-line no-unused-vars
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'



function BookingsList() {
    const [bookings, setBookings] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null)
    const [formattedDate, setFormattedDate] = useState('');
    const [activeDate, setActiveDate] = useState(new Date().toISOString().slice(0, 10))
    const [activeSection, setActiveSection] = useState('confirmed'); 
    
  
    //  fetch bookings from API
    useEffect(() => {
        async function loadBookings() {
          try {
            const response = await fetch("https://restaurant-rails-api-app-e94a97c38b74.herokuapp.com//api/v1/bookings");
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
      }, []);

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
          <p onClick={() => setActiveSection('confirmed')} className='menu-option'>Reservations</p>
          <p onClick={() => setActiveSection('all')} className='menu-option'>Dashboard</p>
        </div>
        {activeSection === 'confirmed' ? ( 
          <div className='date-search'>
            <div className='date-clicker'>
              <FontAwesomeIcon icon={faChevronLeft} onClick={backwardDate} className='clickable'/>
              <p>{formattedDate}</p>
              <FontAwesomeIcon icon={faChevronRight} onClick={forwardDate} className='clickable'/>
            </div>
          </div>
          ) : ( <></>
        )}
        {activeSection === 'confirmed' ? (
          <BookingsConfirmed bookings={bookings} activeDate={activeDate} formattedDate={formattedDate} />
          ) : (
            <BookingsTable bookings={bookings} confirmBooking={confirmBooking} deleteBooking={deleteBooking}/>
          )}
      </div>
  )
}

export default BookingsList



