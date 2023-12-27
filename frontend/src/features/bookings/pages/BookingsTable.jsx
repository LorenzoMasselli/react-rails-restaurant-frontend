import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,  faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './BookingPages.css'

function BookingsTable({ bookings }){

    const [dateFilter, setDateFilter] = useState("");
    const [nameSearch, setNameSearch] = useState("");


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    const filteredBookings = bookings.filter((booking) => {
    const isDateMatch = dateFilter === "" || booking.date === dateFilter;
    const isNameMatch =
        nameSearch === "" ||
        booking.name.toLowerCase().includes(nameSearch.toLowerCase());

    return isDateMatch && isNameMatch;
    });

    return (
        <section className="table-container">
            <h2>Bookings Table</h2>
            <div className="table-filters">
                <div className="t-se">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input
                        type="text"
                        value={nameSearch}
                        onChange={(e) => setNameSearch(e.target.value)}
                        placeholder="Search by name..."
                        className="t-ws"
                    />
                </div>
                    <div className="t-fbd">
                        <p>Select a Date:</p>
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="t-fd"
                        />
                    </div>
                    <p className="t-add">Add +</p>
            </div>
            <table>
                <thead>
                <tr className="table-headers">
                    <th>Full Name</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Guests</th>
                    <th>Time</th>
                    <th>Contact</th>
                    <th>Confirm</th>
                    <th>Delete</th>
                    <th>Notes</th>
                </tr>
                </thead>
                <tbody>
                {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="table-content">
                    <td>{capitalizeFirstLetter(booking.name)}</td>
                    <td>{booking.confirmed ? <p className="table-confirmed">Confirmed</p> : <p className="table-pending">Pending</p>}</td>
                    <td><p className="al-l">{booking.date}</p></td>
                    <td><p className="al-c">{booking.quantity}</p></td>
                    <td>{booking.time}</td>
                    <td>{booking.email}</td>
                    <td>{booking.confirmed ? "" : <p className="tc-c"><FontAwesomeIcon icon={faCheck} style={{color: "23d100", paddingRight: "1rem"}}/></p> } </td>
                    <td><p className="tc-c"><FontAwesomeIcon icon={faXmark} style={{color: "d10000", paddingRight: "1rem"}}/></p></td>
                    <td>{booking.note ? <p className="al-n">{booking.note}</p> : <p className="al-i">No instructions</p>}</td>
                    </tr>
                    
                ))}
                </tbody>
            </table>
        </section>
    )
}

export default BookingsTable