import React from 'react';

import '../styles/Footer.css';

import facebook from '../assets/facebook.svg';
import instagram from '../assets/instagram.svg';
import twitter from '../assets/twitter.svg';
import youtube from '../assets/youtube.svg';

function Footer() {
  const socialLinks = [
    { name: 'facebook', icon: facebook },
    { name: 'instagram', icon: instagram },
    { name: 'twitter', icon: twitter },
    { name: 'youtube', icon: youtube }
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
    </div>
  );
}

export default Footer;
