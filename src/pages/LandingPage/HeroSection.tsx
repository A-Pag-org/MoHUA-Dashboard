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

// Header program button colors to ensure consistency with leaderboard tiles
const HEADER_PROGRAM_COLORS = {
  'DSP': '#08306b',
  'C&D': '#08519c',
  'MRS': '#2171b5',
} as const;

// Helper for status legend colors is provided by STATUS_COLORS above.

const ProgramTileCard = styled(Card)(() => ({
  minHeight: '280px',
  height: 'auto',
  borderRadius: '16px',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'default',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.16) 100%)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 0, 0, 0.25)',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.5), 0 18px 56px rgba(0, 0, 0, 0.35)',
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
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.22) 0%, rgba(0, 0, 0, 0.12) 100%)',
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
    background: 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.7) 100%)',
    borderRadius: '0 1.5px 1.5px 0',
  },
}));

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: string }>(({ theme, status }) => {
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
    color: theme.palette.mode === 'light' ? '#000000' : '#E6EDF3',
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
}> = ({ percentage, color, size = 69 }) => {
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
          sx={(theme) => ({
            color: theme.palette.mode === 'light' ? '#000000' : '#ffffff',
            fontWeight: 800,
            textShadow: theme.palette.mode === 'light' ? 'none' : '0 2px 4px rgba(0,0,0,0.3)',
            lineHeight: 1,
            fontSize: size > 100 ? '1.4rem' : '1.1rem',
          })}
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
    <ProgramTileCard>
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
        {/* Program label in top left corner */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
          <Chip
            label={city.program}
            size="small"
            sx={() => ({
              backgroundColor: HEADER_PROGRAM_COLORS[city.program],
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.75rem',
              height: '26px',
              borderRadius: '8px',
              border: 'none',
              boxShadow: `0 4px 14px ${HEADER_PROGRAM_COLORS[city.program]}33`,
            })}
          />
        </Box>

        {/* City name in top middle - highlighted and prominent */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography
            variant="h5"
            sx={(theme) => ({
              fontWeight: 900,
              color: theme.palette.mode === 'light' ? '#000000' : '#ffffff',
              fontSize: '1.5rem',
              lineHeight: 1.2,
              textShadow: theme.palette.mode === 'light' ? 'none' : '0 3px 8px rgba(0,0,0,0.35)',
              letterSpacing: '0.5px',
            })}
          >
            {city.name}
          </Typography>
        </Box>

        {/* Circular Progress Indicator */}
        <Box sx={{ textAlign: 'center', mb: 1.5, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgressIndicator percentage={city.value} color={color} />
        </Box>

        {/* Gauge label just below the chart */}
        <Typography
          variant="caption"
          sx={(theme) => ({ color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)', textAlign: 'center', display: 'block', mb: 1 })}
        >
          {city.program === 'DSP'
            ? 'Percentage of Resolution'
            : city.program === 'C&D'
            ? 'Percentage of Target Achieved'
            : 'Percentage of Target achieved'}
        </Typography>

        {/* Footer with metric info and status badge */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 1,
            pt: 1,
            borderTop: '1px solid rgba(0, 0, 0, 0.25)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoIcon sx={(theme) => ({ fontSize: '15px', color: theme.palette.mode === 'light' ? '#000000' : 'rgba(230, 237, 243, 0.85)', mr: 0.5 })} />
            <Typography variant="caption" sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#000000' : 'rgba(230, 237, 243, 0.85)', fontSize: '0.72rem' })}>
              Top in {city.metric}
            </Typography>
          </Box>
          {/* Status badge in bottom right */}
          <StatusChip label={status} status={status} size="small" />
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
      {/* Program legend removed as requested */}

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
              Unsatisfactory (&lt;50%)
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
              fontWeight: 400,
              mb: 1.5,
              color: '#000000',
              textAlign: 'center',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Program Leaderboard: City Wise
          </Typography>
          {/* City chips removed as requested */}
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