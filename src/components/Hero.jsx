// src/components/Hero.jsx
import '../styles/Hero.css';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../api/api.js';
import requests from '../api/requests.js';
import info from '../assets/more-info.svg';
import play from '../assets/play.svg';

function Hero() {
  const { genreId } = useParams();

  const endpointMap = {
    home: requests.nowPlaying,
    series: requests.netflixOriginals,
    movies: requests.topRated
  };
  const fetchEndpoint = endpointMap[genreId || 'home'];

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 선택된 카테고리의 리스트를 불러오기
        const listResponse = await api.get(fetchEndpoint);
        const { results } = listResponse.data;

        // 랜덤으로 하나 선택
        const randomItem = results[Math.floor(Math.random() * results.length)];

        // 상세 정보(비디오 포함) 요청
        const detailResponse = await api.get(`movie/${randomItem.id}`, {
          params: { append_to_response: 'videos' }
        });

        setMovie(detailResponse.data);
      } catch (error) {
        console.error('히어로 섹션 로드 실패:', error);
      }
    };

    fetchData();
  }, [fetchEndpoint]);

  // 너무 긴 상세 설명 길이 제한 함수
  const truncate = (str, length) =>
    str && str.length > length ? `${str.substring(0, length - 1)}…` : str;

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
              <button type="button" className="Hero_banner-play-button">
                <img className="play-img" alt="Play" src={play} /> 재생
              </button>
              <button type="button" className="Hero_banner-more-info-button">
                <img className="more-info-img" alt="Info" src={info} /> 상세정보
              </button>
            </div>
          </div>

          <div className="Hero-banner-fade" />
        </>
      )}
    </div>
  );
}

export default Hero;
