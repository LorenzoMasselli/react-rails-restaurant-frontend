import {React, useEffect} from 'react';
// import PropTypes from 'prop-types';
import {Route, Routes, useNavigate} from 'react-router-dom'
import BookingsList from '../bookings/pages/BookingsList'
import BookingDetails from '../bookings/pages/BookingDetails'
import NewBookingFormPage from '../bookings/pages/NewBookingFormPage'
import BookingEditForm from '../bookings/forms/BookingEditForm';
import BookingHomepage from '../bookings/pages/BookingHomepage'
import User from '../admin/user/User'
function NotFoundRedirect() {
    const navigate = useNavigate();
    useEffect(() => {
      navigate('/react-rails-restaurant-frontend/admin');
    }, [navigate]);

    return null;
  }
// eslint-disable-next-line react/prop-types
function AppRoutes({currUser, setCurrUser, isTitleAtTop, handleTitleAtTopChange, handleScrollPosition, handleHomeTwoAtTopChange}) {    
    return (
        <Routes>
            <Route path="/react-rails-restaurant-frontend/" index element={ <User currUser={currUser} setCurrUser={setCurrUser} />} /> 
            <Route path="/react-rails-restaurant-frontend/home"  element={<BookingHomepage isTitleAtTop={isTitleAtTop} handleTitleAtTopChange={handleTitleAtTopChange}  handleScrollPosition={handleScrollPosition} handleHomeTwoAtTopChange={handleHomeTwoAtTopChange}/> } /> 
            {currUser && currUser.admin ? (
                <>
                    <Route path="/react-rails-restaurant-frontend/bookings" element={<BookingsList currUser={currUser} setCurrUser={setCurrUser} />} /> 
                    <Route path="/react-rails-restaurant-frontend/bookings/:id" element={<BookingDetails />} /> 
                    <Route path="/react-rails-restaurant-frontend/bookings/:id/edit" element={<BookingEditForm />} /> 
    
                </>
            ): null}
            <Route path="/react-rails-restaurant-frontend/new" element={<NewBookingFormPage currUser={currUser} setCurrUser={setCurrUser} />} /> 
            <Route path="/react-rails-restaurant-frontend/admin" element={ <User currUser={currUser} setCurrUser={setCurrUser} />} /> 
            <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
    )
}

// AppRoutes.propTypes = {
//     currUser: PropTypes.object, 
//     setCurrUser: PropTypes.func.isRequired, 
//   };

export default AppRoutes