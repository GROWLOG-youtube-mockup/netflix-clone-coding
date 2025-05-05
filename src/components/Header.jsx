import '../styles/Header.css';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import gridToggle from '../assets/grid-toggle.svg';
import logo from '../assets/logo.png';
import notification from '../assets/notification.svg';
import profile from '../assets/profile.png';
import rowToggle from '../assets/row-toggle.svg';
import searchIcon from '../assets/search.svg';
import triangleDown from '../assets/triangledown_106509.svg';

function Header() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <div>
      <div className="header-contents">
        <header className={`main-header ${show && 'main-header_black'} `}>
          <div className="main-header-left">
            <Link to="/">
              <img className="main-header-left-logo" alt="Netflix logo" src={logo} />
            </Link>
          </div>
          <div className="main-header-category" />
          <div className="main-header-right">
            <img
              className="main-header-right-search-icon"
              alt="Netflix search icon"
              src={searchIcon}
            />
            <img
              className="main-header-right-notification"
              alt="Netflix Notification"
              src={notification}
            />
            <img className="main-header-right-profile" alt="Netflix profile" src={profile} />
            <img
              className="main-header-right-triangleDown"
              alt="Netflix profile-else"
              src={triangleDown}
            />
          </div>
        </header>
        <div className="sub-header">
          <div className="sub-header-genre-details">
            <span className="sub-header-genre-title">Sub header Title</span>
            <button type="button" className="sub-header-genre-label">
              장르
              <img
                className="sub-header-genre-label-triangleDown"
                alt="More option"
                src={triangleDown}
              />
            </button>
          </div>
          <div className="sub-header-show-video-list-type">
            <button type="button" className="sub-header-show-video-row">
              <img className="row-photo" alt="Show video to row" src={rowToggle} />
            </button>
            <button type="button" className="sub-header-show-video-grid">
              <img className="grid-photo" alt="Show video to grid" src={gridToggle} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
