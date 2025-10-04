import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Common/Header';
import HeroSection from './HeroSection';

const LandingPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />
      <HeroSection />
    </Box>
  );
};

export default LandingPage;
