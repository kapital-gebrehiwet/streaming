import React from "react";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import ThumbNail from "./ThumbNail";
import { useRef } from "react";

const Row = ({ title, movies }) => {
  const rowRef = useRef(null);
  const handleClick = (direction) => {
    // Check if rowRef is defined
    if (rowRef.current) {
      // Destructure the properties from the current reference
      const { scrollLeft, clientWidth } = rowRef.current;
  
      // Determine the target scroll position based on the direction
      const scrollTo =
        direction === "left" 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
  
      // Scroll to the calculated position with smooth behavior
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };
  return (
    <div className="space-y-0.5 md:space-y-2">
      <h2 className="w-56 mt-6 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:ml-2">
  <BiChevronLeft onClick={() => handleClick("left")} className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100" />


<div className="hide-scrollbar  flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2" ref={rowRef}>
  {movies.map((movie) => (
    <ThumbNail key={movie.id} movie={movie} />
  ))}
</div>
<BiChevronRight onClick={() => handleClick("right")} className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100" />
</div>
    </div>
  );
};

export default Row;