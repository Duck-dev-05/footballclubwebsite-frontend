import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Layout Components
import Navbar from "./Componment/Navbar";
import Footer from "./Componment/Footer";

// Page Components
import WelcomeSection from "./Componment/WelcomeSection";
import AboutUs from "./Componment/AboutUs";
import FeaturedPlayer from "./Componment/FeaturedPlayer";
import Fixtures from "./Componment/Fixtures";
import Contact from "./Componment/Contact";
import ResetPassword from "./Componment/ResetPassword";

// Auth Components
import { Login, Register, ProtectedRoute } from './components/auth';
import { useAuth } from './hooks/useAuth';

// Feature Pages
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import BuyTickets from './pages/BuyTickets';
import Membership from './pages/Membership';
import TicketConfirmation from './pages/TicketConfirmation';
import Gallery from './pages/Gallery';
import TeamCalendar from './components/calendar/TeamCalendar';
import UserProfile from './components/user/UserProfile';

// Styles
import { theme } from './styles/theme';
import './utils/fontawesome';

const App: React.FC = () => {
  const { isLoading } = useAuth();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [scriptLoadRetries, setScriptLoadRetries] = useState(0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const appContent = (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<WelcomeSection />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/FeaturedPlayers" element={<FeaturedPlayer />} />
              <Route path="/fixtures" element={<Fixtures isAdmin={undefined} />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />

              {/* Auth Routes */}
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

              {/* Protected Routes */}
              <Route
                path="/tickets"
                element={
                  <ProtectedRoute allowedRoles={['user', 'admin']}>
                    <BuyTickets />
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
              <Route
                path="/membership"
                element={
                  <ProtectedRoute allowedRoles={['user', 'admin']}>
                    <Membership />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/team-calendar"
                element={
                  <ProtectedRoute allowedRoles={['player', 'admin']}>
                    <TeamCalendar />
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
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );

  if (!clientId) {
    console.error('Google Client ID is not configured');
    return appContent;
  }

  return (
    <GoogleOAuthProvider 
      clientId={clientId}
      onScriptLoadError={() => {
        console.error('Failed to load Google Sign-In script');
        if (scriptLoadRetries < 3) {
          setTimeout(() => {
            setScriptLoadRetries(prev => prev + 1);
          }, 2000);
        }
      }}
      scriptLoadFailureCallback={() => {
        console.error('Google Sign-In script load failed');
      }}
    >
      {appContent}
    </GoogleOAuthProvider>
  );
};

export default App; 