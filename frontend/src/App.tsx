import './App.css'
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Ranking from './pages/Ranking';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import Learn from './pages/Learn';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="lesson" element={<Lesson />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="profile" element={<Profile />} />
        <Route path="aboutus" element={<AboutUs />} />
      </Route>
      <Route path="/learn" element={<Learn />} />
    </Routes>
  );
}
