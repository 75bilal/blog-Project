import React ,  { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Herosection from './components/Herosection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-[#0e121e] min-h-screen overflow-x-hidden'>
   
  

     <Navbar/>
  
     <div className='flex pt-[60px]'>
     <Sidebar/>
    <div className='flex-1 md:ml-0 sm:ml-20 w-full'>
     <Herosection/>

    </div>
     </div>
    </div>
     
    </>
  )
}

export default App
