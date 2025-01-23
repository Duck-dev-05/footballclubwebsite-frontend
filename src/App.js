import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './utils/fontawesome';
import Navbar from "./Componment/Navbar";
import AboutUs from "./Componment/AboutUs";
import FeaturedPlayer from "./Componment/FeaturedPlayer";
import Footer from "./Componment/Footer";
import WelcomeSection from "./Componment/WelcomeSection";
import Login from './Componment/Login';
import Fixtures from './Componment/Fixtures';
import Contact from './Componment/Contact';
import ResetPassword from './Componment/ResetPassword';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import BuyTickets from './pages/BuyTickets';
import { cssVariables } from './styles/variables';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check localStorage for existing login status
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin') {
      setIsAdmin(true);
    }

    // Apply CSS variables
    Object.entries(cssVariables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<WelcomeSection />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/FeaturedPlayers" element={<FeaturedPlayer />} />
          <Route path="/fixtures" element={<Fixtures isAdmin={isAdmin} />} />
          <Route path="/signin" element={<Login setIsAdmin={setIsAdmin} />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/tickets" element={<BuyTickets />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;