import React from 'react';
import Navbar from './Navbar';
import { baseUrl } from '@/utils/constant'; // Ensure this is properly defined
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { IoIosInformationCircle } from 'react-icons/io';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
import { AiOutlineClose } from 'react-icons/ai';

function MovieDetail({ movie, setShowPlayer, showPlayer, trailerURL, hasTrailer }) {
  const imageUrl = `${baseUrl}${movie?.backdrop_path || movie?.poster_path}`;

  return (
    <>
      <Navbar />
      <div className="relative container h-[100vh]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            fill 
            src={imageUrl}
            className="object-cover brightness-75" 
            alt='movie poster' 
          />
        </div>
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 text-center text-white">
          <h1 className="text-3xl font-bold md:text-5xl lg:text-7xl">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <p className="max-w-md text-lg md:max-w-2xl md:text-xl lg:max-w-3xl lg:text-2xl">
            {movie?.overview}
          </p>
          <div className="flex space-x-4">
            {hasTrailer && (
              <button   
                className="bannerButton bg-white text-black px-4 py-2 rounded shadow-md hover:bg-gray-300 transition duration-200"
                onClick={() => setShowPlayer(true)}
              >
                <FaPlay className="h-4 w-4 inline mr-2" />
                Play Trailer
              </button>
            )}
            <button className="bannerButton bg-gray-800 bg-opacity-70 px-4 py-2 rounded shadow-md hover:bg-opacity-90 transition duration-200">
              <IoIosInformationCircle className="h-5 w-5 inline mr-2" />
              More Info
            </button>
          </div>
        </div>

        {/* Trailer Modal */}
        {showPlayer && hasTrailer && trailerURL && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl aspect-video">
              <button
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition duration-200"
                onClick={() => setShowPlayer(false)}
              >
                <AiOutlineClose className="h-8 w-8" />
              </button>
              <ReactPlayer
                url={trailerURL}
                width="100%"
                height="100%"
                controls
                playing
                config={{
                  youtube: {
                    playerVars: { showinfo: 1 }
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MovieDetail;