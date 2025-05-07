import React from 'react';

import infoIcon from '../../assets/more-info.svg';

export default function InfoButton({ onClick = () => {}, className = '' }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      <img className="more-info-img" alt="Info" src={infoIcon} />
      상세정보
    </button>
  );
}
