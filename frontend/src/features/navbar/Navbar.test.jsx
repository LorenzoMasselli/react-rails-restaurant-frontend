import Navbar from './Navbar'
import {render} from '@testing-library/react' 

describe("Navbar Component", () => {
    const renderNavbar = () => {
        render(<Navbar />)
    }
    test("renders all links", () => {
        //  render the navbar 
        renderNavbar()
        // expect the links to be there
    })
})