
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

 


const SignUp = () => {

  const handleRegister =async()=>{

    let res = await axios.post("https://cloudwallet-backend-23ox.vercel.app/api/v1/signup", 
      { username, password, email },);


    setEmail("")
    setPassword("")
    setUsername("")
    navigate("/signin")

  }
  const [username,setUsername]= useState("")
  const [email,setEmail]= useState("")
  const [password,setPassword]=useState("")
  const navigate = useNavigate();
  return (
    <div className='flex  justify-center'>

      <div className='w-2/5 hidden lg:flex lg:justify-center lg:items-center h-screen bg-purple-500'>
      <img className=' rounded-full' src="/assets/solana.jpeg" alt="" />
      </div>
      <div className='w-full lg:w-3/5 flex flex-col gap-4  items-center justify-center h-screen'>

       <h1 className='font-bold text-4xl'>SignUp</h1>
      <div className='flex flex-col justify-center'>
      <label className=' text-purple-500 w-[80px]' htmlFor="username">Username</label>
      <input value={username} onChange={e=>setUsername(e.target.value)} className='p-1 rounded-lg border border-black w-[250px]' type="text" id='username' placeholder='Enter your username' />
      </div>
      <div className='flex flex-col justify-center'>
      <label className=' text-purple-500 w-[80px]' htmlFor="email">Email</label>
      <input value={email} onChange={e=>setEmail(e.target.value)} className='p-1 rounded-lg border border-black w-[250px]' type="email" id='email' placeholder='Enter your email' />
      </div>
      <div className='flex flex-col justify-center'>
      <label className=' text-purple-500 w-[80px]' htmlFor="password">Password</label>
      <input value={password} onChange={e=>setPassword(e.target.value)} className='p-1 rounded-lg border border-black w-[250px]' type="text" id='password' placeholder='Enter your password' />
      </div>
      <div className='w-[250px] flex flex-col items-center justify-center gap-3'>
        <button onClick={handleRegister} className='p-1 bg-purple-500 rounded-xl w-full'>Register</button>
        <div className=' text-xs text-gray-800 flex gap-2'>
          <p>Already an User?</p>
          <Link to="/signin" className='text-purple-500'>SignIn</Link>
        </div>
      </div>
      
        
      </div>
      
    </div>
  )
}

export default SignUp
