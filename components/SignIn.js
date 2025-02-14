import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert, Paper, Container } from '@mui/material';
import { db } from '../firebaseConfig'; // Import Firestore
import { collection, getDocs, query, where } from 'firebase/firestore';
import SocialAuth from './auth/SocialAuth';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usersRef = collection(db, 'users'); // Assuming you have a 'users' collection
      const q = query(usersRef, where('email', '==', formData.email), where('password', '==', formData.password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Typography component="h1" variant="h5" align="center">
            Sign In
          </Typography>

          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <SocialAuth />

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Typography
                component="a"
                href="/signup"
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                Sign Up
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn; 