import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PillButton from './PillButton';
// no custom StyledButton; use shared PillButton to match landing page buttons

// Program tab color mapping used across the app (DSP/C&D/MRS)
// Matches the designated colors used for program tiles and buttons
const PROGRAM_HEADER_COLORS: Record<'DSP' | 'C&D' | 'MRS', string> = {
  DSP: '#08306b',
  'C&D': '#08519c',
  MRS: '#2171b5',
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.replace('#', '');
  if (!(normalized.length === 3 || normalized.length === 6)) return null;
  const full = normalized.length === 3
    ? normalized.split('').map((c) => c + c).join('')
    : normalized;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Simple luminance-based contrast: returns '#000000' for light backgrounds, '#ffffff' for dark
function getContrastText(bg: string): '#000000' | '#ffffff' {
  const rgb = hexToRgb(bg);
  if (!rgb) return '#ffffff';
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 150 ? '#000000' : '#ffffff';
}

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

  const pathname = location.pathname;
  const isLandingPage = pathname === '/';

  // Determine the current section based on path
  const currentProgram: 'DSP' | 'C&D' | 'MRS' | 'HOME' = pathname.startsWith('/dsp')
    ? 'DSP'
    : pathname.startsWith('/cd')
      ? 'C&D'
      : pathname.startsWith('/mrs')
        ? 'MRS'
        : 'HOME';

  // Build visible tabs based on current section
  const visibleTabs = React.useMemo(() => {
    switch (currentProgram) {
      case 'DSP':
        return [
          { label: 'Home', path: '/' },
          { label: 'SCC', path: '/cd' },
          { label: 'MRS', path: '/mrs' },
        ];
      case 'C&D':
        return [
          { label: 'Home', path: '/' },
          { label: 'DSP', path: '/dsp' },
          { label: 'MRS', path: '/mrs' },
        ];
      case 'MRS':
        return [
          { label: 'Home', path: '/' },
          { label: 'DSP', path: '/dsp' },
          { label: 'SCC', path: '/cd' },
        ];
      default: // HOME and any other
        return [
          { label: 'DSP', path: '/dsp' },
          { label: 'SCC', path: '/cd' },
          { label: 'MRS', path: '/mrs' },
        ];
    }
  }, [currentProgram]);

  // Apply color accents for landing page program buttons
  const getLandingSx = (path: string) => {
    if (!isLandingPage) return undefined;
    if (path === '/dsp') return { backgroundColor: '#08306b', '&:hover': { backgroundColor: '#08306b' } };
    if (path === '/cd') return { backgroundColor: '#08519c', '&:hover': { backgroundColor: '#08519c' } };
    if (path === '/mrs') return { backgroundColor: '#2171b5', '&:hover': { backgroundColor: '#2171b5' } };
    return undefined;
  };

  // Apply color accents for tabs when inside the DSP section
  // - Match SCC and MRS colors to landing page
  // - Use a blue shade for the Home tab
  const getDspTabsSx = (path: string) => {
    if (currentProgram !== 'DSP') return undefined;
    if (path === '/') return { backgroundColor: '#0b5ed7', '&:hover': { backgroundColor: '#0b5ed7' } }; // Home (blue)
    if (path === '/cd') return { backgroundColor: '#08519c', '&:hover': { backgroundColor: '#08519c' } }; // SCC
    if (path === '/mrs') return { backgroundColor: '#2171b5', '&:hover': { backgroundColor: '#2171b5' } }; // MRS
    return undefined;
  };

  // Determine header background based on current page's designated tab color
  const headerBackground = isLandingPage
    ? '#D5D5D5'
    : currentProgram === 'DSP'
      ? PROGRAM_HEADER_COLORS.DSP
      : currentProgram === 'C&D'
        ? PROGRAM_HEADER_COLORS['C&D']
        : currentProgram === 'MRS'
          ? PROGRAM_HEADER_COLORS.MRS
          : 'linear-gradient(135deg, rgba(7, 14, 28, 0.85) 0%, rgba(16, 27, 42, 0.85) 100%)';

  const headerTextColor: '#000000' | '#ffffff' =
    typeof headerBackground === 'string' && headerBackground.startsWith('#')
      ? getContrastText(headerBackground)
      : '#ffffff';

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: headerBackground,
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
          <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: headerTextColor,
                fontWeight: 800,
                letterSpacing: '0.25px',
                textShadow: '0 1px 2px rgba(0,0,0,0.25)'
              }}
            >
              MoHUA Dashboard
            </Typography>
            <Typography
              variant="subtitle2"
              component="div"
              sx={{
                color: headerTextColor,
                fontWeight: 500,
                opacity: isLandingPage ? 0.9 : 0.9,
                letterSpacing: '0.2px'
              }}
            >
              Ministry of Housing & Urban Affairs
            </Typography>
            {/* Keep abbreviation for tests without displaying it */}
            <Typography sx={{ display: 'none' }}>MoHUA</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {visibleTabs.map((tab) => (
            <PillButton
              key={tab.path}
              type="button"
              selected={isSelected(tab.path)}
              onClick={(e) => handleNavigation(tab.path, e)}
              sx={getLandingSx(tab.path) || getDspTabsSx(tab.path)}
            >
              {tab.label}
            </PillButton>
          ))}
          <IconButton
            aria-label="toggle theme"
            onClick={() => window.dispatchEvent(new Event('toggle-color-mode'))}
            sx={{ ml: 1, color: headerTextColor }}
          >
            {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
