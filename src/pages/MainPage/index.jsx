import React, { useState } from 'react';

import requests from '../../api/requests.js';
import CardsGridView from '../../components/CardsGridView.jsx';
import PreviewModal from './PreviewModal/PreviewModal.jsx';

function MainPage() {
  const [selectedMovie, setSelectedMovie] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickHandle = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <div>
      <CardsGridView fetchUrl={requests.trending} />
    </div>
  );
}

export default MainPage;
