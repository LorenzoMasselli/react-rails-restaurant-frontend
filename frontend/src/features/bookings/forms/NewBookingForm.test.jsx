import NewBookingForm from './NewBookingForm';
import { render, fireEvent, waitFor } from '@testing-library/react' 
import { MemoryRouter } from 'react-router-dom'

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: 1, name: 'Mock Booking' }), 
  })
);
describe('New Booking Form', () => {
  const renderNewBookingForm = (currUser, setCurrUser, setBookings, onNewFormClose, onNewFormCloseHome) => {
    render(
      <NewBookingForm
        currUser={currUser}
        setCurrUser={setCurrUser}
        setBookings={setBookings}
        onNewFormClose={onNewFormClose}
        onNewFormCloseHome={onNewFormCloseHome}
      />,
      { wrapper: MemoryRouter }
    );
  };

  test('renders without errors', () => {
    renderNewBookingForm();
    // Add assertions based on your component structure
    expect(document.querySelector('.new-booking-form-container')).toBeInTheDocument();
    expect(document.querySelector('.form-container-heading')).toBeInTheDocument();
    // Add more assertions as needed
  });

  test('submits the form correctly', async () => {
    const setBookingsMock = jest.fn();
    const onNewFormCloseMock = jest.fn();
    const onNewFormCloseHomeMock = jest.fn();

    renderNewBookingForm(null, null, setBookingsMock, onNewFormCloseMock, onNewFormCloseHomeMock);

    // Fill out the form
    fireEvent.change(document.getElementById('nameInput'), { target: { value: 'John Doe' } });
    fireEvent.change(document.getElementById('phoneInput'), { target: { value: '1234567890' } });
    fireEvent.change(document.getElementById('emailInput'), { target: { value: 'john@example.com' } });
    fireEvent.change(document.getElementById('dateInput'), { target: { value: '2024-01-25' } });
    fireEvent.change(document.getElementById('quantityInput'), { target: { value: '2' } });
    fireEvent.change(document.getElementById('timeInput'), { target: { value: '12:00' } });
    fireEvent.change(document.getElementById('noteInput'), { target: { value: 'No special requests' } });

    // Submit the form
    fireEvent.click(document.querySelector('.form-button'));

    // Wait for the form submission to complete
    await waitFor(() => {
      // Add assertions based on your component's behavior after form submission
      expect(setBookingsMock).toHaveBeenCalled();
      expect(onNewFormCloseMock).toHaveBeenCalled();
      expect(onNewFormCloseHomeMock).toHaveBeenCalled();
      // Add more assertions as needed
    });
  });

  
});
