import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme, selected }: { theme?: any; selected?: boolean }) => ({
  margin: '0 8px',
  padding: '8px 24px',
  borderRadius: '8px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  backgroundColor: selected ? theme.palette.primary.main : 'transparent',
  color: selected ? 'white' : theme.palette.text.primary,
  border: `2px solid ${selected ? theme.palette.primary.main : '#e0e0e0'}`,
  boxShadow: selected ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
  transform: selected ? 'translateY(-2px)' : 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.dark : theme.palette.grey[100],
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 24px' }}>
        <Typography
          variant="h4"
          component="div"
          sx={{
            color: 'primary.main',
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
            onClick={() => handleNavigation('/dsp')}
          >
            DSP
          </StyledButton>
          <StyledButton
            selected={isSelected('/cd')}
            onClick={() => handleNavigation('/cd')}
          >
            C&D
          </StyledButton>
          <StyledButton
            selected={isSelected('/mrs')}
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
