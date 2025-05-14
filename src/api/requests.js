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
  trendingAll: '/trending/all/week',

  // —— 추가한 카테고리 ——
  top10Series: '/tv/popular?page=1', // Top 10 시리즈용 (인기도 기준)
  animationSeries: tvGenrePath(16), // 애니메이션 시리즈
  realityTV: tvGenrePath(10764), // 리얼리티 TV
  dramaMovies: movieGenrePath(18), // 드라마 영화
  dramaSeries: tvGenrePath(18), // 드라마 시리즈
  koreanMovies: '/discover/movie?with_original_language=ko', // 한국 영화
  mostSearched: '/trending/all/day', // 최다 검색 (일간 트렌딩으로 대체)

  // 추가적인 장르/카테고리
  familyContent: '/discover/movie?certification_country=US&certification.lte=G',
  sciFiSeries: tvGenrePath(10765), // SF & 판타지
  crimeMovies: movieGenrePath(80), // 범죄
  koreanDramaSeries: '/discover/tv?with_original_language=ko' // 한국 드라마
};

export default requests;
