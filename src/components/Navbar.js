
import React from 'react'
import Link from 'next/link'
import Logo from './logo'
import {BiSearch} from 'react-icons/bi'
import {BsBell} from 'react-icons/bs'
import Image from 'next/image'
import {signOut} from 'next-auth/react'

const Navbar = () => {
  return (
    <nav>
         <div className="container flex justify-between ">
           
            <div className="flex items-center space-x-4 md:space-x-10">
            <Link href="/">
            <Logo style="h-auto w-[90px]  text-xl"/>
            </Link>
            <ul className="hidden md:flex items-center space-x-4 left-9">
                <li className="headerLink cursor-pointer color-white hover:text-gray-300">Home</li>
                <li className="headerLink">Tv shows</li>
                <li className="headerLink">MOvies</li>
                <li className="headerLink">New & Popular</li>
                <li className="headerLink">My List</li>
            </ul>
            </div>
         <div className="flex items-center space-x-4 text-sm font-light">
            <BiSearch className="hidden sm:inline h-6 w-6"/>
            <p className="hidden lg:inline">kids</p>
            <BsBell className="h-6 w-6"/>

            <Image 
            alt="logout"
            src="/image.png"
            width={60}
            height={80}
            className="cursor-pointer rounded-full"
            onClick={()=>signOut()}/>
           </div>
            
             
         </div>


    </nav>
  )
}

export default Navbar
