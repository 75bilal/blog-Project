import React from 'react'

const Categorybar = () => {
  return (
    <div className='px-12 sm:px-20'>
<ul className="flex  text-sm font-medium text-center text-gray-500 dark:text-gray-400">
    <li className="me-2">
        <a href="#" className="inline-block px-2 py-2 text-white bg-[#5b53f5]  hover:bg-[#6366f1]  rounded-lg " >Home</a>
    </li>
    <li className="me-2">
        <a href="#"  className="inline-block px-2 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Following</a>
    </li>
    <li className="me-2">
        <a href="#" className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">New BestSeller</a>
    </li>
    <li className="me-2">
        <a href="#" className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Food & Dink</a>
    </li>
    <li>
        <a className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Culture</a>
    </li>
  
</ul>

    </div>
  )
}

export default Categorybar
