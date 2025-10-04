import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Common/Header';
import HeroSection from './HeroSection';
import StatsOverview from './StatsOverview';

const LandingPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0B1220 0%, #0F1B2A 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(1000px 400px at 20% 0%, rgba(122,162,255,0.15) 0%, rgba(122,162,255,0) 60%), radial-gradient(800px 300px at 80% 10%, rgba(255,209,102,0.12) 0%, rgba(255,209,102,0) 60%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Header />
      <HeroSection />
      <StatsOverview />
    </Box>
  );
};

export default LandingPage;
