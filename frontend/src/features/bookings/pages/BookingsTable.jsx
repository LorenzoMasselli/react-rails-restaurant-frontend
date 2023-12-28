import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,  faXmark, faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import './BookingPages.css'
import NewBookingForm from '../forms/NewBookingForm'

function BookingsTable({ bookings, confirmBooking, deleteBooking }){
    const [currentPage, setCurrentPage] = useState(1);
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

    // New code for pagination
    const itemsPerPage = 10; // You can adjust this value based on your preferences

    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBookings = filteredBookings.reverse().slice(startIndex, endIndex);

    return (
        <section className="table-container">
            {activeForm ? <div className="table-new-booking-form"><NewBookingForm /><FontAwesomeIcon icon={faCircleXmark} style={{color: "#ffffff",}} className="form-close" onClick={() => setActiveForm(false)}/></div> : <></>}
            
            <h2 className="dashboard-heading">Dashboard</h2>
            <div className="dashboard-filters">
                <div className="filter-container">
                    <div className="name-search">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input
                            type="text"
                            value={nameSearch}
                            onChange={(e) => setNameSearch(e.target.value)}
                            placeholder="Search by name..."
                            className="name-input"
                        />
                    </div>
                    <div className="date-filter">
                        <p>Select a Date:</p>
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="date-input"
                        />
                    </div>
                </div>
                    <p className="add-button" onClick={() => setActiveForm(true)}>Add +</p>
            </div>
            <table>
                <thead className="table-header">
                <tr >
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
                {currentBookings.map((booking) => (
                    <tr key={booking.id} className="table-row">
                    <td>{capitalizeFirstLetter(booking.name)}</td>
                    <td>{booking.confirmed ? <p className="status-confirmed">Confirmed</p> : <p className="status-pending">Pending</p>}</td>
                    <td><p className="date-label">{booking.date}</p></td>
                    <td><p className="guests-count">{booking.quantity}</p></td>
                    <td>{booking.time}</td>
                    <td>{booking.email}</td>
                    <td>{booking.confirmed ? "" : <p className="confirm-icon"><FontAwesomeIcon onClick={() => confirmBooking(booking)} icon={faCheck} style={{color: "23d100", paddingRight: "1rem"}}/></p> } </td>
                    <td><p className="confirm-icon"><FontAwesomeIcon onClick={() => deleteBooking(booking.id)} icon={faXmark} style={{color: "d10000", paddingRight: "1rem"}}/></p></td>
                    <td>{booking.note ? <p className="note-label">{booking.note}</p> : <p className="no-instructions">No instructions</p>}</td>
                    </tr>
                    
                ))}
                </tbody>
            </table>
            {totalPages > 1 && (
                <div className="pagination">
                {currentPage > 1 && (
                  <p onClick={() => setCurrentPage(currentPage - 1)} className="pointer">
                    &lt; Prev
                  </p>
                )}
                <p>{`${currentPage} of ${totalPages}`}</p>
                {currentPage < totalPages && (
                  <p onClick={() => setCurrentPage(currentPage + 1)} className="pointer">
                    Next &gt;
                  </p>
                )}
              </div>
            )}
        </section>
    )
}

export default BookingsTable