import React, { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import Login from '@/components/login';
import MovieDetail from '@/components/MovieDetail';

function MovieDetailPage({ movie }) {
    const { data: session } = useSession();
    const [showPlayer, setShowPlayer] = useState(false);
    const [trailerURL, setTrailerURL] = useState(null);
    const [hasTrailer, setHasTrailer] = useState(false);

    useEffect(() => {
        if (movie?.videos?.results) {
            // Try to find an official trailer first
            let trailerVideo = movie.videos.results.find(
                (video) => video.type === "Trailer" && video.official === true
            );

            // If no official trailer, try to find any trailer
            if (!trailerVideo) {
                trailerVideo = movie.videos.results.find(
                    (video) => video.type === "Trailer"
                );
            }

            // If still no trailer, try to find any video
            if (!trailerVideo) {
                trailerVideo = movie.videos.results[0];
            }

            if (trailerVideo) {
                setTrailerURL(`https://www.youtube.com/watch?v=${trailerVideo.key}`);
                setHasTrailer(true);
            } else {
                setHasTrailer(false);
            }
        }
    }, [movie]);

    // Check if there's no session, and return the Login component
    if (!session) {
        return <Login />;
    }

    return (
        <div>
            <MovieDetail 
                movie={movie} 
                showPlayer={showPlayer} 
                setShowPlayer={setShowPlayer} 
                trailerURL={trailerURL}
                hasTrailer={hasTrailer}
            />
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const { id } = context.query;

    try {
        const request = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
        ).then(response => response.json());

        if (!request || request.success === false) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                movie: request,
            },
        };
    } catch (error) {
        console.error('Error fetching movie:', error);
        return {
            notFound: true,
        };
    }
}

export default MovieDetailPage; 