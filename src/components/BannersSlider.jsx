import '../styles/BannersSlider.css';
import React, { useEffect, useRef, useState } from 'react';

import api from '../api/api.js';

function BannersSlider({ title, fetchUrl, clickHandle }) {
  const [contents, setContents] = useState([]);
  const sliderRef = useRef(null);

  async function fetchContentData() {
    const request = await api.get(fetchUrl);
    setContents(request.data.results.filter((content) => content.backdrop_path));
    return request;
  }

  useEffect(() => {
    fetchContentData();
  }, [fetchUrl]);

  function handleClickArrow(dir) {
    const slider = sliderRef.current;
    slider.scrollLeft =
      dir === 'left'
        ? slider.scrollLeft - (window.innerWidth - 80)
        : slider.scrollLeft + (window.innerWidth - 80);
  }

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
          {contents.map((content, index) => (
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
          ))}
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
