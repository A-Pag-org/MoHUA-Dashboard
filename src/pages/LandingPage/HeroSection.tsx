import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LeadingCity } from '../../types';
import { MOCK_LEADING_CITIES } from '../../utils/constants';

const StyledCard = styled(Card)(() => ({
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
  },
}));

const ProgramChip = styled(Chip)<{ program: string }>(({ program }) => ({
  backgroundColor: program === 'DSP' ? '#4CAF50' : program === 'C&D' ? '#FFC107' : '#2196F3',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '0.8rem',
}));

const HeroSection: React.FC = () => {
  return (
    <Box sx={{ padding: '40px 0', backgroundColor: '#f8f9fa' }}>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            textAlign: 'center',
            marginBottom: '16px',
            color: 'primary.main',
            fontWeight: 'bold',
          }}
        >
          Leading Cities Performance
        </Typography>
        
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            marginBottom: '40px',
            color: 'text.secondary',
            maxWidth: '600px',
            margin: '0 auto 40px auto',
          }}
        >
          Top-performing cities across all MoHUA programs based on key performance indicators
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {MOCK_LEADING_CITIES.map((city: LeadingCity) => (
            <Grid item xs={12} sm={6} md={4} key={city.id}>
              <StyledCard>
                <CardContent sx={{ textAlign: 'center', padding: '24px' }}>
                  <ProgramChip 
                    label={city.program} 
                    program={city.program}
                    sx={{ marginBottom: '16px' }}
                  />
                  
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      fontWeight: 'bold',
                      marginBottom: '8px',
                      fontSize: '2.5rem',
                    }}
                  >
                    {city.value}%
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      marginBottom: '8px',
                      fontWeight: '600',
                    }}
                  >
                    {city.name}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.9,
                      fontSize: '0.9rem',
                    }}
                  >
                    {city.metric}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HeroSection;
