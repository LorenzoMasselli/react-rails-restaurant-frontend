import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,  faXmark, faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import './BookingPages.css'
import NewBookingForm from '../forms/NewBookingForm'

function BookingsTable({ bookings, confirmBooking, deleteBooking }){

    const [dateFilter, setDateFilter] = useState("");
    const [nameSearch, setNameSearch] = useState("");
    const [activeForm, setActiveForm] = useState(false);


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
            {activeForm ? <div className="table-new-booking-form"><NewBookingForm /><FontAwesomeIcon icon={faCircleXmark} style={{color: "#ffffff",}} className="table-new-booking-form-close" onClick={() => setActiveForm(false)}/></div> : <></>}
            
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
                    <p className="t-add" onClick={() => setActiveForm(true)}>Add +</p>
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
                    <td>{booking.confirmed ? "" : <p className="tc-c"><FontAwesomeIcon onClick={() => confirmBooking(booking)} icon={faCheck} style={{color: "23d100", paddingRight: "1rem"}}/></p> } </td>
                    <td><p className="tc-c"><FontAwesomeIcon onClick={() => deleteBooking(booking.id)} icon={faXmark} style={{color: "d10000", paddingRight: "1rem"}}/></p></td>
                    <td>{booking.note ? <p className="al-n">{booking.note}</p> : <p className="al-i">No instructions</p>}</td>
                    </tr>
                    
                ))}
                </tbody>
            </table>
        </section>
    )
}

export default BookingsTable