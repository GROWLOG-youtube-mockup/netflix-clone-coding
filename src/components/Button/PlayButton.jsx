import React from 'react';

import playIcon from '../../assets/play.svg';

export default function PlayButton({ onClick = () => {}, className = '' }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      <img className="play-img" alt="Play" src={playIcon} />
      재생
    </button>
  );
}
