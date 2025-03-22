import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import ReactPlayer from 'react-player';
import { FaPlay, FaStar, FaArrowLeft } from 'react-icons/fa';

function TVShowDetail({ show }) {
  const router = useRouter();
  const [showPlayer, setShowPlayer] = useState(false);
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    if (show?.videos?.results) {
      const trailerVideo = show.videos.results.find(
        (video) => video.type === "Trailer"
      );
      setTrailer(trailerVideo ? trailerVideo.key : "");
    }
  }, [show]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900/10 to-[#010511]">
      <Head>
        <title>{show?.name || "TV Show"} - Streaming App</title>
        <meta name="description" content={show?.overview} />
      </Head>

      <div className="relative h-screen">
        {/* Background */}
        <Image
          src={`https://image.tmdb.org/t/p/original${show?.backdrop_path || show?.poster_path}`}
          layout="fill"
          objectFit="cover"
          priority
          alt={show?.name}
        />
        
        {/* Back button */}
        <button
          className="absolute left-4 top-4 z-50 flex items-center space-x-2 rounded bg-black/30 px-4 py-2 text-white hover:bg-black/50"
          onClick={() => router.back()}
        >
          <FaArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
          <h1 className="text-4xl font-bold text-white md:text-6xl">{show?.name}</h1>
          
          <div className="mt-4 flex items-center space-x-4">
            <button
              className="flex items-center space-x-2 rounded bg-white px-6 py-2 text-black transition hover:bg-gray-300"
              onClick={() => setShowPlayer(true)}
            >
              <FaPlay className="h-4 w-4" />
              <span>Play Trailer</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <FaStar className="h-5 w-5 text-yellow-400" />
              <span className="text-lg text-white">{show?.vote_average?.toFixed(1)}</span>
            </div>
          </div>

          <div className="mt-4 max-w-2xl">
            <p className="text-lg text-gray-200">{show?.overview}</p>
            <div className="mt-4 text-gray-400">
              <p>First Air Date: {show?.first_air_date}</p>
              <p>Seasons: {show?.number_of_seasons}</p>
              <p>Episodes: {show?.number_of_episodes}</p>
              <p>Status: {show?.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showPlayer && trailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative aspect-video w-full max-w-5xl">
            <button
              className="absolute -top-10 right-0 text-white"
              onClick={() => setShowPlayer(false)}
            >
              Close
            </button>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer}`}
              width="100%"
              height="100%"
              controls
            />
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
    );
    const show = await response.json();

    return {
      props: {
        show,
      },
    };
  } catch (error) {
    console.error('Error fetching TV show:', error);
    return {
      notFound: true,
    };
  }
}

export default TVShowDetail; 