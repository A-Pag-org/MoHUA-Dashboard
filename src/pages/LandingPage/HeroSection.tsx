import React, { useMemo } from 'react';
import { Box, Typography, Card, CardContent, Chip, Tooltip } from '@mui/material';
import { LeadingCity } from '../../types';
import { MOCK_LEADING_CITIES, DSP_COLORS } from '../../utils/constants';

interface LeaderboardTileProps {
  city: LeadingCity;
}

const LeaderboardTile: React.FC<LeaderboardTileProps> = ({ city }) => {
  const getProgramColor = (program: string) => {
    switch (program) {
      case 'DSP':
        return DSP_COLORS.SATISFACTORY;
      case 'C&D':
        return '#2196F3'; // Blue
      case 'MRS':
        return '#9C27B0'; // Purple
      default:
        return DSP_COLORS.AVERAGE;
    }
  };

  const getProgramIcon = (program: string) => {
    switch (program) {
      case 'DSP':
        return '🏗️'; // Construction/Infrastructure
      case 'C&D':
        return '♻️'; // Recycling
      case 'MRS':
        return '🛣️'; // Roads
      default:
        return '📊';
    }
  };

  const getPerformanceLabel = (value: number) => {
    if (value >= 90) return 'Excellent';
    if (value >= 75) return 'Good';
    if (value >= 60) return 'Average';
    return 'Needs Improvement';
  };

  const performanceLabel = getPerformanceLabel(city.value);
  const performanceColor = city.value >= 90 ? '#4CAF50' : city.value >= 75 ? '#2196F3' : city.value >= 60 ? '#FF9800' : '#F44336';

  return (
    <Tooltip title={`${city.name} leads in ${city.program} with ${city.value}% ${city.metric}`} arrow>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderTop: `3px solid ${getProgramColor(city.program)}`,
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
          backgroundColor: 'background.paper',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
            '&::before': {
              opacity: 1
            }
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${getProgramColor(city.program)}1a, ${getProgramColor(city.program)}0d)`,
            opacity: 0,
            transition: 'opacity 0.3s ease'
          }
        }}
      >
        <CardContent sx={{ flex: 1, p: 2, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '1.25rem' }}>{getProgramIcon(city.program)}</Typography>
              <Chip 
                label={city.program}
                size="small"
                sx={{ 
                  backgroundColor: getProgramColor(city.program),
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.7rem'
                }}
              />
            </Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold',
                color: getProgramColor(city.program),
                fontSize: '1.8rem',
                lineHeight: 1
              }}
            >
              {city.value.toFixed(1)}%
            </Typography>
          </Box>
          
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              mb: 0.75,
              color: 'text.primary',
              fontSize: '1rem'
            }}
          >
            {city.name}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontStyle: 'italic',
              mb: 1.5
            }}
          >
            Leading in {city.metric}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip
              label={performanceLabel}
              size="small"
              sx={{
                backgroundColor: performanceColor,
                color: 'white',
                fontSize: '0.68rem',
                height: '22px'
              }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'medium' }}>
              #1 City
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Tooltip>
  );
};

const HeroSection: React.FC = () => {
  // In a real application, this would come from props or API calls
  // For now, we'll use the mock data but show how real data would be processed
  const calculateLeadingCities = useMemo(() => {
    // This function would process real data to find leading cities
    // For DSP: Find city with highest resolution percentage
    // For C&D: Find city with highest target achievement percentage  
    // For MRS: Find city with highest road coverage percentage
    
    // Example of how real data processing would work:
    // const dspLeadingCity = dspCities.reduce((prev, current) => 
    //   (current.resolutionPercentage > prev.resolutionPercentage) ? current : prev
    // );
    
    return MOCK_LEADING_CITIES;
  }, []);

  return (
    <Box sx={{ 
      py: 4, 
      px: 2,
      background: 'linear-gradient(180deg, #0B1220 0%, #0F1B2A 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="%23f0f0f0" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)"/%3E%3C/svg%3E")',
        opacity: 0.15,
        zIndex: 0
      }
    }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800,
              mb: 1.5,
              background: 'linear-gradient(45deg, #7aa2ff, #89d0ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            🏆 City Performance Leaderboard
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            Discover the top-performing cities across DSP, C&D, and MRS programs based on key performance indicators. 
            These cities are setting the benchmark for excellence in urban governance.
          </Typography>
        </Box>

        {/* Leaderboard Grid */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 2.5 },
          mt: 3,
          mb: 4
        }}>
          {calculateLeadingCities.map((city) => (
            <LeaderboardTile key={city.id} city={city} />
          ))}
        </Box>


      </Box>
    </Box>
  );
};

export default HeroSection;