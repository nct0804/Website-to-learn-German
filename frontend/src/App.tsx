import { useAuth } from "./hooks/useAuth";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import Lesson from "./pages/Lesson";
import Ranking from "./pages/Ranking";
import Profile from "./pages/Profile";
import Pronunciation from "./pages/Pronunciation";
import LandingPage from "./pages/LandingPage";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-white">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/lesson" element={<Lesson />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pronunciation" element={<Pronunciation />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
