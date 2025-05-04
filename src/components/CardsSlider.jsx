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

  function handleClickArrow(dir) {
    const handledRow = document.getElementById(id);
    handledRow.scrollLeft =
      dir === 'left'
        ? handledRow.scrollLeft - (window.innerWidth - 80)
        : handledRow.scrollLeft + (window.innerWidth - 80);
  }

  return (
    <section className="cards-row">
      <h2 className="cards-row-title">{title}</h2>
      <div className="slider-container">
        <button
          className="slider-arrow arrow-left"
          onClick={() => {
            handleClickArrow('left');
          }}
          type="button"
        >
          {'<'}
        </button>
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
        <button
          className="slider-arrow arrow-right"
          onClick={() => {
            handleClickArrow('right');
          }}
          type="button"
        >
          {'>'}
        </button>
      </div>
    </section>
  );
}

export default CardsSlider;
