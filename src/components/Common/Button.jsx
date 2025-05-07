import React from 'react';

import '../../styles/Button.css';

function Button({ children, className = '', ...props }) {
  const baseClass = 'Hero_banner-button-common';
  return (
    <button type="button" className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
