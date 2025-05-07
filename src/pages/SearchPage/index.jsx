import React from 'react';
import { useSearchParams } from 'react-router-dom';

import CardsGridView from '../../components/CardsGridView.jsx';
import '../../styles/SearchPage.css';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('keyword');

  return (
    <div className="search-results-container">
      <CardsGridView
        fetchUrl={`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`}
      />
    </div>
  );
}

export default SearchPage;
