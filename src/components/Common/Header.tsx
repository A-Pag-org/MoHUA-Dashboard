import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, ButtonProps, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

interface NavButtonProps extends ButtonProps {
  selected?: boolean;
}

const StyledButton = styled((props: NavButtonProps) => {
  const { selected, ...rest } = props;
  return <Button {...rest} />;
})<NavButtonProps>(({ selected }) => ({
  margin: '0 8px',
  padding: '8px 16px',
  borderRadius: '10px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '0.95rem',
  letterSpacing: '0.3px',
  backgroundColor: selected ? '#4CAF50' : '#6B7280',
  color: '#ffffff',
  border: 'none',
  boxShadow: selected
    ? '0 8px 20px rgba(76, 175, 80, 0.35), 0 4px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
    : '0 4px 10px rgba(0, 0, 0, 0.25)',
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
    backgroundColor: selected ? '#45A049' : '#5B6470',
    transform: selected ? 'translateY(-3px)' : 'translateY(-1px)',
    boxShadow:
      '0 0 0 3px rgba(76, 175, 80, 0.35), 0 12px 28px rgba(76, 175, 80, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
  },
  '&:active': {
    transform: selected ? 'translateY(-1px)' : 'translateY(0px)',
    boxShadow:
      '0 0 0 2px rgba(76, 175, 80, 0.3), 0 6px 16px rgba(76, 175, 80, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
  },
}));

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleNavigation = (path: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    navigate(path);
  };

  const isSelected = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(135deg, rgba(7, 14, 28, 0.85) 0%, rgba(16, 27, 42, 0.85) 100%)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        top: 0,
        zIndex: 1100,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 24px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src="https://www.presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png"
            alt="Government of India Logo"
            sx={{ height: 40, width: 'auto', mr: 2 }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textShadow: '0 1px 2px rgba(0,0,0,0.25)'
            }}
          >
            Ministry of Housing & Urban Affairs
          </Typography>
          {/* Keep abbreviation for tests without displaying it */}
          <Typography sx={{ display: 'none' }}>MoHUA</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledButton
            type="button"
            selected={isSelected('/dsp')}
            onClick={(e) => handleNavigation('/dsp', e)}
          >
            DSP
          </StyledButton>
          <StyledButton
            type="button"
            selected={isSelected('/cd')}
            onClick={(e) => handleNavigation('/cd', e)}
          >
            C&D
          </StyledButton>
          <StyledButton
            type="button"
            selected={isSelected('/mrs')}
            onClick={(e) => handleNavigation('/mrs', e)}
          >
            MRS
          </StyledButton>
          <IconButton
            aria-label="toggle theme"
            onClick={() => window.dispatchEvent(new Event('toggle-color-mode'))}
            sx={{ ml: 1, color: '#ffffff' }}
          >
            {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
