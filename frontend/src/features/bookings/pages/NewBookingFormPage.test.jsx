import NewBookingFormPage from "./NewBookingFormPage";
import { render } from '@testing-library/react' 
import { MemoryRouter } from 'react-router-dom'


describe("New Booking form page", () => {
    const renderNewBookingFormPage = (currUser, setActiveForm) => {
      render(<NewBookingFormPage currUser={currUser} setActiveForm={setActiveForm} />, { wrapper: MemoryRouter });
    };

    test('renders without errors', () => {
        renderNewBookingFormPage();
        expect(document.querySelector('.form-page-container')).toBeInTheDocument();
        expect(document.querySelector('.form-page')).toBeInTheDocument();
      });
});