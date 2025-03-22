import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './logo';
import { BiSearch } from 'react-icons/bi';
import { BsBell } from 'react-icons/bs';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${
      isScrolled 
        ? 'bg-black/95 shadow-lg' 
        : 'bg-gradient-to-b from-black/70 to-transparent'
    } transition-all duration-500`}>
      <div className="container mx-auto flex justify-between items-center p-2">
        {/* Left Section */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center">
            <Logo style="h-auto w-[150px] text-xl hover:scale-105 transition duration-300" />
          </Link>
          <ul className="hidden md:flex items-center space-x-6">
            <li>
              <Link href="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link href="/tv-shows" className="nav-link">TV Shows</Link>
            </li>
            <li>
              <Link href="/movies" className="nav-link">Movies</Link>
            </li>
            <li>
              <Link href="/new" className="nav-link">New & Popular</Link>
            </li>
            <li>
              <Link href="/my-list" className="nav-link">My List</Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative">
            <div className={`flex items-center bg-black/60 rounded-full overflow-hidden transition-all duration-300 ${
              showSearch ? 'w-64' : 'w-10'
            }`}>
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 hover:text-primary-500 transition"
              >
                <BiSearch className="h-6 w-6" />
              </button>
              <input
                type="text"
                placeholder="Titles, people, genres"
                className={`bg-transparent text-white px-4 py-2 w-full focus:outline-none ${
                  showSearch ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          </div>

          {/* Notifications */}
          <button className="relative hover:text-primary-500 transition">
            <BsBell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
              2
            </span>
          </button>

          {/* Profile */}
          <div className="relative group">
            <Image
              alt="Profile"
              src="/image.png"
              width={40}
              height={40}
              className="cursor-pointer rounded-full border-2 border-transparent group-hover:border-white transition-all duration-200"
              onClick={() => signOut()}
            />
            <div className="absolute right-0 mt-2 w-48 bg-black/95 rounded-md shadow-lg py-1 invisible group-hover:visible transition-all duration-200">
              <button
                onClick={() => signOut()}
                className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 text-left"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;