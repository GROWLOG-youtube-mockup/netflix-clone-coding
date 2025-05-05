import '../styles/Hero.css';

import React, { useEffect, useState } from 'react';

import api from '../api/api.js';
import requests from '../api/requests.js';
import info from '../assets/more-info.svg';
import play from '../assets/play.svg';

function Hero() {
  const [movie, setMovie] = useState();

  // 히어로 섹션 정보 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 현재 진행중인 영화 정보 받아오기
        const request = await api.get(requests.nowPlaying);

        // ID는 렌덤 값으로
        const movieId =
          request.data.results[Math.floor(Math.random() * request.data.results.length)].id;

        // 상세 정보 받아오기
        const { data: movieDetail } = await api.get(`movie/${movieId}`, {
          params: { append_to_response: 'videos' }
        });
        console.log(movieDetail);

        setMovie(movieDetail);
      } catch (error) {
        console.log('히어로 섹션을 불러오지 못했습니다.');
      }
    };
    fetchData();
  }, []);

  // 너무 긴 상세 설명 길이 제한 함수
  const cut = (str, n) => {
    return str?.length > n ? `${str.substr(0, n - 1)}...` : str;
  };

  return (
    <div className="Hero-banner">
      <img
        className="Hero-banner-img"
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt="Hero-banner-image"
      />
      <div className="Hero-banner-contents">
        <h1 className="Hero-banner-title">
          {movie?.title || movie?.name || movie?.original.title}
        </h1>
        <h3 className="Hero-banner-description">{cut(movie?.overview, 100)}</h3>
        <div className="Hero-banner-button">
          <button type="button" className="Hero_banner-play-button">
            <img className="play-img" alt="Play" src={play} /> 재생
          </button>
          <button type="button" className="Hero_banner-more-info-button">
            <img className="more-info-img" alt="More Information" src={info} /> 상세정보
          </button>
        </div>
      </div>
      <div className="Hero-banner-fade" />
    </div>
  );
}

export default Hero;
