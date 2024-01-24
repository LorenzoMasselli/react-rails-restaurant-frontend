// import { useState } from "react";
// import Signup from "../Signup";
import Login from '../login/Login'
import Logout from '../logout/Logout'
import PrivateText from '../PrivateText'
import './User.css'

const User = ({currUser, setCurrUser}) => {
    // const [show, setShow] = useState(true)
    if(currUser) 
        return (
            <div className="user">
                <div className="user-container">
                    <h2>Hello Admin: {currUser.email}</h2>
                    <PrivateText currUser={currUser}/>
                    <Logout setCurrUser={setCurrUser}/>
                </div>
                
            </div>
        )
    return (
        <div>
            <Login setCurrUser={setCurrUser} />  
            {/* { show?
                <Login setCurrUser={setCurrUser} />  
                :
                <Signup setCurrUser={setCurrUser}  setShow={setShow} />
            } */}
        </div>
    )
}
export default User