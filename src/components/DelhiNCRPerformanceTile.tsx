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
const PerformanceTileCard = styled(Card)(() => ({
  borderRadius: '24px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    pointerEvents: 'none',
  }
}));

const MetricCard = styled(Paper)<{ color?: string }>(({ color = '#ffffff' }) => ({
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 40px rgba(0,0,0,0.2), 0 0 0 2px ${color}40`,
  }
}));

const StatusChip = styled(Box)<{ status: string }>(({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Satisfactory': return DSP_COLORS.SATISFACTORY;
      case 'Average': return DSP_COLORS.AVERAGE;
      case 'Unsatisfactory': return DSP_COLORS.UNSATISFACTORY;
      default: return DSP_COLORS.AVERAGE;
    }
  };

  return {
    background: `linear-gradient(135deg, ${getStatusColor()}40 0%, ${getStatusColor()}20 100%)`,
    color: '#ffffff',
    fontWeight: 700,
    fontSize: '0.75rem',
    padding: '6px 16px',
    borderRadius: '20px',
    border: `1px solid ${getStatusColor()}60`,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: `0 4px 16px ${getStatusColor()}20`,
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
            variant="h5"
            component="div"
            sx={{
              color: '#ffffff',
              fontWeight: 800,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              lineHeight: 1,
              fontSize: size > 120 ? '1.8rem' : size > 100 ? '1.4rem' : '1.1rem',
            }}
          >
            {percentage.toFixed(1)}%
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="caption"
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.85rem',
          fontWeight: 500,
          mt: 1,
        }}
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
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
          {label}
        </Typography>
        {showPercentage && (
          <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
            {percentage.toFixed(1)}%
          </Typography>
        )}
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: color,
            borderRadius: 4,
            boxShadow: `0 0 8px ${color}50`,
          },
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.7rem' }}>
          {value.toLocaleString()}
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.7rem' }}>
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
      <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600, mb: 2, textAlign: 'center' }}>
        Top Performing Cities
      </Typography>
      {topCities.map((city) => (
        <Box key={city.id} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>
              {city.cityName}
            </Typography>
            <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
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
    <PerformanceTileCard>
      <CardContent sx={{ padding: '32px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800, 
              color: '#ffffff', 
              mb: 1,
              textShadow: '0 4px 8px rgba(0,0,0,0.3)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Delhi NCR Performance
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              fontWeight: 400,
              mb: 2,
            }}
          >
            Overall Regional Performance Dashboard
          </Typography>
          <StatusChip status={status}>
            {status} Performance ({overallResolutionRate.toFixed(1)}%)
          </StatusChip>
        </Box>

        {/* Main Metrics Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Overall Resolution Rate */}
          <Grid item xs={12} md={4}>
            <MetricCard sx={{ textAlign: 'center', p: 3 }}>
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
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <MetricCard sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    {totalCities}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>
                    Total Cities
                  </Typography>
                </MetricCard>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <MetricCard sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#ff6b6b', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    {totalRaised.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>
                    Total Raised
                  </Typography>
                </MetricCard>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <MetricCard sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#4CAF50', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    {totalResolved.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>
                    Total Resolved
                  </Typography>
                </MetricCard>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <MetricCard sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFC107', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    {avgResolutionTime}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>
                    Avg Days
                  </Typography>
                </MetricCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Performance Distribution */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <MetricCard sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationCityIcon sx={{ color: DSP_COLORS.SATISFACTORY, mr: 1, fontSize: '1.5rem' }} />
                <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Satisfactory Cities
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: DSP_COLORS.SATISFACTORY, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                {satisfactoryCities}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>
                ≥90% Resolution Rate
              </Typography>
            </MetricCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <MetricCard sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon sx={{ color: DSP_COLORS.AVERAGE, mr: 1, fontSize: '1.5rem' }} />
                <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Average Cities
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: DSP_COLORS.AVERAGE, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                {averageCities}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>
                50-89% Resolution Rate
              </Typography>
            </MetricCard>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <MetricCard sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingDownIcon sx={{ color: DSP_COLORS.UNSATISFACTORY, mr: 1, fontSize: '1.5rem' }} />
                <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Needs Attention
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: DSP_COLORS.UNSATISFACTORY, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                {unsatisfactoryCities}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>
                &lt;50% Resolution Rate
              </Typography>
            </MetricCard>
          </Grid>
        </Grid>

        {/* City Performance Chart */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MetricCard sx={{ p: 3 }}>
              <CityPerformanceChart />
            </MetricCard>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <MetricCard sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600, mb: 2, textAlign: 'center' }}>
                Resolution Progress
              </Typography>
              <ProgressBar
                value={totalResolved}
                max={totalRaised}
                color={resolutionColor}
                label="Resolved vs Raised"
              />
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
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