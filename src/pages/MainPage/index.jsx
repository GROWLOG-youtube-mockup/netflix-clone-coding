import React from 'react';

import requests from '../../api/requests.js';
import CardsGridView from '../../components/CardsGridView.jsx';

function MainPage() {
  return (
    <div>
      <CardsGridView fetchUrl={requests.trending} />
    </div>
  );
}

export default MainPage;
