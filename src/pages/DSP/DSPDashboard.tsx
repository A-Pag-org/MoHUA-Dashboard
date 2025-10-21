import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import CityTiles from './CityTiles';
import Header from '../../components/Common/Header';


const DSPDashboard: React.FC = () => {
  return (
    <Box sx={(theme) => ({ 
      minHeight: '100vh', 
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg, #0B1220 0%, #0F1B2A 100%)'
        : 'linear-gradient(180deg, #F8FAFF 0%, #FFFFFF 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.palette.mode === 'dark'
          ? 'radial-gradient(1000px 400px at 20% 0%, rgba(122,162,255,0.15) 0%, rgba(122,162,255,0) 60%), radial-gradient(800px 300px at 80% 10%, rgba(255,209,102,0.12) 0%, rgba(255,209,102,0) 60%)'
          : 'radial-gradient(1000px 400px at 20% 0%, rgba(122,162,255,0.12) 0%, rgba(122,162,255,0) 60%), radial-gradient(800px 300px at 80% 10%, rgba(255,209,102,0.10) 0%, rgba(255,209,102,0) 60%)',
        pointerEvents: 'none',
      }
    })}>
      <Header />

      <Container maxWidth="xl" sx={{ padding: '16px 12px', position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            textAlign: 'center', 
            mb: 3, 
            fontWeight: 700,
            color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
          }}
        >
          Dispersed Source Programme (DSP)
        </Typography>
        <CityTiles />
      </Container>
    </Box>
  );
};

export default DSPDashboard;
