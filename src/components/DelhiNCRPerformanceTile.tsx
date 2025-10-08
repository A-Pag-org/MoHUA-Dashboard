import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { DSP_COLORS, MOCK_DSP_CITIES } from '../utils/constants';

// Helper function to get color based on resolution percentage
const getResolutionColor = (percentage: number): string => {
  if (percentage >= 90) return DSP_COLORS.SATISFACTORY;
  if (percentage >= 50) return DSP_COLORS.AVERAGE;
  return DSP_COLORS.UNSATISFACTORY;
};

// Helper function to get status based on resolution percentage
const getResolutionStatus = (percentage: number): 'Satisfactory' | 'Average' | 'Unsatisfactory' => {
  if (percentage >= 90) return 'Satisfactory';
  if (percentage >= 50) return 'Average';
  return 'Unsatisfactory';
};

// Styled components
const PerformanceTileCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'resolutionColor',
})<{ resolutionColor: string }>(({ theme, resolutionColor }) => ({
  borderRadius: '18px',
  background: theme.palette.mode === 'dark' ? 'rgba(16, 27, 42, 0.6)' : 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  // Subtly emphasized boundary
  border: theme.palette.mode === 'dark' 
    ? '1.5px solid rgba(255, 255, 255, 0.16)'
    : '1.5px solid rgba(0, 0, 0, 0.12)',
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 12px 36px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.06)'
    : '0 12px 36px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Dynamic overlay based on overall resolution slab
    background: theme.palette.mode === 'dark' 
      ? `linear-gradient(135deg, ${resolutionColor}33 0%, ${resolutionColor}1f 100%)`
      : 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)',
    pointerEvents: 'none',
  }
}));

const StatusChip = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: string }>(({ theme, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Satisfactory': return DSP_COLORS.SATISFACTORY;
      case 'Average': return DSP_COLORS.AVERAGE;
      case 'Unsatisfactory': return DSP_COLORS.UNSATISFACTORY;
      default: return DSP_COLORS.AVERAGE;
    }
  };

  return {
    background: `linear-gradient(135deg, ${getStatusColor()}33 0%, ${getStatusColor()}1f 100%)`,
    color: theme.palette.mode === 'light' ? theme.palette.text.primary : '#E6EDF3',
    fontWeight: 700,
    fontSize: '0.75rem',
    padding: '6px 14px',
    borderRadius: '16px',
    border: `1px solid ${getStatusColor()}3d`,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    boxShadow: `0 4px 14px ${getStatusColor()}1f`,
    display: 'inline-block',
  };
});

// Performance Tile for resolution time metrics
const ResolutionTimeCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})<{ bgColor: string }>(({ theme, bgColor }) => ({
  borderRadius: '20px',
  background: theme.palette.mode === 'dark' 
    ? `linear-gradient(135deg, ${bgColor}28 0%, ${bgColor}18 100%)`
    : `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}dd 100%)`,
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: theme.palette.mode === 'dark' 
    ? `1.5px solid ${bgColor}50`
    : `1.5px solid ${bgColor}`,
  boxShadow: theme.palette.mode === 'dark'
    ? `0 12px 36px ${bgColor}35`
    : `0 12px 36px ${bgColor}40`,
  minHeight: '160px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark'
      ? `0 16px 48px ${bgColor}45`
      : `0 16px 48px ${bgColor}50`,
  },
}));

const DelhiNCRPerformanceTile: React.FC = () => {
  // Calculate overall statistics
  const totalRaised = MOCK_DSP_CITIES.reduce((sum, city) => sum + city.complaintsRaised, 0);
  const totalResolved = MOCK_DSP_CITIES.reduce((sum, city) => sum + city.complaintsResolved, 0);
  const overallResolutionRate = (totalResolved / totalRaised) * 100;
  const resolutionColor = getResolutionColor(overallResolutionRate);
  const status = getResolutionStatus(overallResolutionRate);
  
  return (
    <PerformanceTileCard resolutionColor={resolutionColor}>
      <CardContent sx={{ padding: '24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography 
            variant="h3" 
            sx={(theme) => ({ 
              fontWeight: 800, 
              mb: 1,
              textShadow: theme.palette.mode === 'dark' ? '0 4px 8px rgba(0,0,0,0.3)' : 'none',
              color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
            })}
          >
            Delhi NCR Performance
          </Typography>
          <Typography 
            variant="h6" 
            sx={(theme) => ({ 
              color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)', 
              fontWeight: 600,
              mb: 2,
            })}
          >
            Overall Regional Performance Dashboard
          </Typography>
          <StatusChip status={status}>
            {status} Performance ({overallResolutionRate.toFixed(1)}%)
          </StatusChip>
        </Box>

        {/* Issue Resolution Time Tiles */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Fastest Resolution - Green Tile */}
          <Grid item xs={12} md={4}>
            <ResolutionTimeCard bgColor="#4CAF50">
              <CardContent sx={{ p: 3, position: 'relative' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#000000', 
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      City with Fastest Issue Resolution
                    </Typography>
                  </Box>
                  <FlashOnIcon sx={{ fontSize: 40, color: '#000000', ml: 1 }} />
                </Box>
                
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800, 
                    color: '#000000',
                    mb: 0.5,
                    textShadow: 'none',
                  }}
                >
                  Noida
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#000000', 
                    fontWeight: 500,
                    fontSize: '0.95rem',
                  }}
                >
                  Noida: 1.8 days avg
                </Typography>
              </CardContent>
            </ResolutionTimeCard>
          </Grid>

          {/* Slowest Resolution - Red Tile */}
          <Grid item xs={12} md={4}>
            <ResolutionTimeCard bgColor="#F44336">
              <CardContent sx={{ p: 3, position: 'relative' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#000000', 
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      City with Slowest Issue Resolution
                    </Typography>
                  </Box>
                  <AccessTimeIcon sx={{ fontSize: 40, color: '#000000', ml: 1 }} />
                </Box>
                
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800, 
                    color: '#000000',
                    mb: 0.5,
                    textShadow: 'none',
                  }}
                >
                  Ghaziabad
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#000000', 
                    fontWeight: 500,
                    fontSize: '0.95rem',
                  }}
                >
                  Ghaziabad: 5.2 days avg
                </Typography>
              </CardContent>
            </ResolutionTimeCard>
          </Grid>

          {/* Average Resolution Time - Blue Tile */}
          <Grid item xs={12} md={4}>
            <ResolutionTimeCard bgColor="#2196F3">
              <CardContent sx={{ p: 3, position: 'relative' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#000000', 
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Average Issue Resolution Time by City
                    </Typography>
                  </Box>
                  <TrackChangesIcon sx={{ fontSize: 40, color: '#000000', ml: 1 }} />
                </Box>
                
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800, 
                    color: '#000000',
                    mb: 0.5,
                    textShadow: 'none',
                  }}
                >
                  3.4 days
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#000000', 
                    fontWeight: 500,
                    fontSize: '0.95rem',
                  }}
                >
                  Avg. Time across all cities
                </Typography>
              </CardContent>
            </ResolutionTimeCard>
          </Grid>
        </Grid>
      </CardContent>
    </PerformanceTileCard>
  );
};

export default DelhiNCRPerformanceTile;