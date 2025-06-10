import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Training from './pages/Training';
import Ranking from './pages/Ranking';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* protected */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="lesson" element={<Lesson />} />
          <Route path="ranking" element={<Ranking />} />
          <Route path="profile" element={<Profile />} />
          <Route path="aboutus" element={<AboutUs />} />
        </Route>
      </Route>
    </Routes>
  );
}
