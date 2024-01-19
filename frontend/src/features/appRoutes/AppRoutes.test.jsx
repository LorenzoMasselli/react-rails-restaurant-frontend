import AppRoutes from './AppRoutes';
import { render, screen } from '@testing-library/react' 
import { MemoryRouter } from 'react-router-dom'

jest.mock("../bookings/pages/BookingsList", () => {
    const MockBookingsList = () => (
        <div>Your matcher for Bookings List here</div>
    )
    return MockBookingsList
})
jest.mock("../bookings/pages/BookingHomepage", () => {
    const MockBookingHomepage = () => (
        <div>Your matcher for Bookings Homepage here</div>
    )
    return MockBookingHomepage
})
jest.mock("../bookings/pages/BookingDetails", () => {
    const MockBookingDetails = () => (
        <div>Your matcher for Booking Details here</div>
    )
    return MockBookingDetails
})
jest.mock("../bookings/forms/NewBookingForm", () => {
    const MockNewBookingForm = () => (
        <div>Your matcher for Bookings New Form here</div>
    )
    return MockNewBookingForm
})
jest.mock("../bookings/forms/BookingEditForm", () => {
    const MockBookingEditForm = () => (
        <div>Your matcher for Bookings Edit Form here</div>
    )
    return MockBookingEditForm
})
jest.mock("../admin/PrivateText", () => {
    const PrivateText = () => (
        <div>Your matcher for Admins Private Text here</div>
    )
    return PrivateText
})
jest.mock("../admin/Signup", () => {
    const Signup = () => (
        <div>Your matcher for Admins Signup here</div>
    )
    return Signup
})
jest.mock("../admin/login/login", () => {
    const Login = () => (
        <div>Your matcher for Admins Login here</div>
    )
    return Login
})
jest.mock("../admin/logout/logout", () => {
    const Logout = () => (
        <div>Your matcher for Admins Logout here</div>
    )
    return Logout
})


describe("AppRoutes component", () => {
  const renderWithRouter = (ui, { initialEntries = ["/"],  ...options } = {}) => {
    return render(ui, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      ),
      ...options,
    });
  };

  test("Root path renders admin login", () => {
    renderWithRouter(<AppRoutes/>, { initialEntries: ["/react-rails-restaurant-frontend/"]});
    const expectedText = "Your matcher for Admins Login here"
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  })
  test("Root path renders homepage", () => {
    renderWithRouter(<AppRoutes/>, { initialEntries: ["/react-rails-restaurant-frontend/home"]});
    const expectedText = "Your matcher for Bookings Homepage here"
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  })
  test("Root path renders admin login when currUser.admin is false", () => {
    renderWithRouter(<AppRoutes currUser={false} />, { initialEntries: ["/react-rails-restaurant-frontend/bookings"]});
    const expectedText = "Your matcher for Admins Login here";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  test("Root path renders bookings list when currUser.admin is true", () => {
    renderWithRouter(<AppRoutes currUser={{ admin: true }} />, { initialEntries: ["/react-rails-restaurant-frontend/bookings"]});
    const expectedText = "Your matcher for Bookings List here";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

});