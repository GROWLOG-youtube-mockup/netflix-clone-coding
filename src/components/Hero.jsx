import '../styles/Hero.css';

import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import api from '../api/api.js';
import { getCategoryByKey } from '../api/categoryConfig.js';
import requests from '../api/requests.js';
import Button from './Common/Button.jsx';
import infoIcon from '../assets/more-info.svg';
import playIcon from '../assets/play.svg';

function Hero() {
  const { genreId } = useParams();
  const { search } = useLocation();
  const subKey = new URLSearchParams(search).get('sub');

  const mainKey = genreId || 'home';
  const category = getCategoryByKey(mainKey);

  let fetchEndpoint = category?.requestKey ? requests[category.requestKey] : requests.nowPlaying;

  if (category?.subGenres && subKey) {
    const sub = category.subGenres.find((s) => s.key === subKey);
    if (sub) fetchEndpoint = requests[sub.requestKey];
  }

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: listData } = await api.get(fetchEndpoint);
        const { results } = listData;
        const randomItem = results[Math.floor(Math.random() * results.length)];
        const isTV = fetchEndpoint.includes('/tv') || randomItem.media_type === 'tv';
        const detailPath = isTV ? `tv/${randomItem.id}` : `movie/${randomItem.id}`;
        const { data: detailData } = await api.get(detailPath, {
          params: { append_to_response: 'videos' }
        });
        setMovie(detailData);
      } catch (e) {
        console.error('히어로 섹션 로드 실패:', e);
      }
    })();
  }, [fetchEndpoint]);

  const truncate = (str, len) => (str && str.length > len ? `${str.substring(0, len - 1)}…` : str);

  return (
    <div className="Hero-banner">
      {movie && (
        <>
          <img
            className="Hero-banner-img"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title || movie.name || 'Hero banner'}
          />

          <div className="Hero-banner-contents">
            <h1 className="Hero-banner-title">
              {movie.title || movie.name || movie.original_title}
            </h1>
            <h3 className="Hero-banner-description">{truncate(movie.overview, 100)}</h3>
            <div className="Hero-banner-button">
              <Button
                iconSrc={playIcon}
                altText="Play"
                className="Hero_banner-play-button"
                onClick={() => {}}
              >
                재생
              </Button>
              <Button
                iconSrc={infoIcon}
                altText="Info"
                className="Hero_banner-more-info-button"
                onClick={() => {}}
              >
                상세정보
              </Button>
            </div>
          </div>

          <div className="Hero-banner-fade" />
        </>
      )}
    </div>
  );
}

export default Hero;
