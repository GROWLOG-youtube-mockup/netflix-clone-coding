import '../styles/BannersSlider.css';
import React, { useEffect, useRef, useState } from 'react';

import api from '../api/api.js';

function BannersSlider({ title, fetchUrl, clickHandle }) {
  const [contents, setContents] = useState([]);
  const sliderRef = useRef(null);

  const SCROLL_OFFSET = window.innerWidth - 80;

  const fetchContentData = async () => {
    try {
      const response = await api.get(fetchUrl);
      const filteredContents = response.data.results.filter((content) => content.backdrop_path);
      setContents(filteredContents);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  useEffect(() => {
    fetchContentData();
  }, [fetchUrl]);

  const handleClickArrow = (direction) => {
    const slider = sliderRef.current;
    const newScrollLeft =
      direction === 'left' ? slider.scrollLeft - SCROLL_OFFSET : slider.scrollLeft + SCROLL_OFFSET;

    slider.scrollLeft = newScrollLeft;
  };

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
        <button
          className="banner-slider-arrow arrow-left"
          onClick={() => handleClickArrow('left')}
          type="button"
        >
          {'<'}
        </button>
        <div className="banner-slider-content" ref={sliderRef}>
          {contents.map(renderBannerItem)}
        </div>
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
