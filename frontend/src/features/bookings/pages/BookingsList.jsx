// API comes from .env.development file 
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './BookingPages.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faChevronDown, faChevronUp  } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

function filterBookingsByToday(bookings) {
  const today = new Date().toISOString().slice(0, 10);
  return bookings.filter((booking) => booking.date === today);
}
function filterBookingsByTomorrow(bookings) {
  const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return bookings.filter((booking) => booking.date === tomorrow);
}

function filterBookingsByDateSpecified(bookings, dateSpecified) {
  const formattedDateSpecified = new Date(dateSpecified).toISOString().slice(0, 10);
  return bookings.filter((booking) => booking.date === formattedDateSpecified);
}

function BookingItem({ booking, confirmBooking, deleteBooking }) {
  return (
    <div key={booking.id} className='bookings-list'>
      <div className="booking-activity">
        <Link to={`/bookings/${booking.id}`}>{booking.name} ({booking.quantity})</Link>
        <FontAwesomeIcon
          icon={faCircle}
          style={{ color: booking.confirmed ? 'green' : 'red', position: 'absolute', top: '6px', right: '9px' }}
        />
      </div>
      <h4 className='booking-time'>{booking.time}</h4>
      <div className='edit-delete'>
        <Link to={`/react-rails-restaurant-frontend/bookings/bookings/${booking.id}/edit`}><button className='edit-button'>Edit</button></Link>
        {!booking.confirmed && (
          <button className='confirm-button ' onClick={() => confirmBooking(booking)}>Confirm</button>
        )}
        <button className="delete-button" onClick={() => deleteBooking(booking.id)}>Delete</button>
      </div>
    </div>
  );
}
function BookingsList() {
    const [bookings, setBookings] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null)
    const [todayIcon, setTodayIcon] = useState(faChevronUp)
    const [tomorrowIcon, setTomorrowIcon] = useState(faChevronDown)
    const [dateSpecifiedIcon, setDateSpecifiedIcon] = useState(faChevronUp)
    const [dateSpecified, setDateSpecified] = useState(new Date().toISOString().slice(0, 10));
    const [dateInputted, setDateInputted] = useState(false);

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

    const toggleBookingTodayIcon = () => {
      setTodayIcon((prevIcon) => {
        if (prevIcon === faChevronDown) {
          return faChevronUp
        } else if (prevIcon === faChevronUp) {
          return faChevronDown
        }
      })
    };
    const toggleBookingTomorrowIcon = () => {
      setTomorrowIcon((prevIcon) => {
        if (prevIcon === faChevronDown) {
          return faChevronUp
        } else if (prevIcon === faChevronUp) {
          return faChevronDown
        }
      })
    };
    const toggleBookingDateSpecifiedIcon = () => {
      setDateSpecifiedIcon((prevIcon) => {
        if (prevIcon === faChevronDown) {
          return faChevronUp
        } else if (prevIcon === faChevronUp) {
          return faChevronDown
        }
      })
    };

    const combinedHandleDateChange = (e) => {
      setDateSpecified(e.target.value);
      setDateInputted(true);
    };

    const todaysBookings = filterBookingsByToday(bookings);
    const tomorrowBookings = filterBookingsByTomorrow(bookings);
    const bookingsByDateSpecified = filterBookingsByDateSpecified(bookings, dateSpecified);

    const convertDateToString = new Date(dateSpecified);

    const formattedDate = convertDateToString.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    

    return (
      <div className='booking-container'>
          <h1>All bookings</h1>
          <h2 className='bookings-days'>Today <FontAwesomeIcon icon={todayIcon} className='booking-days-icon' onClick={toggleBookingTodayIcon}/></h2>
          <div className='all-bookings' style={{display: todayIcon === faChevronDown ? 'none' : 'flex'}}>
          {todaysBookings.length === 0 ? (
            <div className='no-bookings'>
              <h2>No bookings for today </h2>
            </div>
          ) : (
            todaysBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} confirmBooking={confirmBooking} deleteBooking={deleteBooking} />
            ))
          )}
          </div>
          <h2 className='bookings-days'>Tomorrow <FontAwesomeIcon icon={tomorrowIcon} className='booking-days-icon' onClick={toggleBookingTomorrowIcon}/></h2>
          <div className='all-bookings' style={{display: tomorrowIcon === faChevronDown ? 'none' : 'flex'}}>
          {tomorrowBookings.length === 0 ? (
            <div className='no-bookings'>
              <h2>No bookings for today </h2>
            </div>
          ) : (
            tomorrowBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} confirmBooking={confirmBooking} deleteBooking={deleteBooking} />
            ))
          )}
          </div>
          <div className='date-search'>
            <h4>Search Date: </h4>
            <input type="date" value={dateSpecified} onChange={combinedHandleDateChange} className='booking-date-search-input'/>
          </div>
          {!dateInputted && (
            <div className='no-bookings'>
              <h2></h2>
            </div>
          )}
          {dateInputted && bookingsByDateSpecified.length > 0 && (
            <div className='booking-date-search'>
                <h2 className='bookings-days'> Date: {formattedDate} <FontAwesomeIcon icon={dateSpecifiedIcon} className='booking-days-icon' onClick={toggleBookingDateSpecifiedIcon}/></h2>
                  <div className='all-bookings' style={{display: dateSpecifiedIcon === faChevronDown ? 'none' : 'flex'}}>
                    {bookingsByDateSpecified.map((booking) => (
                       <BookingItem key={booking.id} booking={booking} confirmBooking={confirmBooking} deleteBooking={deleteBooking} />
                    ))}
                </div>
            </div>
          )}
          {dateInputted && bookingsByDateSpecified.length === 0 && (
            <div>
                <div className='no-bookings'>
                    <h2>No bookings for {formattedDate} </h2>
                </div>
            </div>
          )}
          
      </div>
  )
}

BookingItem.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    confirmed: PropTypes.bool.isRequired,
    // Add other properties as needed
  }).isRequired,
  confirmBooking: PropTypes.func.isRequired,
  deleteBooking: PropTypes.func.isRequired,
};

export default BookingsList