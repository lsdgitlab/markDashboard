import {React, useEffect, useState} from 'react';
import 'boxicons';
import CampaignDashBorad from '../pages/CampaignDashboard';
import { useNavigate } from 'react-router-dom';

export default function Login(){

    const initialValues = {username :"", password:""}
    const [formValues, setFormValues ] = useState(initialValues)
    const [formError, setFormError ] = useState({});
    const [isSubmit, setisSubmit] = useState(false);
    // const [isRedirect, setIsRedirect] = useState(false)
    const navigate = useNavigate()
    
    const handleChange = (eve)=>{
        const {name, value} = eve.target;
        setFormValues({...formValues, [name]:value})        
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setFormError(validate(formValues))
        setisSubmit(true)
    }
    const handelChangeRegister = () =>{
      navigate("/registeruser")
    }
    useEffect(() => {
      if (Object.keys(formError).length === 0 && isSubmit) {
          // if (formValues.username === "nishant@gmail.com" && formValues.password === "n1") {
          if (formValues.username === "n" && formValues.password === "n") {
              // setIsRedirect(true); 
              navigate("/dashboard")
          } else {
              setFormError({ general: "Username or password is incorrect" });
          }
      }
  }, [formError])

    const validate = (values)=>{
        const errors ={}
        // const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if(!values.username){
            errors.username = "Username is required"
        }
        // else if(!regex.test(values.username)){
        //   errors.username = "This is not valid user name"
        // }
        if(!values.password){
            errors.password = "Password is required"
        }
        return errors; // Add this line

    }

// if(isRedirect){
// return <CampaignDashBorad/>
// }
    return (
      <section className="login-wrapper">
        {/* <pre>{JSON.stringify(formValues, undefined, 2 )}</pre> */}
        <div className="lgnbx">
          <form onSubmit={handleSubmit}>
            <h1 className='logo'>
              <p>
                <img src="/img/logo.png" alt="Logo" />
                <span>Campaign Tracker</span>
                </p>
              
            </h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formValues.username}
                onChange={handleChange}
              />
              <box-icon type="solid" name="user" color="white"></box-icon>
              <p className='error'>{formError.username}</p>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
              <box-icon name="lock-alt" type="solid" color="white"></box-icon>
              <p className='error'>{formError.password}</p>
              <p className='error'>{formError.general}</p>
            </div>
           
            <div className="remember-forget">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="https://www.google.com/">Forgot password?</a>
            </div>
            <button type="submit" className="btn">
              Login
            </button>

            <div className="register-link">
              <p>
                Don't have an account?
                <br /> <a onClick={handelChangeRegister}>Register</a>
              </p>
            </div>
          </form>
        </div>
      </section>
    )

}