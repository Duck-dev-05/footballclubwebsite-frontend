import React from 'react';
import TeamCalendar from './calendar/TeamCalendar';
import { Box, Typography, Container, Paper } from '@mui/material';

const WelcomeSection = () => {
  return (
    <Container maxWidth="xl">
      {/* Welcome Banner */}
      <Box sx={{ 
        textAlign: 'center', 
        py: 4,
        mb: 4 
      }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to FC Escuela
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Your premier destination for football excellence
        </Typography>
      </Box>

      {/* Calendar Section */}
      <Paper elevation={3} sx={{ 
        p: 3, 
        mb: 4,
        backgroundColor: '#fff',
        borderRadius: 2
      }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
          Team Schedule
        </Typography>
        <TeamCalendar />
      </Paper>

      {/* Other sections can go here */}
    </Container>
  );
};

export default WelcomeSection; 