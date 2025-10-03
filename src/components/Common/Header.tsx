import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme, selected, accent }: { theme?: any; selected?: boolean; accent?: string }) => ({
  margin: '0 8px',
  padding: '10px 22px',
  borderRadius: '999px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  letterSpacing: '0.3px',
  backgroundColor: selected ? 'rgba(255,255,255,0.08)' : 'transparent',
  color: selected ? '#ffffff' : 'rgba(255,255,255,0.85)',
  border: `1.5px solid ${selected ? (accent || 'rgba(255,255,255,0.48)') : 'rgba(255,255,255,0.28)'}`,
  boxShadow: selected ? '0 8px 16px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.06)' : 'none',
  transform: selected ? 'translateY(-1px)' : 'none',
  transition: 'all 0.25s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '3px',
    background: selected ? (accent || '#ffffff') : 'transparent',
    opacity: selected ? 0.9 : 0,
    transition: 'opacity 0.25s ease',
  },
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 14px rgba(0,0,0,0.35)',
    borderColor: accent || 'rgba(255,255,255,0.45)',
  },
}));

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isSelected = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#3e3636', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 24px' }}>
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
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledButton
            selected={isSelected('/')}
            onClick={() => handleNavigation('/')}
          >
            Dashboard
          </StyledButton>
          <StyledButton
            selected={isSelected('/dsp')}
            accent="#4CAF50"
            onClick={() => handleNavigation('/dsp')}
          >
            DSP
          </StyledButton>
          <StyledButton
            selected={isSelected('/cd')}
            accent="#FFC107"
            onClick={() => handleNavigation('/cd')}
          >
            C&D
          </StyledButton>
          <StyledButton
            selected={isSelected('/mrs')}
            accent="#2196F3"
            onClick={() => handleNavigation('/mrs')}
          >
            MRS
          </StyledButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
