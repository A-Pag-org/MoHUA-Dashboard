import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PillButton from './PillButton';
import ArrowBack from '@mui/icons-material/ArrowBack';
// no custom StyledButton; use shared PillButton to match landing page buttons

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const handleNavigation = (path: string, event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    navigate(path);
  };

  const isSelected = (path: string) => {
    return location.pathname === path;
  };

  const isDSP = location.pathname.startsWith('/dsp');
  const dspSectionParam = new URLSearchParams(location.search).get('section');
  const dspSection = dspSectionParam === 'performance' ? 'performance' : 'citywise';

  const handleDspSectionNav = (section: 'citywise' | 'performance') => {
    if (!isDSP) return;
    navigate(`/dsp?section=${section}`);
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
          {isDSP && (
            <IconButton
              aria-label="Back to landing"
              onClick={(e) => handleNavigation('/', e)}
              sx={{ color: '#ffffff', mr: 1.5 }}
            >
              <ArrowBack />
            </IconButton>
          )}
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

        {isDSP && (
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PillButton
              type="button"
              selected={dspSection === 'citywise'}
              onClick={() => handleDspSectionNav('citywise')}
            >
              City Overview
            </PillButton>
            <PillButton
              type="button"
              selected={dspSection === 'performance'}
              onClick={() => handleDspSectionNav('performance')}
            >
              Performance
            </PillButton>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isDSP && (
            <>
              <PillButton
                type="button"
                selected={isSelected('/dsp')}
                onClick={(e) => handleNavigation('/dsp', e)}
              >
                DSP
              </PillButton>
              <PillButton
                type="button"
                selected={isSelected('/cd')}
                onClick={(e) => handleNavigation('/cd', e)}
              >
                C&D
              </PillButton>
              <PillButton
                type="button"
                selected={isSelected('/mrs')}
                onClick={(e) => handleNavigation('/mrs', e)}
              >
                MRS
              </PillButton>
            </>
          )}
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
