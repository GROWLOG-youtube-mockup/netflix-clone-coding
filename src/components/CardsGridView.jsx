import '../styles/CardsGridView.css';

import React, { useEffect, useState } from 'react';

import api from '../api/api.js';

function CardsGridView({ fetchUrl, clickHandle }) {
  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [people, setPeople] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  async function fetchMovieData() {
    try {
      const request = await api.get(fetchUrl);
      const { results } = request.data;

      const moviesData = [];
      const tvSeriesData = [];
      const peopleData = [];

      results.forEach((item) => {
        switch (item.media_type) {
          case 'movie':
            moviesData.push(item);
            break;
          case 'tv':
            tvSeriesData.push(item);
            break;
          case 'person':
            peopleData.push(item);
            break;
          default:
            break;
        }
      });
      setMovies(moviesData);
      setTvSeries(tvSeriesData);
      setPeople(peopleData);
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
  if (movies.length === 0 && tvSeries.length === 0 && people.length === 0) {
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
        {movies?.map((movie, index) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            role="button"
            tabIndex={index}
            key={movie.id}
            className={`grid-poster poster-${index}`}
            onClick={() => clickHandle(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}

        {/* tvSeries 검색되는 경우 */}
        {tvSeries.map((tv, index) => (
          <div key={tv.id} className={`grid-poster poster-${index}`}>
            <img src={`https://image.tmdb.org/t/p/original${tv.poster_path}`} alt={tv.title} />
          </div>
        ))}

        {/* 사람이 검색되는 경우, 대표작(known_for)의 이미지 보여짐 */}
        {people.map((person, index) => {
          const knwonForWithPoster = person.known_for?.find((item) => item.poster_path);

          if (!knwonForWithPoster) return null;

          return (
            <div key={person.id} className={`grid-poster poster-${index}`}>
              <img
                src={`https://image.tmdb.org/t/p/original${knwonForWithPoster.poster_path}`}
                alt={knwonForWithPoster.title}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CardsGridView;
