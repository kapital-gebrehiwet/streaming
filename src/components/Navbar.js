import React from 'react';
import Link from 'next/link';
import Logo from './logo';
import { BiSearch } from 'react-icons/bi';
import { BsBell } from 'react-icons/bs';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const Navbar = () => {
  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center p-2">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Logo style="h-auto w-[200px] text-xl" />
          </Link>
          <ul className="hidden md:flex items-center space-x-4">
            <li className="headerLink cursor-pointer hover:text-gray-300">Home</li>
            <li className="headerLink">TV Shows</li>
            <li className="headerLink">Movies</li>
            <li className="headerLink">New & Popular</li>
            <li className="headerLink">My List</li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 text-sm font-light">
          <BiSearch className="hidden sm:inline h-6 w-6" />
          <p className="hidden lg:inline">Kids</p>
          <BsBell className="h-6 w-6" />
          <Image
            alt="logout"
            src="/image.png"
            width={60}
            height={80}
            className="cursor-pointer rounded-full"
            onClick={() => signOut()}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;