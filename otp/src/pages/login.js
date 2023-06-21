import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { sentOtpFunction } from '../services/api';
import Spinner from 'react-bootstrap/Spinner';
import "../styles/mix.css"

const Login = () => {
  const [email,setEmail] = useState(null); 

  const [spiner,setSpiner] = useState(false);

  const navigate = useNavigate();
  
  const sendOtp = async(e) => {
    e.preventDefault();

    if(email === "")
    {
      toast.error("Enter Your Email");
    }
    else if(!email.includes("@")){
      toast.error("Enter Valid Email");
    }
    else
    {
      setSpiner(true)
      const data = {
        email:email
      }
      const responce = await sentOtpFunction(data);
      if(responce.status === 200)
      {
        setSpiner(false)
        navigate('/user/otp',{state:email})
      }
      else
      {
        toast.error(responce.responce.data.error);
      }
    }
  }
  return (
    <>
    <section>
      <div className='form_data'>
        <div className='form_heading'>
          <h1>
            Welcome
          </h1>
          <p>
            Please Login
          </p>
        </div>
        <form>
        <div className='form_input'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='' id='' onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Address'></input>
        </div>
        <button className='btn' onClick={sendOtp}>Login
        {
          spiner ? <span><Spinner animation="border" /></span> : ""
        }
        </button>
        <p>
          Don't have and account <NavLink to='/register'>SignUp</NavLink>
        </p>
        </form>
      </div>
      <ToastContainer />
    </section>
    </>
  )
}

export default Login