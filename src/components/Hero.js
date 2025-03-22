
import {useEffect, useState } from 'react'
import React from 'react'
import MovieDetail from './MovieDetail'
function Hero({moviePosters}) {
   const[movie,setMovie] = useState(null)
   const[showPlayer,setShowPlayer] = useState(false)
   const[trailer,setTrailer] = useState(null)
   useEffect(()=>{
    const mov=moviePosters[Math.floor(Math.random()*moviePosters.length)];
    fetch(`https://api.themoviedb.org/3/movie/${mov.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`)
  .then((res) => res.json())
  .then((data) => {
    const trailerIndex = data.videos.results.findIndex(
      (element) => element.type === "Trailer"
    );

    const trailerURL = `https://www.youtube.com/watch?v=${data.videos.results[trailerIndex]?.key}`;
    setTrailer(trailerURL);
  });
    setMovie(mov)
   },[])
  return (
    <div>
      <MovieDetail movie={movie}
      showPlayer={showPlayer}
      setShowPlayer={setShowPlayer}
      trailerURL={trailer}
      />
    </div>
  )
}

export default Hero
