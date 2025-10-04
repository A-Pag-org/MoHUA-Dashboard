import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, ButtonProps } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

interface NavButtonProps extends ButtonProps {
  selected?: boolean;
  accent?: string;
}

const StyledButton = styled((props: NavButtonProps) => {
  const { selected, accent, ...rest } = props;
  return <Button {...rest} />;
})<NavButtonProps>(({ selected }) => ({
  margin: '0 8px',
  padding: '12px 28px',
  borderRadius: '12px',
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '1.1rem',
  letterSpacing: '0.5px',
  backgroundColor: selected ? '#4CAF50' : '#6B7280',
  color: '#ffffff',
  border: 'none',
  boxShadow: selected 
    ? '0 8px 20px rgba(76, 175, 80, 0.4), 0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)' 
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
    backgroundColor: selected ? '#45A049' : '#5B6470',
    transform: selected ? 'translateY(-3px)' : 'translateY(-1px)',
    boxShadow: selected 
      ? '0 12px 28px rgba(76, 175, 80, 0.5), 0 6px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)' 
      : '0 6px 16px rgba(107, 114, 128, 0.4), 0 3px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
  },
  '&:active': {
    transform: selected ? 'translateY(-1px)' : 'translateY(0px)',
    boxShadow: selected 
      ? '0 4px 12px rgba(76, 175, 80, 0.3), 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)' 
      : '0 2px 8px rgba(107, 114, 128, 0.2), 0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
  },
}));

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
