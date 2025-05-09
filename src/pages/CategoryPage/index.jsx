import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { categoryConfig } from '../../api/categoryConfig.js';
import requests from '../../api/requests.js';
import CardsGridView from '../../components/CardsGridView.jsx';
import CardsSlider from '../../components/CardsSlider.jsx';
import Hero from '../../components/Hero.jsx';
import SubHeader from '../../components/SubHeader.jsx';

import '../../styles/CategoryPage.css';

function CategoryPage() {
  const [view, setView] = useState('row');
  const { genreId } = useParams();

  const selectedCategory = genreId || 'home';
  const categoryRequest = selectedCategory === 'series' ? categoryConfig[1] : categoryConfig[2];

  return (
    <div>
      <SubHeader setView={setView} selectedCategory={selectedCategory} />
      {view === 'row' && (
        <div>
          <Hero />
          {categoryRequest.subGenres.map((sub) => (
            <CardsSlider title={sub.title} fetchUrl={requests[sub.requestKey]} key={sub.key} />
          ))}
        </div>
      )}
      {view === 'grid' && (
        <div className="cards-grid-view-container">
          <CardsGridView fetchUrl={requests[categoryRequest.requestKey]} />
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
