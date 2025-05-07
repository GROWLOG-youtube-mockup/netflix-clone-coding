import '../styles/Header.css';

import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { categoryConfig } from '../api/categoryConfig.js';
import logo from '../assets/logo.png';
import notification from '../assets/notification.svg';
import profile from '../assets/profile.png';
import searchIcon from '../assets/search.svg';
import triangleDown from '../assets/triangledown_106509.svg';

function Header() {
  const navigate = useNavigate();
  const { genreId } = useParams();
  const selectedCategory = genreId || 'home';

  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);

  // 헤더 배경 토글
  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 50 || selectedCategory !== 'home');
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedCategory]);

  // 검색창 포커스
  useEffect(() => {
    if (showSearch) searchInputRef.current?.focus();
  }, [showSearch]);

  const onCategoryClick = (key) => {
    navigate(key === 'home' ? '/' : `/genre/${key}`);
  };

  const handleSearch = (e) => {
    setTimeout(() => {
      if (e.target.value === '') navigate('/');
      else navigate(`/search?keyword=${e.target.value}`);
    }, 500);
  };

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
                onKeyDown={(e) => handleSearch(e)}
              />
            </div>
          )}

          <img className="main-header-right-notification" alt="notification" src={notification} />
          <img className="main-header-right-profile" alt="profile" src={profile} />
          <img className="main-header-right-triangleDown" alt="dropdown" src={triangleDown} />
        </div>
      </header>
    </div>
  );
}

export default Header;
