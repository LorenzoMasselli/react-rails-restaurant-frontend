import React, { useState, useEffect, useMemo } from "react";
// import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBookOpen, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import './BookingPages.css'

function filterBookingsByDateSpecified(bookings, activeDate) {
    return bookings.filter((booking) => booking.date === activeDate);
  }

  function updateBookingDetails(timeBlocks, filteredBookings) {
    timeBlocks.forEach((time) => {
      const td = document.querySelector(`.c[data-time="${time}"]`);
      if (td) {
        const booking = filteredBookings.find((booking) => booking.time === time);
        if (booking) {
          td.innerHTML = `<div class="abc">${booking.name}${booking.date}</div>`;
        } else {
            td.innerHTML = ""
        }
      }
    });
  }

//   function hasOverlap(existingBooking, newBooking) {
//     const consistentDate = '2000-01-01'; 
//     const existingTime = new Date(`${consistentDate}T${existingBooking.time}`);
//     const newTime = new Date(`${consistentDate}T${newBooking.time}`);
//     const diffInMinutes = Math.abs(existingTime - newTime) / (1000 * 60);
  
//     return diffInMinutes < 120; // Adjust the threshold as needed (2 hours in this example)
//   }


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

    // /////////////////////////////////////////////

    const timeBlocks =  useMemo(() => {
        const slots = [];
        for (let hour = 12; hour <= 22; hour++) {
          for (let minute = 0; minute < 60; minute += 15) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            slots.push(time);
          }
        }
        return slots;
      }, []);



    useEffect(() => {
        updateBookingDetails(timeBlocks, filteredBookings);
      }, [activeDate, filteredBookings, timeBlocks]);

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
                    <div className="calendar-container">
                        <table className="table-grid">
                            <tbody className="table-grid-body">
                                <tr >
                                    <td>
                                        <table className="table-grid-times">
                                            <tbody>
                                                <tr>
                                                    {timeBlocks.map((time, index) => (
                                                        <React.Fragment key={index}>
                                                            <td className="time-slot"><span>{time}</span></td>
                                                        </React.Fragment>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="e">
                                        <table className="table-grid row-1" >
                                            <tbody>
                                                <tr>
                                                {timeBlocks.map((time, index) => (
                                                    <React.Fragment key={index}>
                                                        <td className="c" data-time={time} ></td>
                                                    </React.Fragment>
                                                ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="e">
                                        <table className="table-grid row-2">
                                            <tbody>
                                                <tr>
                                                {timeBlocks.map((time, index) => (
                                                    <React.Fragment key={index}>
                                                        <td className="c" data-time={time} ></td>

                                                    </React.Fragment>
                                                ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr >
                                    <td className="e">
                                        <table className="table-grid row-3">
                                            <tbody>
                                                <tr>
                                                {timeBlocks.map((time, index) => (
                                                    <React.Fragment key={index}>
                                                        <td className="c" data-time={time} ></td>

                                                    </React.Fragment>
                                                ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="e">
                                        <table className="table-grid row-4">
                                            <tbody>
                                                <tr>
                                                {timeBlocks.map((time, index) => (
                                                    <React.Fragment key={index}>
                                                        <td className="c" data-time={time} ></td>
                                                    </React.Fragment>
                                                ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="e">
                                        <table className="table-grid row-5">
                                            <tbody>
                                                <tr>
                                                {timeBlocks.map((time, index) => (
                                                    <React.Fragment key={index}>
                                                        <td className="c" data-time={time} ></td>
                                                    </React.Fragment>
                                                ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default BookingsConfirmed