import '../styles/CardsGridView.css';

import React, { useEffect, useState } from 'react';

import api from '../api/api.js';

function CardsGridView({ fetchUrl }) {
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
