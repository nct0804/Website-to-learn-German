import './App.css'
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Ranking from './pages/Ranking';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import Learn from './pages/Learn';
import LoginPage from './pages/LoginPage';
import Pronunciation from './pages/Pronunciation';
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
          <Route path='pronunciation' element={<Pronunciation/>} />
        </Route>
      </Route>
      <Route path="/learn" element={<Learn />} />
    </Routes>
  );
}
