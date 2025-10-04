import React, { useState } from 'react';
import { Box, Typography, Container, Button, AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import CityTiles from './CityTiles';
import BackButton from '../../components/Common/BackButton';
import DelhiNCRPerformanceTile from '../../components/DelhiNCRPerformanceTile';

interface DSPButtonProps {
  selected?: boolean;
}

const DSPStyledButton = styled(Button)<DSPButtonProps>(({ selected }) => ({
  margin: '0 6px',
  padding: '14px 32px',
  borderRadius: '16px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '0.95rem',
  letterSpacing: '0.3px',
  background: selected 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : 'rgba(255, 255, 255, 0.1)',
  color: '#ffffff',
  border: selected ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: selected 
    ? '0 8px 32px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
    : '0 4px 16px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  transform: selected ? 'translateY(-2px)' : 'translateY(0px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover': {
    background: selected 
      ? 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
      : 'rgba(255, 255, 255, 0.15)',
    transform: selected ? 'translateY(-3px)' : 'translateY(-1px)',
    boxShadow: selected 
      ? '0 12px 40px rgba(102, 126, 234, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)'
      : '0 6px 24px rgba(0, 0, 0, 0.15)',
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: selected ? 'translateY(-1px)' : 'translateY(0px)',
  },
}));

const DSPDashboard: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<'citywise' | 'performance'>('citywise');

  const handleSectionChange = (section: 'citywise' | 'performance') => {
    setSelectedSection(section);
  };

  return (
    <Box sx={{ 
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
        background: 'radial-gradient(1000px 400px at 20% 0%, rgba(122,162,255,0.15) 0%, rgba(122,162,255,0) 60%), radial-gradient(800px 300px at 80% 10%, rgba(255,209,102,0.12) 0%, rgba(255,209,102,0) 60%)',
        pointerEvents: 'none',
      }
    }}>
      {/* DSP Dashboard Header */}
      <AppBar 
        position="sticky" 
        sx={{ 
          background: 'linear-gradient(135deg, rgba(7, 14, 28, 0.85) 0%, rgba(16, 27, 42, 0.85) 100%)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          top: 0,
          zIndex: 1100,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(122,162,255,0.12) 0%, rgba(255,209,102,0.10) 100%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', padding: '16px 32px', position: 'relative', zIndex: 1 }}>
          {/* Back button on the far left */}
          <BackButton sx={{ marginRight: '16px' }} />
          
          {/* MoHUA text */}
          <Typography
            variant="h4"
            component="div"
            sx={{
              background: 'linear-gradient(135deg, #7aa2ff 0%, #89d0ff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              letterSpacing: '2px',
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }}
          >
            MoHUA
          </Typography>
          
          {/* DSP title in the middle */}
          <Box sx={{ flex: 1, textAlign: 'center', marginX: 4 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
              color: 'text.primary',
                fontWeight: 700,
                letterSpacing: '1px',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                mb: 0.5,
              }}
            >
              Dispersed Source Programme
            </Typography>
            <Typography
              variant="body2"
              sx={{
              color: 'text.secondary',
                fontSize: '0.85rem',
                letterSpacing: '0.5px',
              }}
            >
              Smart City Mission Dashboard
            </Typography>
          </Box>
          
          {/* Interactive buttons on the right */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DSPStyledButton
              selected={selectedSection === 'citywise'}
              onClick={() => handleSectionChange('citywise')}
            >
              City Overview
            </DSPStyledButton>
            <DSPStyledButton
              selected={selectedSection === 'performance'}
              onClick={() => handleSectionChange('performance')}
            >
              Performance
            </DSPStyledButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ padding: '16px 12px', position: 'relative', zIndex: 1 }}>
        {selectedSection === 'citywise' ? (
          <CityTiles />
        ) : (
          <DelhiNCRPerformanceTile />
        )}
      </Container>
    </Box>
  );
};

export default DSPDashboard;
