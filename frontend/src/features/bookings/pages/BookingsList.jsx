// API comes from .env.development file 
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './BookingPages.css'
import BookingsTable from './BookingsTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// eslint-disable-next-line no-unused-vars
import { faCircle, faChevronDown, faChevronUp, faChevronLeft, faChevronRight, faUserGroup, faMagnifyingGlass, faBookOpen  } from '@fortawesome/free-solid-svg-icons'

function filterBookingsByDateSpecified(bookings, activeDate) {
  return bookings.filter((booking) => booking.date === activeDate);
}

function BookingsList() {
    const [bookings, setBookings] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null)
    const [activeDate, setActiveDate] = useState(new Date().toISOString().slice(0, 10))
    const [formattedDate, setFormattedDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
  

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
    //   const confirmBooking = async (booking) => {
    //     try {
    //       const response = await fetch(`https://restaurant-rails-api-app-e94a97c38b74.herokuapp.com//api/v1/bookings/${booking.id}`, {
    //         method: "PUT",
    //             headers: {
    //                 "Content-type": "application/json",
    //             },
    //             body: JSON.stringify({
    //               confirmed: true,
    //             })
    //       });
    //       if (response.ok) {
    //         setBookings((prevBookings) =>
    //         prevBookings.map((prevBooking) =>
    //           prevBooking.id === booking.id ? { ...prevBooking, confirmed: true } : prevBooking
    //         ))
    //       } else {
    //         throw response
    //       }
    //     } catch(e) {
    //       console.log(e)
    //     }
    //   } 

    // const deleteBooking = async (id) => {
    //   try {
    //     const response = await fetch(`https://restaurant-rails-api-app-e94a97c38b74.herokuapp.com//api/v1/bookings/${id}`, {
    //       method: "DELETE"
    //     });
    //     if (response.ok) {
    //       setBookings(bookings.filter((booking) => booking.id !== id))
    //     } else {
    //       throw response
    //     }
    //   } catch(e) {
    //     console.log(e)
    //   }
    // } 

    const bookingsByDateSpecified = filterBookingsByDateSpecified(bookings, activeDate);

    
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
    
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  
  const filteredBookings = bookingsByDateSpecified.filter((booking) =>
  booking.confirmed && booking.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalConfirmedBookingsQuantity = filteredBookings.reduce((total, booking) => total + booking.quantity, 0);
  



    return (
      <div className='booking-container'>
          <div className='date-search'>
            <div className='Date-clicker'>
              <FontAwesomeIcon icon={faChevronLeft} onClick={backwardDate} className='clickable'/>
              <p>{formattedDate}</p>
              <FontAwesomeIcon icon={faChevronRight} onClick={forwardDate} className='clickable'/>
            </div>
          </div>
          <section className='booking-data'>
            <div className='left-sidebar'>
              <p>Confirmed Bookings</p>
              <p>Reservation Requests</p>
            </div>
            {filteredBookings.length >= 0 && (
              <div className='confirmed-bookings'>
                <div className='search-confirmed-bookings'>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  <input
                    type='text'
                    placeholder='Search reservations by name'
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className='all-bookings-header'>
                  <h4>Reservations</h4>
                  <div className='bookings-table-details'>
                    <p><FontAwesomeIcon icon={faBookOpen} /> {filteredBookings.length} </p>
                    <p className='booking-total'><FontAwesomeIcon icon={faUserGroup} />{totalConfirmedBookingsQuantity}</p>
                  </div>
                </div>
                <div className='all-bookings'>
                  {filteredBookings.map((booking) => (
                      <div className='all-booking-container' key={booking.id}>
                        <p className='booking-time'>{booking.time} pm</p>
                        <div key={booking.id} className='bookings-list'>
                          <div className="booking-activity">
                            <Link to={`${booking.id}`}>{capitalizeFirstLetter(booking.name)}</Link>
                          </div>
                          <div>
                            <p className='booking-quantity'>
                            <FontAwesomeIcon icon={faUserGroup} />
                              {booking.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                      ))}
                  </div>
                  {filteredBookings.length === 0 && (
                    <div>
                        <div className='no-bookings'>
                          {searchQuery !== '' ? (
                            <h4>No bookings for the name {searchQuery}</h4>
                          ) : (
                            <h4>No bookings for {formattedDate}</h4>
                          )}
                        </div>
                    </div>
                  )}
              </div>
            )}
          </section>
        <section>
          <BookingsTable bookings={bookings}/>
        </section>
          
      </div>
  )
}

export default BookingsList










 {/* <div className='edit-delete'> */}
  {/* <Link to={`/react-rails-restaurant-frontend/bookings/${booking.id}/edit`}><button className='edit-button'>Edit</button></Link>
  {!booking.confirmed && (
    <button className='confirm-button ' onClick={() => confirmBooking(booking)}>Confirm</button>
  )}
  <button className="delete-button" onClick={() => deleteBooking(booking.id)}>Delete</button> */}
{/* </div> */}