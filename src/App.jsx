import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp.jsx'
import Payment from './components/Payment.jsx'
import Dashboard from './components/Dashboard.jsx'
import SignIn from './components/SignIn.jsx'
import { useCookies } from 'react-cookie'

function App() {
  const [count, setCount] = useState(0)
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  return (
   <>
   <Routes>
    <Route path="/" element={<Dashboard/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path='/signin' element={<SignIn cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}/>} />
    <Route path="/transfer" element={<Payment cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}/>} />
   </Routes>
   
   </>
  )
}

export default App
