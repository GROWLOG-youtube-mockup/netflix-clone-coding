import '../styles/Header.css';

import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { categoryConfig } from '../api/categoryConfig.js';
import logo from '../assets/logo.png';
import notification from '../assets/notification.svg';
import profile from '../assets/profile.png';
import searchIcon from '../assets/search.svg';
import triangleDown from '../assets/triangledown_106509.svg';

/**
 * Header 컴포넌트: 넷플릭스 스타일의 상단 네비게이션 바를 구현
 * - 로고, 카테고리 메뉴, 검색, 알림, 프로필 기능 포함
 * - 스크롤 시 배경색 변경 기능
 */
function Header() {
  const navigate = useNavigate();
  const { genreId } = useParams();
  // 현재 선택된 카테고리 (URL 파라미터에서 가져옴, 없으면 'home')
  const selectedCategory = genreId || 'home';

  // 헤더 배경색 토글 상태
  const [show, setShow] = useState(false);
  // 검색창 표시 여부 상태
  const [showSearch, setShowSearch] = useState(false);
  // 검색 입력창 참조
  const searchInputRef = useRef(null);

  /**
   * 스크롤 이벤트에 따른 헤더 배경색 변경 처리
   * - 스크롤이 50px 이상이거나 홈이 아닌 페이지에서는 배경색 표시
   */
  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 50 || selectedCategory !== 'home');
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 상태 설정
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedCategory]);

  /**
   * 검색창이 나타날 때 자동으로 포커스 설정
   */
  useEffect(() => {
    if (showSearch) searchInputRef.current?.focus();
  }, [showSearch]);

  /**
   * 카테고리 클릭 핸들러
   * - 페이지 최상단으로 스크롤
   * - 선택된 카테고리 페이지로 이동
   */
  const onCategoryClick = (key) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    navigate(key === 'home' ? '/' : `/genre/${key}`);
  };

  /**
   * 검색 처리 핸들러
   * - 500ms 디바운스 적용
   * - 빈 검색어는 홈으로 이동
   * - 검색어가 있으면 검색 결과 페이지로 이동
   */
  const handleSearch = (e) => {
    setTimeout(() => {
      if (e.target.value === '') navigate('/');
      else navigate(`/search?keyword=${e.target.value}`);
    }, 500);
  };

  return (
    <div className="header-contents">
      {/* 메인 헤더 컨테이너 */}
      <header className={`main-header ${show ? 'main-header_black' : ''}`}>
        {/* 로고 영역 */}
        <div className="main-header-left">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img className="main-header-left-logo" alt="logo" src={logo} />
          </Link>
        </div>

        {/* 카테고리 네비게이션 */}
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

        {/* 우측 기능 영역 (검색, 알림, 프로필) */}
        <div className="main-header-right">
          {/* 검색 버튼 (검색창이 닫혀있을 때) */}
          {!showSearch && (
            <button
              type="button"
              className="main-header-search-button"
              onClick={() => setShowSearch(true)}
            >
              <img className="main-header-right-search-icon" alt="search" src={searchIcon} />
            </button>
          )}

          {/* 검색창 (열려있을 때) */}
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

          {/* 알림, 프로필, 드롭다운 아이콘 */}
          <img className="main-header-right-notification" alt="notification" src={notification} />
          <img className="main-header-right-profile" alt="profile" src={profile} />
          <img className="main-header-right-triangleDown" alt="dropdown" src={triangleDown} />
        </div>
      </header>
    </div>
  );
}

export default Header;
