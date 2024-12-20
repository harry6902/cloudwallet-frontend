

import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = ({cookies,setCookie,removeCookie}) => {
    const navigate=useNavigate()
    const handleLogin =async()=>{

        const res= await axios.post("https://cloudwallet-backend.vercel.app/api/v1/signin",{username,password});

        const token = res.data.token;
        setCookie('accessToken', token, { path: '/', maxAge: 3600 });
        navigate("/transfer");


    }
    const [username,setUsername]= useState("")
  const [password,setPassword]=useState("")
  return (
    <div className='flex  justify-center'>

    <div className='w-2/5 hidden lg:flex lg:justify-center lg:items-center h-screen bg-purple-500'>
    <img className=' rounded-full' src="/assets/solana.jpeg" alt="" />
    </div>
    <div className='w-full lg:w-3/5 flex flex-col gap-4  items-center justify-center h-screen'>

    <h1 className='font-bold text-4xl'>SignIn</h1>
    <div className='flex flex-col justify-center'>
    <label className=' text-purple-500 w-[160px]' htmlFor="username">Username or email</label>
    <input value={username} onChange={e=>setUsername(e.target.value)} className='p-1 rounded-lg border border-black w-[250px]' type="text" id='username' placeholder='Enter your username' />
    </div>
    <div className='flex flex-col justify-center'>
    <label className=' text-purple-500 w-[160px]' htmlFor="password">Password</label>
    <input value={password} onChange={e=>setPassword(e.target.value)} className='p-1 rounded-lg border border-black w-[250px]' type="text" id='password' placeholder='Enter your password' />
    </div>
    <div className='w-[250px] flex flex-col items-center justify-center gap-3'>
      <button onClick={handleLogin}className='p-1 bg-purple-500 rounded-xl w-full'>LogIn</button>
      <div className=' text-xs text-gray-800 flex gap-2'>
        <p>Don't have an account?</p>
        <Link to="/signup" className='text-purple-500'>SignUp</Link>
      </div>
    </div>
    
      
    </div>
    
  </div> 
  )
}

export default SignIn
