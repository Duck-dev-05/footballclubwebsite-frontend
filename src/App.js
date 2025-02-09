import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CircularProgress, Box, Alert, Snackbar } from '@mui/material';
import './utils/fontawesome';

// Components
import Navbar from "./Componment/Navbar";
import Footer from "./Componment/Footer";
import WelcomeSection from "./Componment/WelcomeSection";
import AboutUs from "./Componment/AboutUs";
import FeaturedPlayer from "./Componment/FeaturedPlayer";
import Fixtures from './Componment/Fixtures';
import Contact from './Componment/Contact';
import Login from './components/Login';
import ResetPassword from './Componment/ResetPassword';
import UserProfile from './components/user/UserProfile';
import TestConnection from './components/TestConnection';

// Pages
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import BuyTickets from './pages/BuyTickets';
import Membership from './pages/Membership';
import TicketConfirmation from './pages/TicketConfirmation';
import Gallery from './pages/Gallery';
import AdminRoutes from './pages/AdminRoutes';

// Utils & Styles
import { cssVariables } from './styles/variables';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Apply CSS variables
        Object.entries(cssVariables).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value);
        });

        // Verify Google Client ID
        const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        if (!googleClientId) {
          throw new Error('Google Client ID is not configured');
        }


        // Wait for Google script to load
        await new Promise((resolve, reject) => {
          if (window.google) {
            resolve();
          } else {
            const checkGoogle = setInterval(() => {
              if (window.google) {
                clearInterval(checkGoogle);
                resolve();
              }
            }, 100);

            // Timeout after 10 seconds
            setTimeout(() => {
              clearInterval(checkGoogle);
              reject(new Error('Google Sign-In initialization timed out'));
            }, 10000);
          }
        });

        setIsLoading(false);
      } catch (err) {
        console.error('Initialization error:', err);
        setError(err.message);
        setShowError(true);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const handleCloseError = () => {
    setShowError(false);
  };

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Snackbar 
        open={showError} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
      >
        <Alert 
          onClose={handleCloseError} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>

      <GoogleOAuthProvider 
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onScriptLoadError={(err) => {
          console.error('Google script load error:', err);
          setError('Failed to load Google Sign-In');
          setShowError(true);
        }}
      >
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<WelcomeSection />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/FeaturedPlayers" element={<FeaturedPlayer />} />
              <Route path="/fixtures" element={<Fixtures />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/test" element={<TestConnection />} />

              {/* Auth Routes */}
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

              {/* Protected Routes */}
              <Route 
                path="/tickets" 
                element={
                  <ProtectedRoute>
                    <BuyTickets />
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
                path="/tickets/confirmation" 
                element={
                  <ProtectedRoute allowedRoles={['user', 'admin']}>
                    <TicketConfirmation />
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

              {/* Admin Routes */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminRoutes />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;