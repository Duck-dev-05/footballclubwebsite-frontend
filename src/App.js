import React, { useEffect } from 'react';
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
import Membership from './pages/Membership';
import TicketConfirmation from './pages/TicketConfirmation';
import Gallery from './pages/Gallery';
import { cssVariables } from './styles/variables';
import TeamCalendar from './components/calendar/TeamCalendar';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoutes from './pages/AdminRoutes';
import UserProfile from './components/user/UserProfile';

function App() {
  useEffect(() => {
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
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/tickets" element={<BuyTickets />} />
          <Route 
            path="/membership" 
            element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <Membership />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/tickets/confirmation" 
            element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <TicketConfirmation />
              </ProtectedRoute>
            }
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route 
            path="/team-calendar" 
            element={
              <ProtectedRoute allowedRoles={['player', 'admin']}>
                <TeamCalendar />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminRoutes />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;