import '../styles/CardsGridView.css';

import React, { useEffect, useState } from 'react';

import api from '../api/api.js';

function CardsGridView({ fetchUrl, clickHandle }) {
  const [movies, setMovies] = useState([]);

  async function fetchMovieData() {
    const request = await api.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  }

  useEffect(() => {
    fetchMovieData();
  });

  return (
    <section className="cards-grid">
      <div className="grid-container">
        {movies.map((movie, index) => (
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
      </div>
    </section>
  );
}

export default CardsGridView;
