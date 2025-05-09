import '../styles/CardsGridView.css';

import React, { useEffect, useState } from 'react';

import api from '../api/api.js';

function CardsGridView({ fetchUrl, clickHandle }) {
  const [movies, setMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [people, setPeople] = useState([]);

  async function fetchMovieData() {
    try {
      const request = await api.get(fetchUrl);
      const contents = request.data.results;

      const moviesData = [];
      const tvSeriesData = [];
      const peopleData = [];

      contents.forEach((item) => {
        switch (item.media_type) {
          case 'movie':
            console.log(item);
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
      console.error('cardsgridview 실패', error);
    }
  }

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  return (
    <section className="cards-grid">
      <div className="grid-container">
        {/* 영화 검색되는 경우 */}
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
          const knownForWithPoster = person.known_for?.find((item) => item.poster_path);

          if (!knownForWithPoster) return null;

          return (
            <div key={person.id} className={`grid-poster poster-${index}`}>
              <img
                src={`https://image.tmdb.org/t/p/original${knownForWithPoster.poster_path}`}
                alt={knownForWithPoster.title}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CardsGridView;
