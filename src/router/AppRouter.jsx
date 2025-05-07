import { Outlet, Route, Routes } from 'react-router-dom';

import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import CategoryPage from '../pages/CategoryPage/index.jsx';
import MainPage from '../pages/MainPage/index.jsx';
import SearchPage from '../pages/SearchPage/index.jsx';

function Layout() {
  return (
    <div>
      <Header />

      <Outlet />
      <Footer />
    </div>
  );
}
export default function AppRouter() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="genre/:genreId" element={<CategoryPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}
