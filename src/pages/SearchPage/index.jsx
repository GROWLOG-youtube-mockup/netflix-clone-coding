import React from 'react';
import { useSearchParams } from 'react-router-dom';

import CardsGridView from '../../components/CardsGridView.jsx';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('keyword');

  return (
    <div>
      <h2>SearchPage</h2>
      <CardsGridView
        fetchUrl={`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`}
      />
    </div>
  );
}
export default SearchPage;
