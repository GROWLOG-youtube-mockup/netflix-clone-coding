import '../styles/CardsGridView.css';

import React, { useEffect, useState } from 'react';

import api from '../api/api.js';

function CardsGridView({ fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  async function fetchMovieData() {
    try {
      const request = await api.get(fetchUrl);
      setMovies(request.data.results);
      setIsLoaded(true);
    } catch (error) {
      console.error('검색 실패', error);
    } finally {
      setIsLoaded(true);
    }
  }
  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  if (!isLoaded) {
    return <div className="search-loading-msg">검색 중입니다</div>;
  }
  if (movies.length === 0) {
    return (
      <div className="search-novalue-msg">
        <div>입력하신 검색어와 일치하는 결과가 없습니다.</div>
        <br />
        <ul>
          <li>다른 키워드를 입력해 보세요.</li>
          <li>시리즈나 영화를 찾고 있으신가요?</li>
          <li>영화 제목, 시리즈 제목, 또는 배우나 감독의 이름으로 검색해 보세요.</li>
          <li>코미디, 로맨스, 스포츠 또는 드라마와 같은 장르명으로 검색해 보세요.</li>
        </ul>
      </div>
    );
  }

  return (
    <section className="cards-grid">
      <div className="grid-container">
        {movies.map((movie, index) => (
          <div key={movie.id} className={`grid-poster poster-${index}`}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardsGridView;
