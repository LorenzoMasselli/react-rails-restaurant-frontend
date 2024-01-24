import User from "./User";
import { render, screen } from '@testing-library/react' 


jest.mock("../login/login", () => {
    const Login = () => (
        <div>Your matcher for Admins Login here</div>
    )
    return Login
})
jest.mock("../PrivateText", () => {
    const PrivateText = () => (
        <div>Your matcher for Private Text here</div>
    )
    return PrivateText 
})
jest.mock("../Signup", () => {
    const Signup = () => (
        <div>Your matcher for Signup here</div>
    )
    return Signup 
})
jest.mock("../logout/logout", () => {
    const Logout = () => (
        <div>Your matcher for Logout here</div>
    )
    return Logout 
})

describe("User Component", () => {
    test("renders admin content when currUser is provided", () => {
      const currUser = { email: "admin@example.com" };
      render(<User currUser={currUser} />);
      // The content displayed when currUser is provided
      expect(screen.getByText(`Hello Admin: ${currUser.email}`)).toBeInTheDocument();
      expect(screen.getByText("Your matcher for Private Text here")).toBeInTheDocument();
      expect(screen.getByText("Your matcher for Logout here")).toBeInTheDocument();
    });
  
    test("renders Login component when show is true", () => {
        const currUser = null;
        render(<User currUser={currUser} show={true} />);
        const expectedText = "Your matcher for Admins Login here";
        expect(screen.getByText(expectedText)).toBeInTheDocument(); // Update with your actual text or element
      });

  
    test("renders Login component when currUser is null", () => {
        const currUser = null;
        render(<User currUser={currUser} />);
        const expectedText = "Your matcher for Admins Login here";
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  });