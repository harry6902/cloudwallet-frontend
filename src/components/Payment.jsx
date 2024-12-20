import React, { useEffect, useState } from 'react'
import {SystemProgram,Transaction,Connection, LAMPORTS_PER_SOL,PublicKey} from '@solana/web3.js'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const connection=new Connection("https://api.mainnet-beta.solana.com")


const Payment = ({cookies,setCookie,removeCookie}) => {

  const [decodeToken,setDecodeToken]= useState({});
  const [seeBalance,setSeeBalance]= useState(false);
  const [balance,setBalance]= useState();
  const [loader,setLoader]= useState(false);
  const [recepient, setRecepient]= useState("");
  const [amount,setAmount]= useState("")
  const navigate= useNavigate()
  const [afterPayment,setAfterPayment]= useState(false);
  const [loader2,setLoader2]=useState(false);

  useEffect(() => {

    if(!cookies.accessToken){
      navigate("/signin")
    }

    const data=jwt.decode(cookies.accessToken);
    setDecodeToken(data);
  }, [])

  const setCheckBalance =async()=>{
    setSeeBalance(true);
    setLoader(true);
    const key=decodeToken.id.publicKey;
    const balance=await connection.getBalance(new PublicKey(key))/LAMPORTS_PER_SOL;
    setBalance(balance);
    setLoader(false);

  }

  const handleback =()=>{
    setLoader2(false);
    setAfterPayment(false);
  }

  const handleLogout =()=>{

    removeCookie('accessToken',{path:'/'})
    navigate("/signin")
  }
  
 
  const sendSol =async()=>{
    setLoader2(true)
    setRecepient("");
    setAmount("");
    setSeeBalance(false);
    const fromPubKey=new PublicKey(decodeToken.id.publicKey)

    const ix= SystemProgram.transfer({
      fromPubkey: fromPubKey,
      toPubkey: new PublicKey(recepient),
      lamports: amount * LAMPORTS_PER_SOL
    })
    const tx= new Transaction().add(ix)

    const {blockhash}=await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash
    tx.feePayer=fromPubKey

    const serializedTx = tx.serialize({
      requireAllSignatures:false,
      verifySignatures:false
    });

    await axios.post('https://cloudwallet-backend.vercel.app/api/v1/txn/sign',{
      message:serializedTx,
      retry:false
    },
  {
    headers:{
      Authorization:cookies.accessToken
    }
  })

  setAfterPayment(true);


  }
  return (
    <>
    {loader2 ? (
    <>
    {afterPayment? <>
      <div className='bg-purple-500 h-screen flex justify-center items-center'>
      <div className='h-[50vh] w-[95vw] lg:w-[50vw] rounded-2xl flex flex-col justify-center items-center gap-5 bg-white relative'>
      <svg 
      className="w-20 h-20 text-green-500" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <p className='font-bold text-green-600'>Payment Successful</p>
    <button onClick={handleback} className='px-4 py-2 text-white bg-purple-400 rounded-xl'>Back</button>
    </div>
    </div>
    
    </>:<>
      <div className='bg-purple-500 h-screen flex justify-center items-center'>
    <div className='h-[50vh] w-[95vw] lg:w-[50vw] rounded-2xl flex flex-col justify-center items-center gap-5 bg-white relative'>
    <div className="w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

    </div>
    </>}
    
    </>):
    <>
     <div className='bg-purple-500 h-screen flex justify-center items-center'>
  
  <div className='h-[50vh] w-[95vw] lg:w-[50vw] rounded-2xl flex flex-col justify-center items-center gap-5 bg-white relative'>
  <div className='absolute right-4 top-3'>
  <svg className='cursor-pointer' onClick={handleLogout} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.25 9V5.25C8.25 4.65326 8.48705 4.08097 8.90901 3.65901C9.33097 3.23705 9.90326 3 10.5 3H16.5C17.0967 3 17.669 3.23705 18.091 3.65901C18.5129 4.08097 18.75 4.65326 18.75 5.25V18.75C18.75 19.3467 18.5129 19.919 18.091 20.341C17.669 20.7629 17.0967 21 16.5 21H10.5C9.90326 21 9.33097 20.7629 8.90901 20.341C8.48705 19.919 8.25 19.3467 8.25 18.75V15M5.25 15L2.25 12M2.25 12L5.25 9M2.25 12H15" stroke="#a46ede" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

  </div>
    {decodeToken.id &&
    <div className='flex flex-col items-center'>
  
    <h1 className='text-purple-500 text-3xl font-bold'>Your Wallet</h1>
     <p>{decodeToken.id.publicKey}</p> 
     
    </div>
}
    <input value={recepient} onChange={e=>setRecepient(e.target.value)} className='w-[80vw] lg:w-2/3 border border-black p-1 rounded-lg' type="text" placeholder='Enter the recepient address'  />
    <input value={amount} onChange={e=>setAmount(e.target.value)} className='w-[80vw] lg:w-2/3 border border-black p-1 rounded-lg' type="text" placeholder='Enter SOl' />
    <div className='flex flex-col justify-center items-center gap-2'>
    {seeBalance ? (loader ? <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500 border-opacity-90"></div>: <p className='text-black font-semibold'>{balance} SOL</p>):  <p className='text-purple-500 cursor-pointer' onClick={setCheckBalance}>Check Balance?</p>}
   
    <button className='p-2 bg-purple-400 rounded-md cursor-pointer' onClick={sendSol}>Submit</button>
    </div>
    
  </div>
  </div>
    </>
    }
   
    </>
  )
}

export default Payment
