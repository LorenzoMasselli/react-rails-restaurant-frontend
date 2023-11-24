import React from 'react';
// import PropTypes from 'prop-types';
import {Route, Routes} from 'react-router-dom'
import BookingsList from '../bookings/pages/BookingsList'
import BookingDetails from '../bookings/pages/BookingDetails'
import NewBookingForm from '../bookings/forms/NewBookingForm'
import BookingEditForm from '../bookings/forms/BookingEditForm';
import BookingHomepage from '../bookings/pages/BookingHomepage'
import User from '../admin/user/User'

function AppRoutes({currUser, setCurrUser}) {
    
    return (
        <Routes>
            <Route path="/" index element={<BookingHomepage />} /> 
            <Route path="/react-rails-restaurant-frontend/" element={<BookingHomepage />} /> 
            {currUser && currUser.admin ? (
                <>
                    <Route path="/bookings" element={<BookingsList />} /> 
                    <Route path="/bookings/:id" element={<BookingDetails />} /> 
                    <Route path="/bookings/:id/edit" element={<BookingEditForm />} /> 
                </>
            ): null}
            <Route path="/new" element={<NewBookingForm currUser={currUser} setCurrUser={setCurrUser} />} /> 
            <Route path="/admin" element={ <User currUser={currUser} setCurrUser={setCurrUser} />} /> 
        </Routes>
    )
}

// AppRoutes.propTypes = {
//     currUser: PropTypes.object, 
//     setCurrUser: PropTypes.func.isRequired, 
//   };

export default AppRoutes