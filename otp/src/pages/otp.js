import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { userVerify } from '../services/api';

const Otp = () => {
  const [otp,setOtp] = useState("");
  // console.log(otp)
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();

  const LoginUser = async(e) => {
    e.preventDefault();

    if(otp === "")
    {
      toast.error("Enter Your Otp")
    }
    else if(!/[^a-zA-Z]/.test(otp))
    {
      toast.error("Enter Valid Otp")
    }
    else if(otp.length < 6)
    {
      toast.error("Otp Length minimum 6 digit")
    }
    else
    {
      const data = {
        otp,email:location.state
      }
      const responce = await userVerify(data);
      if(responce.status === 200)
      {
        localStorage.setItem('userdbtoken',responce.data.userToken);
        toast.success(responce.data.message);
        setTimeout(()=>{
          navigate('/dashboard')
        },5000)
      }
      else
      {
        toast.error(responce.responce.data.error)
      }
    }
  }
  return (
    <>
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>
              PLEASE ENTER YOUR OTP HERE
            </h1>
          </div>
          <form>
            <div className='form_input'>
              <label htmlFor='otp'>OTP</label>
              <input type='text' name='otp' id='' onChange={(e) => setOtp(e.target.value)} placeholder='Enter Your Otp Here'></input>
            </div>
            <button className='btn' onClick={LoginUser}>Submit</button>
          </form>
        </div>
        <ToastContainer/>
      </section>
    </>
  )
}

export default Otp