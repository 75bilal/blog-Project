import React from 'react'
import { RiHome4Fill } from "react-icons/ri";
import { MdOutlineSubscriptions } from "react-icons/md";
import { IoChatbox, IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
<div className='hidden sm:flex w-20 h-screen bg-[#1f1f1f] border-r border-gray-700 fixed top-0 left-0 flex-col items-center py-6 text-white'>
      
      {/* Logo or Title */}
      <h2 className="text-xl text-start font-bold">MB</h2>

      {/* Icons List */}
      <div className='flex flex-col pt-12 gap-12 text-2xl items-center'>
        <Link to="/" className='cursor-pointer hover:text-indigo-400'>
          <RiHome4Fill />
        </Link>
        <Link to="/subscriptions" className='cursor-pointer hover:text-indigo-400'>
          <MdOutlineSubscriptions />
        </Link>
        <Link to="/chat" className='cursor-pointer hover:text-indigo-400'>
          <IoChatbox />
        </Link>
        <Link to="/search" className='cursor-pointer hover:text-indigo-400'>
          <IoSearch />
        </Link>
      </div>
        
         <div className='pt-8 '>
            <button className='bg-[#5b53f5]  hover:bg-[#6366f1] text-white text-2xl px-4 py-2 rounded-lg'>+</button>
         </div>
    </div>
  )
}

export default Sidebar
