import React, { useState } from 'react';

import requests from '../../api/requests.js';
import BannersSlider from '../../components/BannersSlider.jsx';
import Hero from '../../components/Hero.jsx';
import PreviewModal from '../../components/PreviewModal/PreviewModal.jsx';

function MainPage() {

  const [selectedMovie, setSelectedMovie] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickHandle = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const bannerConfig = [
    { id: 'top10', title: 'TOP 10 시리즈', fetchUrl: requests.top10Series },
    { id: 'trending', title: '지금 뜨는 콘텐츠', fetchUrl: requests.trendingAll },
    { id: 'netflix', title: '넷플릭스 오리지널', fetchUrl: requests.netflixOriginals },
    { id: 'koreanDrama', title: '한국 드라마', fetchUrl: requests.koreanDramaSeries },
    { id: 'koreanMovie', title: '한국 영화', fetchUrl: requests.koreanMovies },
    { id: 'animation', title: '애니메이션', fetchUrl: requests.animationSeries },
    { id: 'reality', title: '리얼리티 TV', fetchUrl: requests.realityTV },
    { id: 'sciFiSeries', title: 'SF & 판타지', fetchUrl: requests.sciFiSeries },
    { id: 'drama', title: '드라마', fetchUrl: requests.dramaSeries },
    { id: 'crime', title: '범죄 영화', fetchUrl: requests.crimeMovies },
    { id: 'family', title: '가족 영화', fetchUrl: requests.familyContent }
  ];

  return (
    <div>
      {isModalOpen && selectedMovie && (
        <PreviewModal selectedMovie={selectedMovie} setIsModalOpen={setIsModalOpen} />
      )}
      <Hero />
      {bannerConfig.map((config) => (
        <BannersSlider key={config.id} title={config.title} fetchUrl={config.fetchUrl} clickHandle={clickHandle}/>
      ))}
    </div>
  );
}

export default MainPage;
