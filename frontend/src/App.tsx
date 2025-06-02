import './App.css'

// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Ranking from './pages/Ranking';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="lesson" element={<Lesson />} />
        <Route path="ranking" element={<Ranking />} />
         <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
