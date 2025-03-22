const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Ensure you have your API key set in the environment variables.
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  // Movie requests
  fetchTrendingMovies: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`,
  fetchMoviePosters: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedMovies: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&language=en-US`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&language=en-US`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749&language=en-US`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99&language=en-US`,

  // TV Show requests
  fetchTrendingTVShows: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedTVShows: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchPopularTVShows: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`,
  fetchActionTVShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10759&language=en-US`, // Action & Adventure
  fetchComedyTVShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=35&language=en-US`,
  fetchDramaTVShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=18&language=en-US`,
  fetchSciFiTVShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10765&language=en-US`, // Sci-Fi & Fantasy
  fetchDocumentaryTVShows: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=99&language=en-US`,
};

export default requests;