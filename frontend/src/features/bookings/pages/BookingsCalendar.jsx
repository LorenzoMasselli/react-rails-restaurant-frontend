import React, { useState, useEffect, useMemo } from "react";
// import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBookOpen, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import './BookingPages.css'

function filterBookingsByDateSpecified(bookings, activeDate) {
    return bookings.filter((booking) => booking.date === activeDate);
  }


// eslint-disable-next-line react/prop-types
function BookingsCalendar({ bookings, activeDate, formattedDate }){
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
        for (let hour = 12; hour < 23; hour++) {
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
            const adjacentMinute = Math.abs((minute + i * 30 + 60) % 60);
            adjacentTimes.push(`${adjacentHour.toString().padStart(2, '0')}:${adjacentMinute.toString().padStart(2, '0')}`);
        }
        
        return adjacentTimes;
    }

      useEffect(() => {
          
          document.querySelectorAll('.abc').forEach((div) => {
              div.remove();
            });
            
        const rows = [[], [], [], [], [], [], [], []];
        // console.log(filteredBookings)

          filteredBookings.forEach((booking, index) => {
            const bookingDiv = document.createElement('div');
            bookingDiv.className = 'abc';
            bookingDiv.textContent = `${booking.name}${booking.time}`;

            let dataRow = 1

            if (index === 0) {
                bookingDiv.setAttribute('data-row', '1');
                rows[0].push(booking.time);
            } else {
                for (let i = 0; i < 9; i++) {
                    const currentRow = rows[i];
                    if (i === 8) { 
                        bookingDiv.setAttribute('data-row', '5');
                        rows[4].push(booking.time);
                        dataRow = 5;
                        break;
                    }
                    if (currentRow.includes(booking.time)) {
                        continue;
                    }

                    const adjacentTimes = getAdjacentTimes(booking.time);
                    // console.log(adjacentTimes)
                    if (!currentRow.some((b) => adjacentTimes.includes(b))) {
                        bookingDiv.setAttribute('data-row', `${currentRow}`);
                        currentRow.push(booking.time);
                        dataRow = i + 1
                        break; 
                    } else {
                        continue
                    }
                  }
            }

            const td = document.querySelector(`.row-${dataRow}`);
            const specificTd = td.querySelector(`td.c[data-time="${booking.time}"]`);
            specificTd.innerHTML = `<div class="abc" data-row="${dataRow}">${booking.name} <span class="abc-q"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-group" class="svg-inline--fa fa-user-group fa-2xs " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"></path></svg><span>${booking.quantity} </span></span></div>`
          });

      }, [filteredBookings]);      

    return (
        <> 
            {filteredBookings.length >= 0 && (
                <div className='confirmed-bookings'>
                    <div className="bookings-data-search">
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
                            <p className='booking-total'><FontAwesomeIcon icon={faUserGroup} size="2xs"/>  {totalConfirmedBookingsQuantity}</p>
                            </div>
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
                                                        {time.endsWith(":00") ? (
                                                            <td className="time-slot"><span>{time}</span></td>
                                                        ) : time.endsWith(":30") ? (
                                                            <td className="time-slot"><span className="dot middle-dot">•</span></td>
                                                        ) : (
                                                            <td className="time-slot"><span className="dot">•</span></td>
                                                        )}
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
                                            <tr className="table-grid-row">
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
                                                <tr className="table-grid-row">
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
                                                <tr className="table-grid-row">
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
                                                <tr className="table-grid-row">
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
                                                <tr className="table-grid-row">
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
                                        <table className="table-grid row-6">
                                            <tbody>
                                                <tr className="table-grid-row">
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
                                        <table className="table-grid row-7">
                                            <tbody>
                                                <tr className="table-grid-row">
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
                                        <table className="table-grid row-8">
                                            <tbody>
                                                <tr className="table-grid-row">
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
                                        <table className="table-grid row-9">
                                            <tbody>
                                                <tr className="table-grid-row">
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
                                        <table className="table-grid row-10">
                                            <tbody>
                                                <tr className="table-grid-row">
                                                {timeBlocks.map((time, index) => (
                                                    <React.Fragment key={index}>
                                                        <td className={`c ${time === '22:45' ? 'final-block' : 'last'}`} data-time={time} ></td>
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

export default BookingsCalendar


