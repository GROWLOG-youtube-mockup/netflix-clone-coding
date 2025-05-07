/**
 * 카테고리 및 서브 장르 설정
 * - key: URL 파라미터로 사용되는 식별자
 * - title: UI에 보여질 텍스트
 * - requestKey: src/api/requests.js 에 정의된 요청 키
 */
export const categoryConfig = [
  {
    key: 'home',
    title: '홈',
    requestKey: 'nowPlaying',
    subGenres: [] // 홈에는 상세 없음
  },
  {
    key: 'series',
    title: '시리즈',
    requestKey: 'netflixOriginals',
    subGenres: [
      { key: 'netflixOriginals', title: 'Netflix 오리지널', requestKey: 'netflixOriginals' },
      { key: 'trendingSeries', title: '인기 시리즈', requestKey: 'trendingSeries' },
      { key: 'topRatedSeries', title: '평점순 시리즈', requestKey: 'topRatedSeries' },
      { key: 'popularSeries', title: '인기순 시리즈', requestKey: 'popularSeries' },
      { key: 'onAirSeries', title: '현재 방영 중', requestKey: 'onAirSeries' },
      { key: 'actionSeries', title: '액션 & 어드벤처', requestKey: 'actionSeries' },
      { key: 'comedySeries', title: '코미디', requestKey: 'comedySeries' },
      { key: 'documentarySeries', title: '다큐멘터리', requestKey: 'documentarySeries' }
    ]
  },
  {
    key: 'movies',
    title: '영화',
    requestKey: 'trendingMovies',
    subGenres: [
      { key: 'nowPlaying', title: '현재 상영작', requestKey: 'nowPlaying' },
      { key: 'trendingMovies', title: '인기 영화', requestKey: 'trendingMovies' },
      { key: 'topRated', title: '평점순 영화', requestKey: 'topRated' },
      { key: 'actionMovies', title: '액션', requestKey: 'actionMovies' },
      { key: 'comedyMovies', title: '코미디', requestKey: 'comedyMovies' },
      { key: 'horrorMovies', title: '공포', requestKey: 'horrorMovies' },
      { key: 'romanceMovies', title: '로맨스', requestKey: 'romanceMovies' },
      { key: 'documentaries', title: '다큐멘터리', requestKey: 'documentaries' }
    ]
  }
];

/**
 * key 로 카테고리 객체를 찾아 반환합니다.
 */
export function getCategoryByKey(key) {
  return categoryConfig.find((c) => c.key === key);
}
