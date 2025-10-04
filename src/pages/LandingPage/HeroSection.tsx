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
          borderTop: `4px solid ${getProgramColor(city.program)}`,
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
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
            background: `linear-gradient(135deg, ${getProgramColor(city.program)}10, ${getProgramColor(city.program)}05)`,
            opacity: 0,
            transition: 'opacity 0.3s ease'
          }
        }}
      >
        <CardContent sx={{ flex: 1, p: 3, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '1.5rem' }}>{getProgramIcon(city.program)}</Typography>
              <Chip 
                label={city.program}
                size="small"
                sx={{ 
                  backgroundColor: getProgramColor(city.program),
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem'
                }}
              />
            </Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold',
                color: getProgramColor(city.program),
                fontSize: '2.2rem',
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
              mb: 1,
              color: '#333',
              fontSize: '1.1rem'
            }}
          >
            {city.name}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#666',
              fontStyle: 'italic',
              mb: 2
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
                fontSize: '0.7rem',
                height: '24px'
              }}
            />
            <Typography variant="caption" sx={{ color: '#888', fontWeight: 'medium' }}>
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
      py: 6, 
      px: 3,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="%23f0f0f0" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)"/%3E%3C/svg%3E")',
        opacity: 0.3,
        zIndex: 0
      }
    }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
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
              color: '#666',
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
          gap: { xs: 2, md: 3 },
          mt: 4,
          mb: 5
        }}>
          {calculateLeadingCities.map((city) => (
            <LeaderboardTile key={city.id} city={city} />
          ))}
        </Box>

        {/* Additional Content to Demonstrate Scrolling */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold',
              mb: 3,
              color: '#333'
            }}
          >
            Program Overview
          </Typography>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
            mt: 4
          }}>
            <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: DSP_COLORS.SATISFACTORY }}>
                🏗️ Digital Service Portal (DSP)
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                Streamlining citizen services through digital transformation. Cities are measured on service delivery efficiency, 
                citizen satisfaction, and digital adoption rates. The leading cities have achieved remarkable improvements in 
                service response times and citizen engagement.
              </Typography>
            </Box>
            
            <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#2196F3' }}>
                ♻️ Construction & Demolition (C&D)
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                Promoting sustainable waste management in construction activities. Performance metrics include waste recycling rates, 
                compliance with regulations, and environmental impact reduction. Top cities have implemented innovative 
                circular economy practices.
              </Typography>
            </Box>
            
            <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#9C27B0' }}>
                🛣️ Motor Registration Service (MRS)
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>
                Enhancing vehicle registration and traffic management systems. Cities are evaluated on registration processing time, 
                road safety improvements, and traffic flow optimization. Leading cities have significantly reduced processing delays 
                and improved road infrastructure.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Statistics Section */}
        <Box sx={{ mt: 6, p: 4, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 3, boxShadow: 2 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              mb: 3,
              textAlign: 'center',
              color: '#333'
            }}
          >
            📊 National Performance Statistics
          </Typography>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
            mt: 3
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: DSP_COLORS.SATISFACTORY }}>
                450+
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Cities Participating
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2196F3' }}>
                89%
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Average Satisfaction
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#9C27B0' }}>
                2.5M+
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Services Delivered
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF9800' }}>
                24/7
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                System Availability
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Call to Action Section */}
        <Box sx={{ mt: 6, textAlign: 'center', pb: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              color: '#333'
            }}
          >
            Ready to Explore City Performance?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#666',
              mb: 4,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Use the navigation above to explore detailed dashboards for each program. 
            Discover insights, track progress, and compare performance across different cities.
          </Typography>
        </Box>

      </Box>
    </Box>
  );
};

export default HeroSection;