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

  return (
    <div>
      {isModalOpen && selectedMovie && (
        <PreviewModal selectedMovie={selectedMovie} setIsModalOpen={setIsModalOpen} />
      )}

      <Hero />
      <BannersSlider
        title="TOP 10 시리즈"
        fetchUrl={requests.top10Series}
        clickHandle={clickHandle}
      />
      <BannersSlider
        title="지금 뜨는 콘텐츠"
        fetchUrl={requests.trendingAll}
        clickHandle={clickHandle}
      />
      <BannersSlider
        title="넷플릭스 오리지널"
        fetchUrl={requests.netflixOriginals}
        clickHandle={clickHandle}
      />
      <BannersSlider
        title="한국 드라마"
        fetchUrl={requests.koreanDramaSeries}
        clickHandle={clickHandle}
      />
      <BannersSlider title="한국 영화" fetchUrl={requests.koreanMovies} clickHandle={clickHandle} />
      <BannersSlider
        title="애니메이션"
        fetchUrl={requests.animationSeries}
        clickHandle={clickHandle}
      />
      <BannersSlider title="리얼리티 TV" fetchUrl={requests.realityTV} clickHandle={clickHandle} />
      <BannersSlider
        title="SF & 판타지"
        fetchUrl={requests.sciFiSeries}
        clickHandle={clickHandle}
      />
      <BannersSlider title="드라마" fetchUrl={requests.dramaSeries} clickHandle={clickHandle} />
      <BannersSlider title="범죄 영화" fetchUrl={requests.crimeMovies} clickHandle={clickHandle} />
      <BannersSlider
        title="가족 영화"
        fetchUrl={requests.familyContent}
        clickHandle={clickHandle}
      />
    </div>
  );
}

export default MainPage;
