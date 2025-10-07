import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocationCityIcon from '@mui/icons-material/LocationCity';
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
  background: theme.palette.mode === 'dark' ? 'rgba(16, 27, 42, 0.6)' : 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
  boxShadow: theme.palette.mode === 'dark' ? '0 12px 36px rgba(0,0,0,0.28)' : '0 12px 36px rgba(0,0,0,0.12)',
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
    background: `linear-gradient(135deg, ${resolutionColor}33 0%, ${resolutionColor}1f 100%)`,
    pointerEvents: 'none',
  }
}));

const MetricCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>(({ theme, color = '#ffffff' }) => ({
  borderRadius: '14px',
  background: theme.palette.mode === 'dark' ? 'rgba(16, 27, 42, 0.55)' : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: theme.palette.mode === 'dark' ? '0 8px 24px rgba(0,0,0,0.22)' : '0 8px 24px rgba(0,0,0,0.12)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? `0 12px 36px rgba(0,0,0,0.28), 0 0 0 2px ${color}30`
      : `0 12px 36px rgba(0,0,0,0.16), 0 0 0 2px ${color}20`,
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

// Circular Progress Indicator Component
const CircularProgressIndicator: React.FC<{ 
  percentage: number; 
  color: string; 
  size?: number;
  label?: string;
}> = ({ percentage, color, size = 120, label = 'Resolution' }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={size}
          thickness={4}
          sx={(theme) => ({
            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
            position: 'absolute',
          })}
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
            variant="h5"
            component="div"
            sx={(theme) => ({
              color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
              fontWeight: 800,
              textShadow: theme.palette.mode === 'dark' ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
              lineHeight: 1,
              fontSize: size > 120 ? '1.8rem' : size > 100 ? '1.4rem' : '1.1rem',
            })}
          >
            {percentage.toFixed(1)}%
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="caption"
        sx={(theme) => ({
          color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          fontSize: '0.85rem',
          fontWeight: 500,
          mt: 1,
        })}
      >
        {label}
      </Typography>
    </Box>
  );
};

// Progress Bar Component
const ProgressBar: React.FC<{ 
  value: number; 
  max: number; 
  color: string; 
  label: string;
  showPercentage?: boolean;
}> = ({ value, max, color, label, showPercentage = true }) => {
  const percentage = (value / max) * 100;
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.75)', fontWeight: 500 })}>
          {label}
        </Typography>
        {showPercentage && (
          <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary, fontWeight: 600 })}>
            {percentage.toFixed(1)}%
          </Typography>
        )}
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={(theme) => ({
          height: 8,
          borderRadius: 4,
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: color,
            borderRadius: 4,
            boxShadow: `0 0 8px ${color}50`,
          },
        })}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
        <Typography variant="caption" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)', fontSize: '0.7rem' })}>
          {value.toLocaleString()}
        </Typography>
        <Typography variant="caption" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)', fontSize: '0.7rem' })}>
          {max.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

// City Performance Chart Component
const CityPerformanceChart: React.FC = () => {
  const sortedCities = [...MOCK_DSP_CITIES].sort((a, b) => b.resolutionPercentage - a.resolutionPercentage);
  const topCities = sortedCities.slice(0, 5);
  
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary, fontWeight: 600, mb: 2, textAlign: 'center' })}>
        Top Performing Cities
      </Typography>
      {topCities.map((city) => (
        <Box key={city.id} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.85)', fontWeight: 500 })}>
              {city.cityName}
            </Typography>
            <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary, fontWeight: 600 })}>
              {city.resolutionPercentage.toFixed(1)}%
            </Typography>
          </Box>
          <ProgressBar
            value={city.resolutionPercentage}
            max={100}
            color={getResolutionColor(city.resolutionPercentage)}
            label=""
            showPercentage={false}
          />
        </Box>
      ))}
    </Box>
  );
};

const DelhiNCRPerformanceTile: React.FC = () => {
  // Calculate overall statistics
  const totalCities = MOCK_DSP_CITIES.length;
  const totalRaised = MOCK_DSP_CITIES.reduce((sum, city) => sum + city.complaintsRaised, 0);
  const totalResolved = MOCK_DSP_CITIES.reduce((sum, city) => sum + city.complaintsResolved, 0);
  const overallResolutionRate = (totalResolved / totalRaised) * 100;
  const resolutionColor = getResolutionColor(overallResolutionRate);
  const status = getResolutionStatus(overallResolutionRate);
  
  // Calculate status distribution
  const satisfactoryCities = MOCK_DSP_CITIES.filter(city => city.resolutionPercentage >= 90).length;
  const averageCities = MOCK_DSP_CITIES.filter(city => city.resolutionPercentage >= 50 && city.resolutionPercentage < 90).length;
  const unsatisfactoryCities = MOCK_DSP_CITIES.filter(city => city.resolutionPercentage < 50).length;
  
  // Calculate average resolution time (mock data)
  const avgResolutionTime = 4.2; // days
  
  return (
    <PerformanceTileCard resolutionColor={resolutionColor}>
      <CardContent sx={{ padding: '24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800, 
              mb: 1,
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
              // Dynamic text gradient based on overall resolution slab
              background: `linear-gradient(135deg, ${resolutionColor} 0%, ${resolutionColor}CC 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Delhi NCR Performance
          </Typography>
          <Typography 
            variant="h6" 
            sx={(theme) => ({ 
              color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)', 
              fontWeight: 400,
              mb: 2,
            })}
          >
            Overall Regional Performance Dashboard
          </Typography>
          <StatusChip status={status}>
            {status} Performance ({overallResolutionRate.toFixed(1)}%)
          </StatusChip>
        </Box>

        {/* Main Metrics Grid */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {/* Overall Resolution Rate */}
          <Grid item xs={12} md={4}>
            <MetricCard color={resolutionColor} sx={{ textAlign: 'center', p: 2.5 }}>
              <CircularProgressIndicator 
                percentage={overallResolutionRate}
                color={resolutionColor}
                size={140}
                label="Overall Resolution"
              />
            </MetricCard>
          </Grid>

          {/* Key Statistics */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={1.5}>
              <Grid item xs={6} sm={3}>
                <MetricCard sx={{ textAlign: 'center', p: 1.75 }}>
                  <Typography variant="h4" sx={(theme) => ({ fontWeight: 800, color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary, textShadow: theme.palette.mode === 'dark' ? '0 2px 4px rgba(0,0,0,0.3)' : 'none' })}>
                    {totalCities}
                  </Typography>
                  <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.65)', fontWeight: 500 })}>
                    Total Cities
                  </Typography>
                </MetricCard>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <MetricCard sx={{ textAlign: 'center', p: 1.75 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#ff6b6b', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    {totalRaised.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.65)', fontWeight: 500 })}>
                    Total Raised
                  </Typography>
                </MetricCard>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <MetricCard sx={{ textAlign: 'center', p: 1.75 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#4CAF50', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    {totalResolved.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.65)', fontWeight: 500 })}>
                    Total Resolved
                  </Typography>
                </MetricCard>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <MetricCard sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFC107', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    {avgResolutionTime}
                  </Typography>
                  <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.65)', fontWeight: 500 })}>
                    Avg Days
                  </Typography>
                </MetricCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Performance Distribution */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <MetricCard sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationCityIcon sx={{ color: DSP_COLORS.SATISFACTORY, mr: 1, fontSize: '1.5rem' }} />
                <Typography variant="h6" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary, fontWeight: 600 })}>
                  Satisfactory Cities
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: DSP_COLORS.SATISFACTORY, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                {satisfactoryCities}
              </Typography>
              <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.65)', fontWeight: 500 })}>
                ≥90% Resolution Rate
              </Typography>
            </MetricCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <MetricCard sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon sx={{ color: DSP_COLORS.AVERAGE, mr: 1, fontSize: '1.5rem' }} />
                <Typography variant="h6" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary, fontWeight: 600 })}>
                  Average Cities
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: DSP_COLORS.AVERAGE, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                {averageCities}
              </Typography>
              <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.65)', fontWeight: 500 })}>
                50-89% Resolution Rate
              </Typography>
            </MetricCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <MetricCard sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingDownIcon sx={{ color: DSP_COLORS.UNSATISFACTORY, mr: 1, fontSize: '1.5rem' }} />
                <Typography variant="h6" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary, fontWeight: 600 })}>
                  Needs Attention
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: DSP_COLORS.UNSATISFACTORY, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                {unsatisfactoryCities}
              </Typography>
              <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.65)', fontWeight: 500 })}>
                &lt;50% Resolution Rate
              </Typography>
            </MetricCard>
          </Grid>
        </Grid>

        {/* City Performance Chart */}
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={6}>
            <MetricCard sx={{ p: 2.5 }}>
              <CityPerformanceChart />
            </MetricCard>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <MetricCard color={resolutionColor} sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary, fontWeight: 600, mb: 2, textAlign: 'center' })}>
                Resolution Progress
              </Typography>
              <ProgressBar
                value={totalResolved}
                max={totalRaised}
                color={resolutionColor}
                label="Resolved vs Raised"
              />
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)', mb: 1 })}>
                  Pending Complaints
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#ff6b6b', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  {(totalRaised - totalResolved).toLocaleString()}
                </Typography>
              </Box>
            </MetricCard>
          </Grid>
        </Grid>
      </CardContent>
    </PerformanceTileCard>
  );
};

export default DelhiNCRPerformanceTile;