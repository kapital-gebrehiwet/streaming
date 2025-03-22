import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

function TVShow({ show }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const BASE_URL = "https://image.tmdb.org/t/p/original";

  return (
    <div 
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={`${BASE_URL}${show.backdrop_path || show.poster_path}`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        alt={show.name}
      />

      {isHovered && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 text-white">
          <h3 className="text-sm font-bold md:text-lg">{show.name}</h3>
          <div className="flex space-x-2">
            <button 
              className="flex items-center gap-x-2 rounded bg-white px-4 py-1.5 text-sm font-semibold text-black transition hover:bg-gray-300"
              onClick={() => router.push(`/tv/${show.id}`)}
            >
              <FaPlay className="h-4 w-4" />
              Play
            </button>
            <button 
              className="flex items-center gap-x-2 rounded bg-gray-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-gray-700"
              onClick={() => router.push(`/tv/${show.id}`)}
            >
              <FaInfoCircle className="h-4 w-4" />
              More Info
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-300">
            <span>Rating: {show.vote_average} • </span>
            <span>{show.first_air_date?.split('-')[0]} • </span>
            <span>{show.number_of_seasons} Season(s)</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default TVShow; 