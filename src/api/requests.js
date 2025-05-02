const genrePath = (id) => `/discover/movie?with_genres=${id}`;

const requests = {
  nowPlaying: '/movie/now_playing',
  netflixOriginals: '/discover/tv?with_networks=213',
  trending: '/trending/all/week',
  topRated: '/movie/top_rated',
  actionMovies: genrePath(28),
  comedyMovies: genrePath(35),
  horrorMovies: genrePath(27),
  romanceMovies: genrePath(10749),
  documentaries: genrePath(99)
};

export default requests;
