import { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";

function TVShowsRow({ title, shows }) {
  const router = useRouter();
  const rowRef = useRef(null);
  const BASE_URL = "https://image.tmdb.org/t/p/original";

  const handleClick = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-0.5 md:space-y-2">
      <h2 className="w-56 mt-6 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:ml-2">
        <BiChevronLeft 
          onClick={() => handleClick("left")} 
          className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100" 
        />

        <div 
          ref={rowRef}
          className="hide-scrollbar flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
        >
          {shows?.map((show) => (
            <div
              key={show.id}
              className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
              onClick={() => router.push(`/tv/${show.id}`)}
            >
              <Image
                src={`${BASE_URL}${show.backdrop_path || show.poster_path}`}
                className="rounded-sm object-cover md:rounded"
                layout="fill"
                alt={show.name}
              />

              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-2">
                <h3 className="text-sm font-bold text-white">{show.name}</h3>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-white">
                    {show.first_air_date?.split('-')[0]}
                  </p>
                  <p className="text-xs text-white">•</p>
                  <p className="text-xs text-white">
                    Rating: {show.vote_average?.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <BiChevronRight 
          onClick={() => handleClick("right")} 
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100" 
        />
      </div>
    </div>
  );
}

export default TVShowsRow; 