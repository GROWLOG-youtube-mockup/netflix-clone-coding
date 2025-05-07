import './Hero.css';

import React, { useEffect, useState } from 'react';

import api from '../../api/api.js';
import requests from '../../api/requests.js';

function Hero() {
  const [movie, setMovie] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await api.get(requests.nowPlaying);

        const movieId =
          request.data.results[Math.floor(Math.random() * request.data.results.length)].id;

        const { data } = await api.get(`movie/${movieId}`, {
          params: { append_to_response: 'videos' }
        });

        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="hero">
      <div className="hero__backdrop-wrapper">
        <img
          className="hero__backdrop-image"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt=""
        />
        <div className="hero__fade-overlay" />
      </div>
    </div>
  );
}

export default Hero;
