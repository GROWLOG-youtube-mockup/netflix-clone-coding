import React from 'react';

import Hero from '../../components/Hero.jsx';
import requests from '../../api/requests.js';
import CardsGridView from '../../components/CardsGridView.jsx';

function MainPage() {
  return (
    <div>
      <Hero />
      <CardsGridView fetchUrl={requests.trendingMovies} />
    </div>
  );
}

export default MainPage;
