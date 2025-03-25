import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Logo from './logo';
import { BiSearch } from 'react-icons/bi';
import { BsBell } from 'react-icons/bs';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New Release: The Latest Blockbuster Movie",
      image: "https://image.tmdb.org/t/p/w92/example1.jpg",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      read: false,
      type: 'new_content'
    },
    {
      id: 2,
      message: "Continue watching 'Popular TV Show'",
      image: "https://image.tmdb.org/t/p/w92/example2.jpg",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      read: false,
      type: 'reminder'
    }
  ]);
  
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setSearchResults([]);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const searchMedia = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const [moviesResponse, tvShowsResponse] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&language=en-US&page=1`
        ),
        fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&language=en-US&page=1`
        )
      ]);

      const [moviesData, tvShowsData] = await Promise.all([
        moviesResponse.json(),
        tvShowsResponse.json()
      ]);

      const combinedResults = [
        ...moviesData.results.map(movie => ({
          ...movie,
          media_type: 'movie',
          title: movie.title,
          year: movie.release_date?.split('-')[0] || 'N/A'
        })),
        ...tvShowsData.results.map(show => ({
          ...show,
          media_type: 'tv',
          title: show.name,
          year: show.first_air_date?.split('-')[0] || 'N/A'
        }))
      ]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 6);

      setSearchResults(combinedResults);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
    setIsLoading(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      searchMedia(value);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleResultClick = (result) => {
    setShowSearch(false);
    setSearchResults([]);
    setSearchTerm('');
    router.push(`/${result.media_type}/${result.id}`);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className={`${
      isScrolled 
        ? 'bg-black/95 shadow-lg' 
        : 'bg-gradient-to-b from-black/70 to-transparent'
    } transition-all duration-500`}>
      <div className="container mx-auto flex justify-between items-center p-2">
        {/* Left Section */}
        <div className=" flex items-center space-x-8">
          <Link href="/" className=" items-center">
            <Logo style="flex h-auto w-[150px] text-3xl hover:scale-105 transition duration-300" />
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
          <div className="relative" ref={searchRef}>
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
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search titles..."
                className={`bg-transparent text-white px-4 py-2 w-full focus:outline-none ${
                  showSearch ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            {/* Search Results Dropdown */}
            {showSearch && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-96 bg-black/95 rounded-md shadow-lg overflow-hidden z-50">
                {searchResults.map((result) => (
                  <div
                    key={`${result.media_type}-${result.id}`}
                    className="flex items-center p-3 hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="w-12 h-16 relative flex-shrink-0">
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${result.poster_path || result.backdrop_path}`}
                        alt={result.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                    <div className="ml-3 flex-grow">
                      <h4 className="text-white text-sm font-medium">{result.title}</h4>
                      <p className="text-gray-400 text-xs">
                        {result.media_type === 'movie' ? 'Movie' : 'TV Show'} • {result.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && showSearch && (
              <div className="absolute top-full mt-2 w-full bg-black/95 rounded-md shadow-lg p-4 text-center text-gray-400">
                Searching...
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              className="relative hover:text-primary-500 transition"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <BsBell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <NotificationDropdown
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onClearAll={handleClearAllNotifications}
              />
            )}
          </div>

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