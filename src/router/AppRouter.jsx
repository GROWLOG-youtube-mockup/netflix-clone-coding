import { Outlet, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryPage from '../pages/CategoryPage/index';
import MainPage from '../pages/MainPage/index';
import SearchPage from '../pages/SearchPage/index';

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
        </Route>
      </Routes>
    </div>
  );
}
