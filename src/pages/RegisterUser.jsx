import {React, useEffect, useState} from 'react';
import 'boxicons';
// import CampaignDashBorad from '../pages/CampaignDashboard';
import { useNavigate } from 'react-router-dom';

export default function Register(){
const navigate = useNavigate()
    
const handelChangeBack = () =>{
    navigate("/login")
  }
    return (
      <section className="login-wrapper">
        {/* <pre>{JSON.stringify(formValues, undefined, 2 )}</pre> */}
       
        <div className="lgnbx">
        <button onClick={handelChangeBack}>Back</button>
          <form >
            <h1 className='logo'>
              <p>
                <img src="/img/logo.png" alt="Logo" />
                <span>Register User</span>
                </p>
              
            </h1>
            {/* <div className="input-box">
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
            </div> */}
           
           
            <button type="submit" className="btn">
            Register
            </button>

           
          </form>
        </div>
      </section>
    )

}