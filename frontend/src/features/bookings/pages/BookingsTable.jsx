import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,  faXmark } from '@fortawesome/free-solid-svg-icons'

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
        <>
            <h2>Bookings Table</h2>
            <div>
                <label>
                Filter by Date:
                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                />
                </label>
                <label>
                Search by Name:
                <input
                    type="text"
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                />
                </label>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Status</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Guests</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Action</th>
                    <th>Notes</th>
                </tr>
                </thead>
                <tbody>
                {filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                    <td>{booking.confirmed ? "Confirmed" : "Unconfirmed"}</td>
                    <td>{capitalizeFirstLetter(booking.name)}</td>
                    <td>{booking.email}</td>
                    <td>{booking.quantity}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td><FontAwesomeIcon icon={faCheck} style={{color: "23d100"}}/> |  |  | <FontAwesomeIcon icon={faXmark} style={{color: "d10000"}}/></td>
                    <td>{booking.note ? booking.note : " "}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default BookingsTable