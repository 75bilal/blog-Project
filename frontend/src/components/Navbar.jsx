import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import SignInDialog from './SignInDialog';
import SignUpDialog from './SignUpDialog';
import Userdetail from './Userdetail';
const Navbar = () => {
  const [islogin, setIsLogin] = useState(false)
  const [openSignIn ,setOpenSignIn] = useState(false);
  const [openSignUp ,setOpenSignUp] = useState(false);
   useEffect(() =>{
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/check-auth', {
          credentials: 'include', 
        });
            const data = await res.json();
              setIsLogin(data.isLoggedIn);
                } catch (error) {
        console.log('Auth check failed:', error.message);
      }
    };
    checkAuth();
   } ,[])
  return (
    <div className='flex justify-between items-center ml-20 px-5 py-2 border-b border-gray-700 gap-6 bg-[#1a1a1a]/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50'>
      <div className='flex justify-center items-center'>
        <h1 className='text-white text-2xl text-center font-bold'>Home</h1>
      </div>

      <div className='bg-[#232525] rounded-lg w-full max-w-md hidden sm:block'>
        <input
          type='text'
          placeholder='Search here...'
          className='text-white bg-[#232525] outline-none px-4 py-2 w-full placeholder-gray-300'
        />
      </div>

      {islogin ? (
        <div className='flex items-center justify-center gap-4'>
          <button className='text-white rounded-md bg-[#5b53f5] hidden sm:block hover:bg-[#6366f1] px-2 py-1 font-semibold transition duration-300'>
            Dashboard
          </button>
              <Userdetail/>
        </div>
      ) : (
        <div className='flex items-center gap-4'>
         <SignInDialog
          open ={openSignIn} 
         setOpen={setOpenSignIn} 
         openSignUp = {() =>{
          setOpenSignIn(false)
          setOpenSignUp(true)
         }}
         setLogin={setIsLogin}
         />
         <SignUpDialog  open ={openSignUp} setOpen= {setOpenSignUp} setLogin={setIsLogin}/>
        </div>
      )}
    </div>
  )
}

export default Navbar
