export const categoryConfig = [
  {
    key: 'home',
    title: '홈',
    requestKey: 'nowPlaying'
  },
  {
    key: 'series',
    title: '시리즈',
    requestKey: 'netflixOriginals'
  },
  {
    key: 'movies',
    title: '영화',
    requestKey: 'trending'
  }
];

export function getCategoryByKey(key) {
  return categoryConfig.find((c) => c.key === key);
}
