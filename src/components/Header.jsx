import '../styles/Header.css';

import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

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
  const selectedCategory = genreId || 'home';

  const [show, setShow] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);

  // 스크롤 시 헤더 배경 변경
  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 검색창 열릴 때 포커스 이동
  useEffect(() => {
    if (showSearch) {
      searchInputRef.current?.focus();
    }
  }, [showSearch]);

  const onCategoryClick = (key) => {
    setDropdownOpen(false);
    if (key === 'home') navigate('/');
    else navigate(`/genre/${key}`);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

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
          {/* 검색 버튼 */}
          {!showSearch && (
            <button
              type="button"
              className="main-header-search-button"
              onClick={() => setShowSearch(true)}
            >
              <img className="main-header-right-search-icon" alt="search" src={searchIcon} />
            </button>
          )}

          {/* 검색창 */}
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

      {selectedCategory !== 'home' && (
        <div
          className={`sub-header ${show && selectedCategory !== 'home' ? 'main-header_black' : ''}`}
        >
          <div className="sub-header-genre-details">
            <span className="sub-header-genre-title">{current ? current.title : ''}</span>
            <button type="button" className="sub-header-genre-label" onClick={toggleDropdown}>
              장르 <img src={triangleDown} alt="▼" />
            </button>
            {isDropdownOpen && (
              <ul className="genre-options-dropdown">{/* 기존 옵션 렌더링 로직 유지 */}</ul>
            )}
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
