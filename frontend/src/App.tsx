import './App.css'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Lesson from './pages/Lesson';
import Ranking from './pages/Ranking';
import Profile from './pages/Profile';
import Learn from './pages/Learn';
import LoginPage from './pages/LoginPage';
import Pronunciation from './pages/Pronunciation';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import { AnimatePresence } from "framer-motion"
import { useAuth } from "./hooks/useAuth";
import LandingPage from "./pages/LandingPage";

export default function App() {
  const location = useLocation()
  const { loading, user } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/* public */}
        <Route path="/" element={
          user ? <Navigate to="/home" replace /> : <LandingPage />
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* protected */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="lesson" element={<Lesson />} />
            <Route path="ranking" element={<Ranking />} />
            <Route path="profile" element={<Profile />} />
            <Route path='pronunciation' element={<Pronunciation/>} />
          </Route>
        </Route>
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </AnimatePresence>
  )
}
