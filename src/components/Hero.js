import {useEffect, useState } from 'react'
import React from 'react'
import MovieDetail from './MovieDetail'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import ReactPlayer from 'react-player'

function Hero({moviePosters}) {
   const[movie,setMovie] = useState(null)
   const[showPlayer,setShowPlayer] = useState(false)
   const[trailer,setTrailer] = useState(null)
   useEffect(()=>{
    if (moviePosters && moviePosters.length > 0) {
      const mov = moviePosters[Math.floor(Math.random()*moviePosters.length)];
      fetch(`https://api.themoviedb.org/3/movie/${mov.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`)
        .then((res) => res.json())
        .then((data) => {
          const trailerIndex = data.videos?.results?.findIndex(
            (element) => element.type === "Trailer"
          );
          const trailerURL = `https://www.youtube.com/watch?v=${data.videos?.results[trailerIndex]?.key}`;
          setTrailer(trailerURL);
          setMovie(data);
        });
    }
   },[moviePosters])
  return (
    <div className="relative h-[95vh] w-full">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
          priority
          alt={movie?.title || "Movie Poster"}
          className="hero-image opacity-90"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-12 md:px-8 lg:px-16 z-20">
        <div className="max-w-xl space-y-4 md:space-y-6 hero-content">
          {/* Title */}
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>

          {/* Overview */}
          <p className="hero-overview text-shadow-md text-sm md:text-lg max-w-xs md:max-w-lg lg:max-w-2xl text-gray-200">
            {movie?.overview}
          </p>

          {/* Movie Info */}
          <div className="hero-info flex flex-wrap gap-4 text-sm text-gray-300">
            <span>Release: {movie?.release_date?.split('-')[0]}</span>
            <span>Rating: {movie?.vote_average?.toFixed(1)}/10</span>
            <span>{movie?.runtime} min</span>
          </div>

          {/* Buttons */}
          <div className="hero-buttons flex flex-wrap gap-3">
            <button
              onClick={() => setShowPlayer(true)}
              className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded hover:bg-gray-300 transition duration-200"
            >
              <FaPlay className="h-4 w-4" />
              <span>Play Trailer</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-600/80 text-white px-5 py-2.5 rounded hover:bg-gray-700 transition duration-200">
              <InformationCircleIcon className="h-5 w-5" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl aspect-video">
            <button
              onClick={() => setShowPlayer(false)}
              className="absolute -top-8 right-0 text-white hover:text-gray-300"
            >
              Close
            </button>
            <ReactPlayer
              url={trailer}
              width="100%"
              height="100%"
              controls
              playing
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Hero
