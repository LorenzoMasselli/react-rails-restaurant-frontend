import Navbar from './Navbar'
import { render, screen, fireEvent} from '@testing-library/react' 
import { MemoryRouter } from 'react-router-dom'

describe("Navbar Component", () => {
  const renderNavbar = (currUser, setActiveForm) => {
    render(<Navbar currUser={currUser} setActiveForm={setActiveForm} />, { wrapper: MemoryRouter });
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

  test("calls setActiveForm when 'Book' button is clicked", () => {
    // Mock the setActiveForm function
    const mockSetActiveForm = jest.fn();
    // Render the navbar with a mock setActiveForm function
    renderNavbar({ admin: true }, mockSetActiveForm);
    // Find the "Book" button and click it
    fireEvent.click(screen.getByText("Book"));
    // Expect setActiveForm to have been called with true
    expect(mockSetActiveForm).toHaveBeenCalledWith(true);
  });

  test("displays navbar when pathname is not /react-rails-restaurant-frontend/bookings", () => {
    renderNavbar(null);
    expect(screen.getByRole('navigation')).toBeVisible();
});

  test("hides navbar when pathname is /react-rails-restaurant-frontend/bookings", () => {
    render(
        <MemoryRouter initialEntries={['/react-rails-restaurant-frontend/bookings']}>
            <Navbar currUser={null} setActiveForm={() => {}} />
        </MemoryRouter>
    );
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  test("renders title with isTitleAtTop prop", () => {
    renderNavbar({ admin: true }, () => {}, { isTitleAtTop: true });
    expect(screen.getByText("Savoré")).toBeInTheDocument();
  });

  test("doesnt renders title with isTitleAtTop prop", () => {
    renderNavbar({ admin: true }, () => {}, { isTitleAtTop: false });
    expect(screen.queryByRole("title-navigation")).not.toBeInTheDocument();
  });


  test("navbar has correct background color when isHomeTwoAtTop is true", () => {
    renderNavbar(null, () => {}, { isHomeTwoAtTop: true });
  
    const navbar = screen.getByRole('navigation-1');
    expect(navbar).toHaveStyle('backgroundColor: rgba(255, 255, 255)');
  });

  test("navbar has correct background color when isHomeTwoAtTop is false", () => {
    renderNavbar(null, () => {}, { isHomeTwoAtTop: true });
  
    const navbar = screen.getByRole('navigation-1');
    expect(navbar).toHaveStyle('backgroundColor: rgba(255, 255, 255, 0.5)');
  });
  
  
});