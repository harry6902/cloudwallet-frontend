import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate= useNavigate();

  useEffect(() => {
   navigate("/signup")
  }, [])
  
  return (
    <div>
       Remo
    </div>
  )
}

export default Dashboard
