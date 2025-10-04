import React, { useMemo } from 'react';
import { Box, Typography, Card, CardContent, Chip, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import { LeadingCity } from '../../types';
import { MOCK_LEADING_CITIES, DSP_COLORS } from '../../utils/constants';

// Helper functions and styled components to mirror DSP city tile aesthetics
const getPerformanceColor = (percentage: number): string => {
  if (percentage >= 90) return DSP_COLORS.SATISFACTORY;
  if (percentage >= 50) return DSP_COLORS.AVERAGE;
  return DSP_COLORS.UNSATISFACTORY;
};

const getPerformanceStatus = (
  percentage: number
): 'Satisfactory' | 'Average' | 'Unsatisfactory' => {
  if (percentage >= 90) return 'Satisfactory';
  if (percentage >= 50) return 'Average';
  return 'Unsatisfactory';
};

// Color scheme per user requirement for legend/chips
const STATUS_COLORS = {
  SATISFACTORY: '#4CAF50', // Green - >=90%
  AVERAGE: '#FFC107',      // Amber - 50-89%
  UNSATISFACTORY: '#F44336', // Red - <50%
};

const getStatusByPercentage = (
  percentage: number
): 'Satisfactory' | 'Average' | 'Unsatisfactory' => {
  if (percentage >= 90) return 'Satisfactory';
  if (percentage >= 50) return 'Average';
  return 'Unsatisfactory';
};

const getStatusColorByPercentage = (percentage: number): string => {
  const status = getStatusByPercentage(percentage);
  if (status === 'Satisfactory') return STATUS_COLORS.SATISFACTORY;
  if (status === 'Average') return STATUS_COLORS.AVERAGE;
  return STATUS_COLORS.UNSATISFACTORY;
};

const ProgramTileCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'resolutionColor',
})<{ resolutionColor: string }>(({ resolutionColor }) => ({
  minHeight: '280px',
  height: 'auto',
  borderRadius: '16px',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'default',
  position: 'relative',
  overflow: 'hidden',
  background: 'rgba(16, 27, 42, 0.6)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: `0 16px 48px rgba(0,0,0,0.28), 0 0 0 2px ${resolutionColor}33`,
    '&::before': {
      opacity: 1,
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${resolutionColor}14 0%, ${resolutionColor}0A 100%)`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '3px',
    height: '100%',
    background: `linear-gradient(180deg, ${resolutionColor} 0%, ${resolutionColor}99 100%)`,
    borderRadius: '0 1.5px 1.5px 0',
  },
}));

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: string }>(({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Satisfactory':
        return DSP_COLORS.SATISFACTORY;
      case 'Average':
        return DSP_COLORS.AVERAGE;
      case 'Unsatisfactory':
        return DSP_COLORS.UNSATISFACTORY;
      default:
        return DSP_COLORS.AVERAGE;
    }
  };

  return {
    background: `linear-gradient(135deg, ${getStatusColor()}33 0%, ${getStatusColor()}1f 100%)`,
    color: '#E6EDF3',
    fontWeight: 700,
    fontSize: '0.72rem',
    height: '24px',
    borderRadius: '12px',
    border: `1px solid ${getStatusColor()}3d`,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    boxShadow: `0 4px 14px ${getStatusColor()}1f`,
  };
});

const CircularProgressIndicator: React.FC<{
  percentage: number;
  color: string;
  size?: number;
}> = ({ percentage, color, size = 92 }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={4}
        sx={{
          color: 'rgba(255, 255, 255, 0.1)',
          position: 'absolute',
        }}
      />
      <CircularProgress
        variant="determinate"
        value={percentage}
        size={size}
        thickness={4}
        sx={{
          color: color,
          filter: `drop-shadow(0 0 8px ${color}50)`,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: '#ffffff',
            fontWeight: 800,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            lineHeight: 1,
            fontSize: size > 100 ? '1.4rem' : '1.1rem',
          }}
        >
          {percentage.toFixed(1)}%
        </Typography>
      </Box>
    </Box>
  );
};

interface LeaderboardTileProps {
  city: LeadingCity;
}

const LeaderboardTile: React.FC<LeaderboardTileProps> = ({ city }) => {
  const color = getPerformanceColor(city.value);
  const status = getPerformanceStatus(city.value);

  return (
    <ProgramTileCard resolutionColor={color}>
      <CardContent
        sx={{
          padding: '16px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header with city name and status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#ffffff',
                fontSize: '1.1rem',
                lineHeight: 1.2,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {city.name}
            </Typography>
            <Chip
              label={city.program}
              size="small"
              sx={{
                background: 'rgba(255,255,255,0.08)',
                color: '#e6edf3',
                fontWeight: 600,
                height: '22px',
              }}
            />
          </Box>
          <StatusChip label={status} status={status} size="small" />
        </Box>

        {/* Circular Progress Indicator */}
        <Box sx={{ textAlign: 'center', mb: 1.5, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgressIndicator percentage={city.value} color={color} />
        </Box>

        {/* Footer info */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 1,
            pt: 1,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <InfoIcon sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.65)', mr: 0.5 }} />
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.72rem' }}>
            Top in {city.metric}
          </Typography>
        </Box>
      </CardContent>
    </ProgramTileCard>
  );
};

// Removed ProgramButton and quick links as requested

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
      background: 'transparent',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 20 0 L 0 0 0 20" fill="none" stroke="%23f0f0f0" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)"/%3E%3C/svg%3E")',
        opacity: 0.08,
        zIndex: 0
      }
    }}>
      {/* Top-left programs legend (DSP, C&D, MRS) */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 8, md: 16 },
          left: { xs: 8, md: 16 },
          display: 'flex',
          gap: 1,
          zIndex: 2,
        }}
      >
        {['DSP', 'C&D', 'MRS'].map((program) => (
          <Chip
            key={program}
            label={program}
            size="small"
            sx={{
              background: 'rgba(255,255,255,0.08)',
              color: '#e6edf3',
              fontWeight: 700,
              height: 24,
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.12)'
            }}
          />
        ))}
      </Box>

      {/* Bottom-right status legend (Satisfactory, Average, Unsatisfactory) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 8, md: 16 },
          right: { xs: 8, md: 16 },
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            p: 1,
            borderRadius: '12px',
            background: 'rgba(16, 27, 42, 0.6)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: STATUS_COLORS.SATISFACTORY, borderRadius: '3px' }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              Satisfactory (≥90%)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: STATUS_COLORS.AVERAGE, borderRadius: '3px' }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              Average (50-89%)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: STATUS_COLORS.UNSATISFACTORY, borderRadius: '3px' }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              Unsatisfactory (<50%)
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ maxWidth: 1200, mx: 'auto', position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800,
              mb: 1.5,
              background: 'linear-gradient(135deg, #7aa2ff 0%, #89d0ff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            🏆 City Performance Leaderboard
          </Typography>
          {/* City names centered at top with dynamic status colors */}
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap'
            }}
          >
            {calculateLeadingCities.map((city) => {
              const color = getStatusColorByPercentage(city.value);
              return (
                <Chip
                  key={city.id}
                  label={city.name}
                  sx={{
                    background: `linear-gradient(135deg, ${color}33 0%, ${color}1f 100%)`,
                    color: '#E6EDF3',
                    fontWeight: 700,
                    height: 28,
                    borderRadius: '14px',
                    border: `1px solid ${color}55`,
                  }}
                />
              );
            })}
          </Box>
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

        {/* Program quick links removed */}
      </Box>
    </Box>
  );
};

export default HeroSection;