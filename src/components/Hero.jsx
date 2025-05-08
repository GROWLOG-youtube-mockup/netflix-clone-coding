// src/components/Hero.jsx
import '../styles/Hero.css';

import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import api from '../api/api.js';
import { getCategoryByKey } from '../api/categoryConfig.js';
import requests from '../api/requests.js';
import info from '../assets/more-info.svg';
import play from '../assets/play.svg';

function Hero() {
  const { genreId } = useParams();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const subKey = searchParams.get('sub');

  // 메인 카테고리와 서브카테고리 설정
  const mainKey = genreId || 'home';
  const category = getCategoryByKey(mainKey);

  // 기본 fetchEndpoint는 category.requestKey
  let fetchEndpoint = category?.requestKey ? requests[category.requestKey] : requests.nowPlaying;

  // 서브카테고리 선택 시 해당 requestKey로 override
  if (category?.subGenres && subKey) {
    const sub = category.subGenres.find((s) => s.key === subKey);
    if (sub) {
      fetchEndpoint = requests[sub.requestKey];
    }
  }

  // 디버그: 현재 사용 중인 fetchEndpoint 확인
  console.log('Hero fetchEndpoint:', fetchEndpoint);

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listResponse = await api.get(fetchEndpoint);
        const { results } = listResponse.data;
        const randomItem = results[Math.floor(Math.random() * results.length)];

        // TV 시리즈인지 영화인지 판단
        const isTV = fetchEndpoint.includes('/tv') || randomItem.media_type === 'tv';
        const detailEndpoint = isTV ? `tv/${randomItem.id}` : `movie/${randomItem.id}`;

        const detailResponse = await api.get(detailEndpoint, {
          params: { append_to_response: 'videos' }
        });
        setMovie(detailResponse.data);
      } catch (error) {
        console.error('히어로 섹션 로드 실패:', error);
      }
    };
    fetchData();
  }, [fetchEndpoint]);

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
