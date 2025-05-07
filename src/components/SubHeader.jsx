import '../styles/Header.css';

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { categoryConfig } from '../api/categoryConfig.js';
import gridToggle from '../assets/grid-toggle.svg';
import rowToggle from '../assets/row-toggle.svg';
import triangleDown from '../assets/triangledown_106509.svg';

function SubHeader() {
  const navigate = useNavigate();
  const { genreId } = useParams();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const selectedCategory = genreId || 'home';
  const subKey = searchParams.get('sub');

  const [show, setShow] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // 헤더 배경 토글
  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 카테고리 및 서브키 변경 시 드롭다운 닫기
  useEffect(() => {
    setDropdownOpen(false);
  }, [selectedCategory, subKey]);

  const current = categoryConfig.find((c) => c.key === selectedCategory);
  if (!current || selectedCategory === 'home') return null;

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <div className={`sub-header ${show ? 'main-header_black' : ''}`}>
      <div className="sub-header-genre-details">
        <span className="sub-header-genre-title">{current.title}</span>
        <button type="button" className="sub-header-genre-label" onClick={toggleDropdown}>
          장르
          <img src={triangleDown} alt="▼" className="sub-header-genre-label-triangleDown" />
          {isDropdownOpen && (
            <ul className="genre-options-dropdown">
              {current.subGenres.map((sub) => (
                <li key={sub.key} className="genre-option-item">
                  <button
                    type="button"
                    className={`genre-option-button ${sub.key === subKey ? 'active' : ''}`}
                    onClick={() => navigate(`/genre/${selectedCategory}?sub=${sub.key}`)}
                  >
                    {sub.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </button>
      </div>

      <div className="sub-header-show-video-list-type">
        <button type="button" className="sub-header-show-video-row">
          <img className="row-photo" alt="row" src={rowToggle} />
        </button>
        <button type="button" className="sub-header-show-video-grid">
          <img className="grid-photo" alt="grid" src={gridToggle} />
        </button>
      </div>
    </div>
  );
}

export default SubHeader;
