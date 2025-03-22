import React from 'react';
import Navbar from './Navbar';
import { baseUrl } from '@/utils/constant'; // Ensure this is properly defined
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { IoIosInformationCircle } from 'react-icons/io';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
import { AiOutlineClose } from 'react-icons/ai';

function MovieDetail({ movie, setShowPlayer,showPlayer,trailerURL }) {
  const imageUrl = `${baseUrl}${movie?.backdrop_path || movie?.poster_path}`;

  return (
    <>
      <Navbar />
      <div className="relative container  h-[100vh]">
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
            <button   
              className="bannerButton bg-white text-black px-4 py-2 rounded shadow-md"
              onClick={() => setShowPlayer(true)}
            >
              <FaPlay className="h-4 w-4 inline" />
              Play
            </button>
            <button className="bannerButton bg-gray-800 bg-opacity-70 px-4 py-2 rounded shadow-md">
              <IoIosInformationCircle className="h-5 w-5 inline" />
              More Info
            </button>
          </div>
        </div>
        <div className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
    showPlayer ? "opacity-100 z-50" : "opacity-0 -z-10"
         }`}>
          {/* Additional content goes here */}
        </div>
        <div className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
    showPlayer ? "opacity-100 z-50" : "opacity-0 -z-10"
}`}>
  <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
    <span className="font-semibold">Play Trailer</span>
    <div 
      className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
      onClick={() => setShowPlayer(false)}
    >
      <AiOutlineClose className="h-5" />
    </div>
  </div>
  <div className="relative pt-[56.25%]">
    <ReactPlayer
      url={trailerURL}
      width="100%"
      height="100%"
      style={{ position: "absolute", top: "0", left: "0" }}
      controls={true}
      playing={showPlayer}
    />
  </div>
</div>
      </div>
    </>
  );
}

export default MovieDetail;