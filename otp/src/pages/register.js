import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { registerfunction } from '../services/api';
import "../styles/mix.css"
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [passhow,setPassShow] = useState(false);
  const [inputdata,setInputdata] = useState({
    fname:"",
    email:"",
    password:""
  });

  const navigate = useNavigate()

  console.log(inputdata)

  const handleChange = (e) => {
    const {name,value} = e.target;
    setInputdata({...inputdata,[name]:value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {fname,email,password} = inputdata;
    if(fname === "")
    {
      toast.error("Enter Your Name")
    }
    else if(email === "")
    {
      toast.error("Enter Your Email")
    }
    else if(!email.includes("@")){
      toast.error("Enter Valid Email")
    }
    else if(password === "")
    {
      toast.error("Enter Valid Password")
    }
    else if(password.length < 6)
    {
      toast.error("Password length minimum 6 character")
    }
    else
    {
      const responce = await registerfunction(inputdata);
      if(responce.status === 200)
      {
        setInputdata({...inputdata,fname:'',email:'',password:''});
        navigate('/')
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
              Please SignUp
            </p>
          </div>
          <form>
          <div className='form_input'>
            <label htmlFor='fname'>Name</label>
            <input type='text' name='fname' id='' onChange={handleChange} placeholder='Enter Your Name'></input>
          </div>
          <div className='form_input'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='' onChange={handleChange} placeholder='Enter Your Email Address'></input>
          </div>
          <div className='form_input'>
            <label htmlFor='password'>Password</label>
            <div className='two'>
              <input type={!passhow ? "password" : "text"} name='password' id='' onChange={handleChange} placeholder='Enter Your Password'></input>
            <div className='showpass' onClick={()=>setPassShow(!passhow)}>
              {!passhow ? "Show" : "Hide"}
            </div>
            </div>
          </div>
          <button className='btn' onClick={handleSubmit}>SignUp</button>
          <p>
            Don't have and account
          </p>
          </form>
        </div>
        <ToastContainer />
    </section>
    </>
  )
}

export default Register