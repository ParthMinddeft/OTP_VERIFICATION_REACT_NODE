import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();
  const userValid = () => {
    const token = localStorage.getItem('userdbtoken');
    if(token)
    {
      console.log('user valid')
    }
    else
    {
      navigate('*')
    }
  }
  useEffect(()=>{
    userValid();
  },[])
  return (
    <div>dashboard</div>
  )
}

export default Dashboard