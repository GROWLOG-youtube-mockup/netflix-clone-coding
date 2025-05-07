const movieGenrePath = (id) => `/discover/movie?with_genres=${id}`;
const tvGenrePath = (id) => `/discover/tv?with_genres=${id}`;

const requests = {
  // —— 영화(Movie) 관련 ——
  nowPlaying: '/movie/now_playing',
  trendingMovies: '/trending/movie/week',
  topRated: '/movie/top_rated',
  actionMovies: movieGenrePath(28),
  comedyMovies: movieGenrePath(35),
  horrorMovies: movieGenrePath(27),
  romanceMovies: movieGenrePath(10749),
  documentaries: movieGenrePath(99),

  // —— 시리즈(Series/TV) 관련 ——
  netflixOriginals: '/discover/tv?with_networks=213',
  trendingSeries: '/trending/tv/week',
  topRatedSeries: '/tv/top_rated',
  popularSeries: '/tv/popular',
  onAirSeries: '/tv/on_the_air',
  actionSeries: tvGenrePath(10759),
  comedySeries: tvGenrePath(35),
  documentarySeries: tvGenrePath(99),

  // —— 공통(all) ——
  trendingAll: '/trending/all/week'
};

export default requests;
