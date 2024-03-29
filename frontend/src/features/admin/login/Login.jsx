import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import './Login.css'
import PropTypes from 'prop-types';

const Login = ({setCurrUser}) =>{
  const navigate = useNavigate()
  const formRef = useRef()
  const login = async (userInfo, setCurrUser)=>{
    try{
        const response = await fetch("https://restaurant-rails-api-app-e94a97c38b74.herokuapp.com//login", {
            method: "post",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        const data = await response.json()
        if (response.ok) {
          localStorage.setItem("token", response.headers.get("Authorization"))
          setCurrUser(data)        
          navigate('/react-rails-restaurant-frontend/bookings')
        } else {
          throw data.error
        }
    } catch(error) {
       console.log("error", error)
    }
}
  const handleSubmit = e => {
    e.preventDefault()
      const formData = new FormData(formRef.current)
      const data = Object.fromEntries(formData)
      const userInfo = {
        "user":{ email: data.email, password: data.password }
      }
      login(userInfo, setCurrUser)
      // e.target.reset()
  }

  return(
    <div className="login-form">
      <div className="login-form-container">
        <h2 className="login-title">Admin Login</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <input type="email" name='email' placeholder="email" className="login-input" defaultValue="user1@test.com"/>
          <br/>
          <input type="password" name='password' placeholder="password" className="login-input" defaultValue="password"/>
          <br/>
          <input type='submit' value="Login"  className="login-button"/>
        </form>
        <br />
      </div>
      {/* <div>Not registered yet, <a href="#signup" onClick={handleClick} >Signup</a> </div> */}
    </div>
  )
}

// Login.propTypes = {
//     setCurrUser: PropTypes.func.isRequired,
//     setShow: PropTypes.func.isRequired,
//   };
export default Login