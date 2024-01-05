import React from "react";
import './BookingPages.css'
import NewBookingForm from '../forms/NewBookingForm'

function NewBookingFormPage({currUser, setCurrUser}){


    return (
        <section className="form-page-container">
            <div className="form-page"><NewBookingForm currUser={currUser} setCurrUser={setCurrUser} /></div>
        </section>
    )
}

export default NewBookingFormPage