import React, { useState, useEffect, useMemo } from "react";
// import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBookOpen, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import './BookingPages.css'

function filterBookingsByDateSpecified(bookings, activeDate) {
    return bookings.filter((booking) => booking.date === activeDate);
  }


// eslint-disable-next-line react/prop-types
function BookingsConfirmed({ bookings, activeDate, formattedDate }){
    const [searchQuery, setSearchQuery] = useState('');

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


    function getAdjacentTimes(time) {
        const adjacentTimes = [];
        const [hour, minute] = time.split(':').map(Number);
    
        for (let i = -4; i <= 4; i++) {
            const adjacentHour = hour + Math.floor((minute + i * 30) / 60);
            const adjacentMinute = (minute + i * 30 + 60) % 60;
            adjacentTimes.push(`${adjacentHour.toString().padStart(2, '0')}:${adjacentMinute.toString().padStart(2, '0')}`);
        }
    
        return adjacentTimes;
    }

      useEffect(() => {
        const rows = [[], [], [], [], []];

          filteredBookings.forEach((booking, index) => {
            const bookingDiv = document.createElement('div');
            bookingDiv.className = 'abc';
            bookingDiv.textContent = `${booking.name}${booking.time}`;

            let dataRow = 1

            if (index === 0) {
                bookingDiv.setAttribute('data-row', '1');
                rows[0].push(booking.time);
            } else {
                for (let i = 2; i < 6; i++) {
                    const currentRow = rows[i];
                    if (i === 5) { 
                        bookingDiv.setAttribute('data-row', '5');
                        rows[4].push(booking.time);
                        dataRow = 5;
                        break;
                    }
                    if (currentRow.some((b) => b === booking.time)) {
                        continue;
                    }

                    const adjacentTimes = getAdjacentTimes(booking.time);
                    if (!currentRow.some((b) => adjacentTimes.includes(b))) {
                        bookingDiv.setAttribute('data-row', `${currentRow}`);
                        currentRow.push(booking);
                        dataRow = currentRow
                        break; 
                    }
                  }
            }

            const td = document.querySelector(`.row-${dataRow}`);
            console.log(td)
            const specificTd = td.querySelector(`td.c[data-time="${booking.time}"]`);
            console.log(specificTd)
            specificTd.innerHTML = `<div class="abc" data-row="${dataRow}">${booking.name}${booking.time}</div>`
          });

      }, [filteredBookings]);      

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


