// eslint-disable-next-line no-unused-vars
import  { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from 'react-router-dom'
import './BookingForms.css'

function BookingEditForm({bookingId, onFormClose, onUpdateBooking }) {
    const [booking, setBooking] = useState(null)
    const { id } = useParams();
    const [, setLoading] = useState(true);
    const [, setError] = useState(null)
    // const navigate = useNavigate()

    useEffect(() => {
        const fetchCurrentBooking = async () => {
          try {
            const response = await fetch(
              `https://restaurant-rails-api-app-e94a97c38b74.herokuapp.com//api/v1/bookings/${bookingId}`
            );
    
            if (response.ok) {
              const json = await response.json();
              setBooking(json);
            } else {
              throw response;
            }
          } catch (e) {
            setError('An error occurred while fetching the booking');
            console.error('An error occurred while fetching the booking:', e);
          } finally {
            setLoading(false);
          }
        };
    
        if (bookingId) {
          fetchCurrentBooking();
        }
      }, [bookingId]);
    
    
      const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://restaurant-rails-api-app-e94a97c38b74.herokuapp.com//api/v1/bookings/${bookingId}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name: booking.name,
                    phone: booking.phone,
                    email: booking.email,
                    date: booking.date,
                    time: booking.time,
                    quantity: booking.quantity,
                    note: booking.note,
                    confirmed: booking.confirmed,
                })
            })

            if (response.ok) {
                const updatedBooking = await response.json();
                onFormClose();
                onUpdateBooking(updatedBooking);
            } else {
                throw response
            }
        } catch(e) {
            console.log("An error occured")
        }
      }
    
    if (!booking) return <h2>Loading...</h2>  

    return (
        <div className='align-form'>  
            <div className='form-container'>
                <h2>Edit Booking</h2>
                <form onSubmit={handleSubmit} className='edit-form'>
                    <div className="edit">
                        <label htmlFor="name-input">Name: </label>
                        <input 
                            type="text" 
                            id="name-input"
                            value={booking.name}
                            onChange={(e) => setBooking({...booking, name: e.target.value})}
                            />
                    </div>
                    <div className="edit">
                        <label htmlFor="phone-input">Phone: </label>
                        <input 
                            type="text" 
                            id="phone-input"
                            value={booking.phone}
                            onChange={(e) => setBooking({...booking, phone: e.target.value})}
                            />
                    </div>
                    <div className="edit">
                        <label htmlFor="email-input">Email:</label>
                        <input 
                            type="text" 
                            id="email-input"
                            value={booking.email}
                            onChange={(e) => setBooking({...booking, email: e.target.value})}
                            />
                    </div>
                    <div className="date-time-edit">
                        <div className="date">
                            <label htmlFor="date-input">Date:</label>
                            <input 
                                type="date" 
                                id="date-input"
                                value={booking.date}
                                onChange={(e) => setBooking({...booking, date: e.target.value})}
                                />
                        </div>
                        <div className="edit">
                            <label htmlFor="time-input">Time: </label>
                            <select 
                                type="text" 
                                id="time-input"
                                value={booking.time}
                                onChange={(e) => setBooking({...booking, time: e.target.value})}
                            >
                                <option value="12:00">12:00</option>
                                <option value="12:30">12:30</option>
                                <option value="13:00">13:00</option>
                                <option value="13:30">13:30</option>
                                <option value="14:00">14:00</option>
                                <option value="14:30">14:30</option>
                                <option value="15:00">15:00</option>
                                <option value="15:30">15:30</option>
                                <option value="16:00">16:00</option>
                                <option value="16:30">16:30</option>
                                <option value="17:00">17:00</option>
                                <option value="17:30">17:30</option>
                                <option value="18:00">18:00</option>
                                <option value="18:30">18:30</option>
                                <option value="19:00">19:00</option>
                                <option value="19:30">19:30</option>
                                <option value="20:00">20:00</option>
                                <option value="20:30">20:30</option>
                                <option value="21:00">21:00</option>
                            </select>
                        </div>
                    </div>
                    <div className="date-time-edit">
                        <div className="edit">
                            <label htmlFor="confirmed-input" className='booking-confirmation-label'>Booking confirmation:</label>
                            <select 
                                type="text"
                                id="confirmed-input"
                                value={booking.confirmed}
                                onChange={(e) => setBooking({...booking, confirmed: e.target.value})}                            
                            >
                                <option value="false">False</option>
                                <option value="true">True</option>
                            </select>
                        </div>
                        <div className="edit">
                            <label htmlFor="quantity-input">Number of people: </label>
                            <select 
                                type="text"
                                id="quantity-input"
                                value={booking.quantity}
                                onChange={(e) => setBooking({...booking, quantity: Number(e.target.value)})}                            
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    </div>
                    <div className="edit">
                        <label htmlFor="note-input">Notes: </label>
                        <textarea 
                            id="note-input"
                            value={booking.note}
                            onChange={(e) => setBooking({...booking, note: e.target.value})}
                            placeholder="Dietary Restrictions / Reservation Notes"
                            />
                    </div>
                    <div className='edit-form-button-container'>
                        <button className="form-button" type="submit">Save your edit</button>
                    </div>
            </form>
            </div>
        </div>
    )
}

export default BookingEditForm
