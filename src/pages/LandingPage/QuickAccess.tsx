import React from 'react';
import { Box, Typography, Card, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { 
  Assessment as DSPIcon, 
  Construction as CDIcon, 
  Analytics as MRSIcon,
  Dashboard as DashboardIcon 
} from '@mui/icons-material';

const StyledCard = styled(Card)(() => ({
  height: '180px',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
  },
}));

const StyledButton = styled(Button)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  borderRadius: '16px',
  textTransform: 'none',
  fontSize: '1.1rem',
  fontWeight: '600',
}));

const QuickAccess: React.FC = () => {
  const navigate = useNavigate();

  const quickAccessItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Overview & Analytics',
      icon: <DashboardIcon sx={{ fontSize: '3rem', color: 'primary.main' }} />,
      path: '/',
      color: 'primary.main',
    },
    {
      id: 'dsp',
      title: 'DSP',
      description: 'Dispersed Source Programme',
      icon: <DSPIcon sx={{ fontSize: '3rem', color: '#4CAF50' }} />,
      path: '/dsp',
      color: '#4CAF50',
    },
    {
      id: 'cd',
      title: 'C&D',
      description: 'Construction & Development',
      icon: <CDIcon sx={{ fontSize: '3rem', color: '#FFC107' }} />,
      path: '/cd',
      color: '#FFC107',
    },
    {
      id: 'mrs',
      title: 'MRS',
      description: 'Monitoring & Reporting System',
      icon: <MRSIcon sx={{ fontSize: '3rem', color: '#2196F3' }} />,
      path: '/mrs',
      color: '#2196F3',
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ padding: '40px 0', backgroundColor: '#f8f9fa' }}>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: 'center',
            marginBottom: '40px',
            color: 'primary.main',
            fontWeight: 'bold',
          }}
        >
          Quick Access
        </Typography>

        <Grid container spacing={3}>
          {quickAccessItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <StyledCard>
                <StyledButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    '&:hover': {
                      backgroundColor: `${item.color}10`,
                    },
                  }}
                >
                  {item.icon}
                  <Typography
                    variant="h6"
                    sx={{
                      marginTop: '12px',
                      marginBottom: '4px',
                      fontWeight: 'bold',
                      color: item.color,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      textAlign: 'center',
                    }}
                  >
                    {item.description}
                  </Typography>
                </StyledButton>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default QuickAccess;
