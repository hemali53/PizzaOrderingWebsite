import React from 'react'
import { BsAmd } from "react-icons/bs"

const Navbar = () => {
  return (
    <div className='fixed w-full bg-blue-950 py-3'>
        <div className='container mx-auto flex justify-between  ml-15 text-white'>
            <div className='flex'>
            <div className='flex justify-center icons center mr-5'><BsAmd/></div>
            <div className='flex ml-3 '>
               <h1>Home</h1> 
               <h1>About us</h1> 
            </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar