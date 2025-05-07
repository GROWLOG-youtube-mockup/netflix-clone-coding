import React from 'react';

import requests from '../../api/requests.js';
import CardsGridView from '../../components/CardsGridView.jsx';
import Hero from '../../components/Hero.jsx';

function MainPage() {
  return (
    <div>
      <Hero />
      <CardsGridView fetchUrl={requests.trendingMovies} />
    </div>
  );
}

export default MainPage;
