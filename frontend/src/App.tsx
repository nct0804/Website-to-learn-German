import './App.css'

// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Training from './pages/Training';
import Ranking from './pages/Ranking';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import Pronunciation from './pages/Pronunciation';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="pronunciation" element={<Pronunciation />} />
        <Route path="training" element={<Training />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="profile" element={<Profile />} />
        <Route path="aboutus" element={<AboutUs />} />
      </Route>
    </Routes>
  );
}
