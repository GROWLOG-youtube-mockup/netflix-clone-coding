import '../styles/CardsSlider.css';

import React, { useEffect, useState } from 'react';

import api from '../api/api.js';

function CardsSlider({ title, fetchUrl, id }) {
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
    <section className="cards-row">
      <h2 className="cards-row-title">{title}</h2>
      <div className="slider-container">
        <div className="slider-posters" id={id}>
          {movies.map((movie) => (
            <div key={movie.id} className="slider-poster">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CardsSlider;
