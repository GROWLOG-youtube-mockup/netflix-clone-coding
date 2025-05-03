import '../styles/Header.css';

import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import notification from '../assets/notification.svg';
import profile from '../assets/profile.png';
import searchIcon from '../assets/search.svg';

function Header() {
  return (
    <div>
      <div className="header">
        <div className="header-left">
          <Link to="/">
            <img className="header-left-logo" alt="Netflix logo" src={logo} />
          </Link>
        </div>
        <div className="header-category" />
        <div className="header-right">
          <img className="header-right-search-icon" alt="Netflix search icon" src={searchIcon} />
          <img
            className="header-right-notification"
            alt="Netflix Notification"
            src={notification}
          />
          <img className="header-right-profile" alt="Netflix profile" src={profile} />
        </div>
      </div>
      <h2>Header</h2>
    </div>
  );
}

export default Header;
