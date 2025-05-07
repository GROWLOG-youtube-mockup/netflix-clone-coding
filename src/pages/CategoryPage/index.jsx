import React, { useState } from 'react';

import requests from '../../api/requests.js';
import CardsGridView from '../../components/CardsGridView.jsx';
import CardsSlider from '../../components/CardsSlider.jsx';
import Hero from '../../components/Hero.jsx';
import SubHeader from '../../components/SubHeader.jsx';
import '../../styles/CategoryPage.css';

function CategoryPage() {
  const [view, setView] = useState('row');

  return (
    <div>
      <SubHeader setView={setView} />
      {view === 'row' && (
        <div>
          <Hero />
          <CardsSlider title="코미디 시리즈" fetchUrl={requests.comedySeries} />
        </div>
      )}
      {/* url 임시로 설정 */}
      {view === 'grid' && (
        <div className="cards-grid-view-container">
          <CardsGridView fetchUrl={requests.netflixOriginals} />
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
