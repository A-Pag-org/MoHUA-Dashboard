import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Common/Header';
import HeroSection from './HeroSection';
import StatsOverview from './StatsOverview';

const LandingPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header />
      <HeroSection />
      <StatsOverview />
    </Box>
  );
};

export default LandingPage;
