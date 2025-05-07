import React from 'react';

export default function Button({
  iconSrc,
  altText = '',
  children,
  className = '',
  onClick = () => {}
}) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {iconSrc && <img className="play-img" alt={altText} src={iconSrc} />}
      {children}
    </button>
  );
}
