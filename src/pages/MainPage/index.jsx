import React from 'react';

import requests from '../../api/requests.js';
import BannersSlider from '../../components/BannersSlider.jsx';
import Hero from '../../components/Hero.jsx';

function MainPage() {
  return (
    <div>
      <Hero />
      <BannersSlider title="TOP 10 시리즈" fetchUrl={requests.top10Series} />
      <BannersSlider title="지금 뜨는 콘텐츠" fetchUrl={requests.trendingAll} />
      <BannersSlider title="넷플릭스 오리지널" fetchUrl={requests.netflixOriginals} />
      <BannersSlider title="한국 드라마" fetchUrl={requests.koreanDramaSeries} />
      <BannersSlider title="한국 영화" fetchUrl={requests.koreanMovies} />
      <BannersSlider title="애니메이션" fetchUrl={requests.animationSeries} />
      <BannersSlider title="리얼리티 TV" fetchUrl={requests.realityTV} />
      <BannersSlider title="SF & 판타지" fetchUrl={requests.sciFiSeries} />
      <BannersSlider title="드라마" fetchUrl={requests.dramaSeries} />
      <BannersSlider title="범죄 영화" fetchUrl={requests.crimeMovies} />
      <BannersSlider title="가족 영화" fetchUrl={requests.familyContent} />
    </div>
  );
}

export default MainPage;
