import React from 'react';

import '../styles/Footer.css';

import facebook from '../assets/facebook.svg';
import instagram from '../assets/instagram.svg';
import twitter from '../assets/twitter.svg';
import youtube from '../assets/youtube.svg';
import Button from './Common/Button.jsx';

function Footer() {
  const socialLinks = [
    { name: 'facebook', icon: facebook },
    { name: 'instagram', icon: instagram },
    { name: 'twitter', icon: twitter },
    { name: 'youtube', icon: youtube }
  ];

  const footerMembers = [
    '멤버소개',
    '강현아',
    '김유진',
    '김지은',
    '박건',
    '박재경',
    '이승준',
    '이혜원'
  ];

  return (
    <div className="footer">
      <div className="social-links">
        {socialLinks.map(({ name, icon }) => (
          <div key={name} className="social-link">
            <img src={icon} alt="name" />
          </div>
        ))}
      </div>

      <div className="footer-members">
        {footerMembers.map((name) => (
          <div key={name} className="footer-member">
            <span>{name}</span>
          </div>
        ))}
      </div>

      <div className="footer-service">
        <button
          type="button"
          className="footer-link-button"
          onClick={() => window.open('https://www.netflix.com', '_blank')}
        >
          넷플릭스 이동
        </button>
      </div>

      <div className="footer-text">
        <div>
          <span>프로젝트 주제: Netflix Clone Coding</span>
        </div>
        <div>
          <span>프로젝트 기간: 2025.05.01 ~ 2025.05</span>
        </div>
        <div>
          <span>Tech Stack: React · CSS3 · Vite</span>
        </div>
        <div>
          <span>팀장: 강현아</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
