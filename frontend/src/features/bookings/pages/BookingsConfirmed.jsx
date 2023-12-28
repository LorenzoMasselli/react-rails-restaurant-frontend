import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBookOpen, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import './BookingPages.css'

function filterBookingsByDateSpecified(bookings, activeDate) {
    return bookings.filter((booking) => booking.date === activeDate);
  }

// eslint-disable-next-line react/prop-types
function BookingsConfirmed({ bookings, activeDate, formattedDate }){
    const [searchQuery, setSearchQuery] = useState('');
    // const [activeDate, setActiveDate] = useState(new Date().toISOString().slice(0, 10))

    const bookingsByDateSpecified = filterBookingsByDateSpecified(bookings, activeDate);
    const filteredBookings = bookingsByDateSpecified.filter((booking) =>
    booking.confirmed && booking.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalConfirmedBookingsQuantity = filteredBookings.reduce((total, booking) => total + booking.quantity, 0);
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (
        <> 
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
                    <div className='bookings-header'>
                        <h4>Reservations</h4>
                        <div className='bookings-table-details'>
                        <p><FontAwesomeIcon icon={faBookOpen} /> {filteredBookings.length} </p>
                        <p className='booking-total'><FontAwesomeIcon icon={faUserGroup} />  {totalConfirmedBookingsQuantity}</p>
                        </div>
                    </div>
                    <div className="bookings-list">
                        <div className='bookings-list-container'>
                            {filteredBookings.map((booking) => (
                                <div className='booking-item' key={booking.id}>
                                <p className='booking-time'>{booking.time} pm</p>
                                <div key={booking.id} className='booking-det'>
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
                </div>
            )}
        </>
    )
}

export default BookingsConfirmed