import React from 'react';

import requests from '../../api/requests.js';
import CardsSlider from '../../components/CardsSlider.jsx';

function MainPage() {
  return (
    <div>
      <CardsSlider title="평단의 찬사! 몰아보기 추천 시리즈" fetchUrl={requests.nowPlaying} />
    </div>
  );
}

export default MainPage;
