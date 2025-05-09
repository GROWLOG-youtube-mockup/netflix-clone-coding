import '../styles/BannersSlider.css';
import React, { useEffect, useRef, useState } from 'react';

import api from '../api/api.js';

/**
 * 배너 슬라이더 컴포넌트
 * @param {string} title - 슬라이더 섹션의 제목
 * @param {string} fetchUrl - API 요청 URL
 * @param {function} clickHandle - 배너 클릭 시 실행될 핸들러 함수
 */
function BannersSlider({ title, fetchUrl, clickHandle }) {
  // 컨텐츠 목록을 저장하는 상태
  const [contents, setContents] = useState([]);
  // 슬라이더 스크롤 제어를 위한 ref
  const sliderRef = useRef(null);

  // 슬라이더 스크롤 이동 거리 설정
  const SCROLL_OFFSET = window.innerWidth - 80;

  /**
   * API를 호출하여 컨텐츠 데이터를 가져오는 함수
   * backdrop_path가 있는 컨텐츠만 필터링하여 저장
   */
  const fetchContentData = async () => {
    try {
      const response = await api.get(fetchUrl);
      const filteredContents = response.data.results.filter((content) => content.backdrop_path);
      setContents(filteredContents);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  // fetchUrl이 변경될 때마다 새로운 컨텐츠 데이터를 가져옴
  useEffect(() => {
    fetchContentData();
  }, [fetchUrl]);

  /**
   * 좌우 화살표 버튼 클릭 시 슬라이더 이동 처리
   * @param {string} direction - 이동 방향 ('left' 또는 'right')
   */
  const handleClickArrow = (direction) => {
    const slider = sliderRef.current;
    const newScrollLeft =
      direction === 'left' ? slider.scrollLeft - SCROLL_OFFSET : slider.scrollLeft + SCROLL_OFFSET;

    slider.scrollLeft = newScrollLeft;
  };

  /**
   * 개별 배너 아이템을 렌더링하는 함수
   * @param {object} content - 컨텐츠 정보 객체
   * @param {number} index - 배열 내 인덱스
   * @returns {JSX.Element} 배너 아이템 컴포넌트
   */
  const renderBannerItem = (content, index) => (
    <button
      type="button"
      key={content.id}
      className={`banner-item banner-${index}`}
      onClick={() => clickHandle(content)}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
        alt={content.title || content.name}
      />
      <div className="banner-info">
        <h3>{content.title || content.name}</h3>
      </div>
    </button>
  );

  return (
    <section className="banners-row">
      <h2 className="banners-row-title">{title}</h2>
      <div className="banner-slider-container">
        {/* 왼쪽 이동 버튼 */}
        <button
          className="banner-slider-arrow arrow-left"
          onClick={() => handleClickArrow('left')}
          type="button"
        >
          {'<'}
        </button>
        {/* 슬라이더 컨텐츠 영역 */}
        <div className="banner-slider-content" ref={sliderRef}>
          {contents.map(renderBannerItem)}
        </div>
        {/* 오른쪽 이동 버튼 */}
        <button
          className="banner-slider-arrow arrow-right"
          onClick={() => handleClickArrow('right')}
          type="button"
        >
          {'>'}
        </button>
      </div>
    </section>
  );
}

export default BannersSlider;
