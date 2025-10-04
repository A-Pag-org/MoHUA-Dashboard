import React, { useState } from 'react';
import { Box, Typography, Container, Button, AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import CityTiles from './CityTiles';

interface DSPButtonProps {
  selected?: boolean;
}

const DSPStyledButton = styled(Button)<DSPButtonProps>(({ selected }) => ({
  margin: '0 8px',
  padding: '12px 24px',
  borderRadius: '12px',
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '1.1rem',
  letterSpacing: '0.5px',
  backgroundColor: selected ? '#2196F3' : '#6B7280',
  color: '#ffffff',
  border: 'none',
  boxShadow: selected 
    ? '0 8px 20px rgba(33, 150, 243, 0.4), 0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)' 
    : '0 4px 12px rgba(107, 114, 128, 0.3), 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
  transform: selected ? 'translateY(-2px)' : 'translateY(0px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: selected 
      ? 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)'
      : 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
    opacity: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: selected 
      ? 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)'
      : 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 100%)',
    opacity: 1,
  },
  '&:hover': {
    backgroundColor: selected ? '#1976D2' : '#5B6470',
    transform: selected ? 'translateY(-3px)' : 'translateY(-1px)',
    boxShadow: selected 
      ? '0 12px 28px rgba(33, 150, 243, 0.5), 0 6px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)' 
      : '0 6px 16px rgba(107, 114, 128, 0.4), 0 3px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
  },
  '&:active': {
    transform: selected ? 'translateY(-1px)' : 'translateY(0px)',
    boxShadow: selected 
      ? '0 4px 12px rgba(33, 150, 243, 0.3), 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
      : '0 2px 8px rgba(107, 114, 128, 0.2), 0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
  },
}));

const DSPDashboard: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<'citywise' | 'performance'>('citywise');

  const handleSectionChange = (section: 'citywise' | 'performance') => {
    setSelectedSection(section);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* DSP Dashboard Header */}
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: '#3e3636', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          top: 0,
          zIndex: 1100,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0 24px' }}>
          {/* MoHUA text on the left */}
          <Typography
            variant="h4"
            component="div"
            sx={{
              color: '#f5f5f5',
              fontWeight: 'bold',
              letterSpacing: '1px',
            }}
          >
            MoHUA
          </Typography>
          
          {/* DSP title in the middle */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: '#f5f5f5',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textAlign: 'center',
              flex: 1,
              marginX: 4,
            }}
          >
            Dispersed Source Programme (DSP)
          </Typography>
          
          {/* Interactive buttons on the right */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DSPStyledButton
              selected={selectedSection === 'citywise'}
              onClick={() => handleSectionChange('citywise')}
            >
              1. City Wise
            </DSPStyledButton>
            <DSPStyledButton
              selected={selectedSection === 'performance'}
              onClick={() => handleSectionChange('performance')}
            >
              2. Performance
            </DSPStyledButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ padding: '40px 0' }}>
        {selectedSection === 'citywise' ? (
          <CityTiles />
        ) : (
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
              Performance Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', marginBottom: '20px' }}>
              This section will display performance metrics and analysis for the Dispersed Source Programme.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
              Selected: 2. Performance
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default DSPDashboard;
