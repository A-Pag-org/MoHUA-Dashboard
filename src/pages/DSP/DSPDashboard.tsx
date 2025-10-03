import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Header from '../../components/Common/Header';

const DSPDashboard: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header />
      <Container maxWidth="lg" sx={{ padding: '40px 0' }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            textAlign: 'center',
            marginBottom: '40px',
            color: 'primary.main',
            fontWeight: 'bold',
          }}
        >
          Dispersed Source Programme (DSP)
        </Typography>
        
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: '20px', color: 'text.primary' }}>
            DSP Dashboard Coming Soon
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            This section will contain the detailed DSP dashboard with city tiles, 
            category-wise analysis, and officer pendency tracking as specified in the project plan.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DSPDashboard;
