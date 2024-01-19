import Navbar from './Navbar'
import { render, screen } from '@testing-library/react' 
import { MemoryRouter } from 'react-router-dom'

describe("Navbar Component", () => {
  const renderNavbar = (currUser) => {
    render(<Navbar currUser={currUser} />, { wrapper: MemoryRouter });
  };

  test("renders all links when user is an admin", () => {
    // Render the navbar with a user who is an admin
    renderNavbar({ admin: true });
    // Expect the "All Bookings" link to be there
    expect(screen.getByText("All bookings")).toBeInTheDocument();
  });

  test("does not render 'All Bookings' link when user is not an admin", () => {
    // Render the navbar with a user who is not an admin
    renderNavbar({ admin: false });
    // Expect the "All Bookings" link not to be present
    expect(screen.queryByText("All bookings")).toBeNull();
  });

  test("does not render 'All Bookings' link when user is not logged in", () => {
    // Render the navbar with no user
    renderNavbar(null);
    // Expect the "All Bookings" link not to be present
    expect(screen.queryByText("All bookings")).toBeNull();
  });
});