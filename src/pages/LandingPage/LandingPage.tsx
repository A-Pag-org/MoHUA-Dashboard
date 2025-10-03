import React from 'react';
import { Box } from '@mui/material';
import Header from '../../components/Common/Header';

const LandingPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />
    </Box>
  );
};

export default LandingPage;
