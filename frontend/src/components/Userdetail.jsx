import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { assets } from '@/assets/assets'
import { Link } from 'react-router-dom'



// Userdetail.jsx
const Userdetail = () => {
  return (
    <div>
        <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <img src={assets.userAvatar} alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer" />
        </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#0e121e] text-gray-400 transition duration-300 absolute top-3 right-2">
        <DropdownMenuLabel> My Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
    <DropdownMenuItem asChild>
      <Link to="/profile">Profile</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default Userdetail
