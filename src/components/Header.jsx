import '../styles/Header.css';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { categoryConfig } from '../api/categoryConfig.js';
import logo from '../assets/logo.png';
import notification from '../assets/notification.svg';
import profile from '../assets/profile.png';
import searchIcon from '../assets/search.svg';
import triangleDown from '../assets/triangledown_106509.svg';

/**
 * Header 컴포넌트: 넷플릭스 스타일의 상단 네비게이션 바
 * - 로고, 카테고리 메뉴, 검색, 알림, 프로필 기능 포함
 * - 스크롤 또는 페이지 변경 시 배경색 변경
 * - 반응형 검색창 구현
 */
function Header() {
  const navigate = useNavigate();
  const { genreId } = useParams();
  // URL 파라미터에서 현재 카테고리 확인, 없으면 'home'으로 설정
  const selectedCategory = genreId || 'home';

  // 헤더 배경색 상태와 검색창 표시 상태 관리
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  // 검색 입력창 참조를 위한 ref
  const searchInputRef = useRef(null);

  /**
   * 스크롤 이벤트 핸들러
   * - 스크롤이 50px 이상이거나 홈페이지가 아닐 경우 배경색 변경
   * - useCallback을 사용하여 불필요한 재생성 방지
   */
  const handleScroll = useCallback(() => {
    setShow(window.scrollY > 50 || selectedCategory !== 'home');
  }, [selectedCategory]);

  /**
   * 스크롤 이벤트 리스너 등록 및 정리
   * - 컴포넌트 마운트 시 초기 상태 설정
   * - 언마운트 시 이벤트 리스너 제거
   */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /**
   * 검색창 자동 포커스 설정
   * - 검색창이 나타날 때 자동으로 입력 필드에 포커스
   */
  useEffect(() => {
    if (showSearch) searchInputRef.current?.focus();
  }, [showSearch]);

  /**
   * 페이지 최상단 스크롤 함수
   * - 부드러운 스크롤 효과 적용
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  /**
   * 카테고리 클릭 이벤트 핸들러
   * - 페이지 최상단으로 스크롤
   * - 선택된 카테고리 페이지로 이동
   */
  const onCategoryClick = useCallback(
    (key) => {
      scrollToTop();
      navigate(key === 'home' ? '/' : `/genre/${key}`);
    },
    [navigate]
  );

  /**
   * 검색 이벤트 핸들러
   * - 500ms 디바운스 적용
   * - 빈 검색어는 홈으로 이동
   * - 검색어 입력 시 검색 결과 페이지로 이동
   */
  const handleSearch = useCallback(
    (e) => {
      setTimeout(() => {
        if (e.target.value === '') navigate('/');
        else navigate(`/search?keyword=${e.target.value}`);
      }, 500);
    },
    [navigate]
  );

  /**
   * 로고 클릭 이벤트 핸들러
   * - 페이지 최상단으로 스크롤
   */
  const handleLogoClick = () => {
    scrollToTop();
  };

  return (
    <div className="header-contents">
      <header className={`main-header ${show ? 'main-header_black' : ''}`}>
        {/* 로고 영역 */}
        <div className="main-header-left">
          <Link to="/" onClick={handleLogoClick}>
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
          {/* 검색 버튼 (검색창 닫힌 상태) */}
          {!showSearch && (
            <button
              type="button"
              className="main-header-search-button"
              onClick={() => setShowSearch(true)}
            >
              <img className="main-header-right-search-icon" alt="search" src={searchIcon} />
            </button>
          )}

          {/* 검색창 (열린 상태) */}
          {showSearch && (
            <div className="main-header-search-container">
              <img className="search-input-icon" alt="search" src={searchIcon} />
              <input
                ref={searchInputRef}
                type="text"
                className="main-header-search-input"
                placeholder="제목, 사람, 장르"
                onBlur={() => setShowSearch(false)}
                onKeyDown={handleSearch}
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
