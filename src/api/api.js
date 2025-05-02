import axios from 'axios';

const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',

  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_MOVIE_DB_TOKEN_KEY}`
  },
  params: {
    api_key: import.meta.env.VITE_MOVIE_DB_API_KEY,
    language: 'ko-KR'
  }
});

export default movieApi;
