// src/components/Header.jsx
import '../styles/Header.css';

import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';

import { categoryConfig } from '../api/categoryConfig.js';
import gridToggle from '../assets/grid-toggle.svg';
import logo from '../assets/logo.png';
import notification from '../assets/notification.svg';
import profile from '../assets/profile.png';
import rowToggle from '../assets/row-toggle.svg';
import searchIcon from '../assets/search.svg';
import triangleDown from '../assets/triangledown_106509.svg';

function Header() {
  const navigate = useNavigate();
  const { genreId } = useParams();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const selectedCategory = genreId || 'home';
  const subKey = searchParams.get('sub');

  const [show, setShow] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);

  // 헤더 배경 토글
  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 검색창 포커스
  useEffect(() => {
    if (showSearch) {
      searchInputRef.current?.focus();
    }
  }, [showSearch]);

  const onCategoryClick = (key) => {
    setDropdownOpen(false);
    navigate(key === 'home' ? '/' : `/genre/${key}`);
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const current = categoryConfig.find((c) => c.key === selectedCategory);

  return (
    <div className="header-contents">
      <header className={`main-header ${show ? 'main-header_black' : ''}`}>
        <div className="main-header-left">
          <Link to="/">
            <img className="main-header-left-logo" alt="logo" src={logo} />
          </Link>
        </div>

        <nav className="main-header-category">
          {categoryConfig.map(({ key, title }) => (
            <button
              key={key}
              type="button"
              className={`main-header-category-button ${selectedCategory === key ? 'active' : ''}`}
              onClick={() => onCategoryClick(key)}
            >
              {title}
            </button>
          ))}
        </nav>

        <div className="main-header-right">
          {!showSearch && (
            <button
              type="button"
              className="main-header-search-button"
              onClick={() => setShowSearch(true)}
            >
              <img className="main-header-right-search-icon" alt="search" src={searchIcon} />
            </button>
          )}

          {showSearch && (
            <div className="main-header-search-container">
              <img className="search-input-icon" alt="search" src={searchIcon} />
              <input
                ref={searchInputRef}
                type="text"
                className="main-header-search-input"
                placeholder="제목, 사람, 장르"
                onBlur={() => setShowSearch(false)}
              />
            </div>
          )}

          <img className="main-header-right-notification" alt="notification" src={notification} />
          <img className="main-header-right-profile" alt="profile" src={profile} />
          <img className="main-header-right-triangleDown" alt="dropdown" src={triangleDown} />
        </div>
      </header>

      {selectedCategory !== 'home' && current && (
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
                        onClick={() => {
                          navigate(`/genre/${selectedCategory}?sub=${sub.key}`);
                          setDropdownOpen(false);
                        }}
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
      )}
    </div>
  );
}

export default Header;
