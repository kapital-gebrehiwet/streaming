import React, { useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import Login from '@/components/login'; // Adjust the import path as per your project structure
import MovieDetail from '@/components/MovieDetail'; // Adjust the import path as per your project structure

function MovieDetailPage({ movie }) {
    const { data: session } = useSession();
    const [showPlayer, setShowPlayer] = useState(false);

    // Check if there's no session, and return the Login component
    if (!session) {
        return <Login />;
    }

    // Safely access trailer information
    const trailerIndex = movie.videos?.results ? movie.videos.results.findIndex(element => element.type === "Trailer") : -1;
    const trailerURL = trailerIndex !== -1 ? `https://www.youtube.com/watch?v=${movie.videos.results[trailerIndex]?.key}` : null;

    return (
        <div>
            <MovieDetail movie={movie} showPlayer={showPlayer} setShowPlayer={setShowPlayer} trailerURL={trailerURL} />
        </div>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const { id } = context.query; // Destructure to get the id

    const request = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
    ).then(response => response.json());

    return {
        props: {
            movie: request,
        },
    };
}

export default MovieDetailPage;