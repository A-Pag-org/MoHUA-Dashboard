import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Divider,
  IconButton,
  CircularProgress,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { DSPCity } from '../../types';
import { DSP_COLORS, MOCK_DSP_CITIES } from '../../utils/constants';

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
const CityTileCard = styled(Card)<{ resolutionColor: string }>(({ resolutionColor }) => ({
  minHeight: '400px',
  height: 'auto',
  borderRadius: '20px',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 60px rgba(0,0,0,0.2), 0 0 0 2px ${resolutionColor}40`,
    '&::before': {
      opacity: 1,
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${resolutionColor}20 0%, ${resolutionColor}10 100%)`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    background: `linear-gradient(180deg, ${resolutionColor} 0%, ${resolutionColor}80 100%)`,
    borderRadius: '0 2px 2px 0',
  }
}));

const StatusChip = styled(Chip)<{ status: string }>(({ status }) => {
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
    height: '28px',
    borderRadius: '14px',
    border: `1px solid ${getStatusColor()}60`,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: `0 4px 16px ${getStatusColor()}20`,
  };
});

// Circular Progress Indicator Component
const CircularProgressIndicator: React.FC<{ percentage: number; color: string; size?: number }> = ({ 
  percentage, 
  color, 
  size = 120 
}) => {
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
          variant="h5"
          component="div"
          sx={{
            color: '#ffffff',
            fontWeight: 800,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            lineHeight: 1,
            fontSize: size > 120 ? '1.8rem' : size > 100 ? '1.4rem' : '1.1rem',
            maxWidth: `${size * 0.8}px`,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {percentage.toFixed(0)}%
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: size > 120 ? '0.85rem' : size > 100 ? '0.75rem' : '0.65rem',
            fontWeight: 500,
            maxWidth: `${size * 0.9}px`,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          Resolution
        </Typography>
      </Box>
    </Box>
  );
};

// Gauge Chart Component inspired by the provided image
const GaugeChart: React.FC<{ 
  value: number; 
  maxValue: number; 
  title: string; 
  color: string; 
  size?: number 
}> = ({ value, maxValue, title, color, size = 160 }) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const radius = (size - 20) / 2;
  const circumference = radius * Math.PI; // Half circle
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Box sx={{ 
      position: 'relative', 
      display: 'inline-flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      width: size,
      height: size * 0.7,
    }}>
      <svg 
        width={size} 
        height={size * 0.7} 
        viewBox={`0 0 ${size} ${size * 0.7}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background arc */}
        <path
          d={`M ${size * 0.15} ${size * 0.5} A ${radius} ${radius} 0 0 1 ${size * 0.85} ${size * 0.5}`}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={`${color}CC`} />
          </linearGradient>
        </defs>
        {/* Progress arc */}
        <path
          d={`M ${size * 0.15} ${size * 0.5} A ${radius} ${radius} 0 0 1 ${size * 0.85} ${size * 0.5}`}
          fill="none"
          stroke={`url(#gradient-${title.replace(/\s+/g, '')})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          style={{
            filter: `drop-shadow(0 0 8px ${color}50)`,
            transition: 'stroke-dashoffset 1s ease-in-out',
          }}
        />
      </svg>
      
      {/* Center content */}
      <Box
        sx={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: '#ffffff',
            fontWeight: 800,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            lineHeight: 1,
            fontSize: '2rem',
            mb: 0.5,
          }}
        >
          {value.toLocaleString()}
        </Typography>
      </Box>
      
      {/* Bottom labels */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.85rem',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
      </Box>
      
      {/* Scale indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 15,
          left: 10,
          fontSize: '0.7rem',
          color: 'rgba(255, 255, 255, 0.6)',
          fontWeight: 500,
        }}
      >
        0
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 15,
          right: 10,
          fontSize: '0.7rem',
          color: 'rgba(255, 255, 255, 0.6)',
          fontWeight: 500,
        }}
      >
        {maxValue.toLocaleString()}
      </Box>
    </Box>
  );
};

interface CityTileProps {
  city: DSPCity;
  onMoreInfo: (city: DSPCity) => void;
}

const CityTile: React.FC<CityTileProps> = ({ city, onMoreInfo }) => {
  const resolutionColor = getResolutionColor(city.resolutionPercentage);
  const status = getResolutionStatus(city.resolutionPercentage);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <CityTileCard resolutionColor={resolutionColor}>
        <CardActionArea onClick={() => onMoreInfo(city)} sx={{ height: '100%' }}>
          <CardContent sx={{ 
            padding: '24px', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
            zIndex: 1,
          }}>
            {/* Header with city name and status */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  lineHeight: 1.2,
                  flex: 1,
                  pr: 1,
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                {city.cityName}
              </Typography>
              <StatusChip 
                label={status} 
                status={status} 
                size="small"
              />
            </Box>

            {/* Circular Progress Indicator */}
            <Box sx={{ textAlign: 'center', mb: 2, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgressIndicator 
                percentage={city.resolutionPercentage}
                color={resolutionColor}
                size={100}
              />
            </Box>

            {/* Complaints data */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '8px 12px',
                borderRadius: '8px',
              }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
                  Raised:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                  {city.complaintsRaised.toLocaleString()}
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '8px 12px',
                borderRadius: '8px',
              }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
                  Resolved:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                  {city.complaintsResolved.toLocaleString()}
                </Typography>
              </Box>

              {/* More info indicator */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mt: 1.5, 
                pt: 1.5,
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
                <InfoIcon sx={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.6)', mr: 0.5 }} />
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem' }}>
                  Click for details
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </CityTileCard>
    </Grid>
  );
};

interface CityDetailsDialogProps {
  city: DSPCity | null;
  open: boolean;
  onClose: () => void;
}

const CityDetailsDialog: React.FC<CityDetailsDialogProps> = ({ city, open, onClose }) => {
  if (!city) return null;

  const resolutionColor = getResolutionColor(city.resolutionPercentage);
  const status = getResolutionStatus(city.resolutionPercentage);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }
      }}
    >
      <DialogTitle sx={{ 
        background: `linear-gradient(135deg, ${resolutionColor}20 0%, ${resolutionColor}10 100%)`,
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pb: 2,
        borderRadius: '20px 20px 0 0',
      }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            {city.cityName}
          </Typography>
          <StatusChip 
            label={status} 
            status={status} 
            size="small"
          />
        </Box>
        <IconButton 
          onClick={onClose} 
          size="small"
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            background: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.2)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3, background: 'transparent' }}>
        {/* Circular Progress Indicator */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <CircularProgressIndicator 
            percentage={city.resolutionPercentage}
            color={resolutionColor}
            size={140}
          />
        </Box>

        {/* Detailed statistics */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <TrendingUpIcon sx={{ fontSize: 40, color: '#ff6b6b', mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  {city.complaintsRaised.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
                  Complaints Raised
                </Typography>
              </CardContent>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Paper sx={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <TrendingDownIcon sx={{ fontSize: 40, color: resolutionColor, mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  {city.complaintsResolved.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
                  Complaints Resolved
                </Typography>
              </CardContent>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Additional city information */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              py: 2,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              px: 3,
            }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: 'rgba(255, 255, 255, 0.8)' }}>
                Issues Raised by Citizens:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 800, color: '#ffffff' }}>
                {city.issuesRaisedByCitizens.toLocaleString()}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              py: 2,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              px: 3,
            }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: 'rgba(255, 255, 255, 0.8)' }}>
                Road Owning Agencies Onboarded:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 800, color: '#ffffff' }}>
                {city.roadOwningAgenciesOnboarded}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 1, background: 'transparent' }}>
        <Button 
          onClick={onClose} 
          variant="contained" 
          sx={{ 
            background: `linear-gradient(135deg, ${resolutionColor} 0%, ${resolutionColor}CC 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${resolutionColor}DD 0%, ${resolutionColor}AA 100%)`,
            },
            borderRadius: '12px',
            px: 4,
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: `0 8px 24px ${resolutionColor}40`,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CityTiles: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<DSPCity | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleMoreInfo = (city: DSPCity) => {
    setSelectedCity(city);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCity(null);
  };

  // Get statistics for the header
  const totalCities = MOCK_DSP_CITIES.length;
  const satisfactoryCities = MOCK_DSP_CITIES.filter(city => city.resolutionPercentage >= 90).length;
  const averageCities = MOCK_DSP_CITIES.filter(city => city.resolutionPercentage >= 50 && city.resolutionPercentage < 90).length;
  const unsatisfactoryCities = MOCK_DSP_CITIES.filter(city => city.resolutionPercentage < 50).length;
  
  // Calculate total statistics from actual data
  const totalRaised = MOCK_DSP_CITIES.reduce((sum, city) => sum + city.complaintsRaised, 0);
  const totalResolved = MOCK_DSP_CITIES.reduce((sum, city) => sum + city.complaintsResolved, 0);
  const overallResolutionRate = (totalResolved / totalRaised * 100);

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800, 
            color: '#ffffff', 
            mb: 2,
            textAlign: 'center',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackdropFilter: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          NCR Cities Overview
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            mb: 3,
            textAlign: 'center',
            maxWidth: '700px',
            mx: 'auto',
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          Real-time dashboard showcasing DSP complaint resolution metrics across National Capital Region cities
        </Typography>

        {/* Total Summary Card */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Paper sx={{ 
            maxWidth: 800, 
            borderRadius: '24px', 
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${getResolutionColor(overallResolutionRate)}20 0%, ${getResolutionColor(overallResolutionRate)}10 100%)`,
            }
          }}>
            <CardContent sx={{ textAlign: 'center', py: 4, position: 'relative', zIndex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                Overall Delhi NCR Performance
              </Typography>
              
              {/* Gauge Charts Row */}
              <Grid container spacing={4} sx={{ mb: 4, justifyContent: 'center' }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <GaugeChart
                      value={totalRaised}
                      maxValue={Math.max(totalRaised, 1000)}
                      title="Actual Raise"
                      color="#ff6b6b"
                      size={180}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <GaugeChart
                      value={totalResolved}
                      maxValue={Math.max(totalRaised, 1000)}
                      title="Actual Resolved"
                      color={getResolutionColor(overallResolutionRate)}
                      size={180}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <CircularProgressIndicator 
                      percentage={overallResolutionRate}
                      color={getResolutionColor(overallResolutionRate)}
                      size={120}
                    />
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mt: 2, 
                        color: 'rgba(255, 255, 255, 0.9)', 
                        fontWeight: 600 
                      }}
                    >
                      Resolution Rate
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <StatusChip 
                label={getResolutionStatus(overallResolutionRate)} 
                status={getResolutionStatus(overallResolutionRate)}
                sx={{ fontSize: '1rem', px: 3, py: 1, height: 'auto' }}
              />
            </CardContent>
          </Paper>
        </Box>

        {/* Summary Statistics */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Paper sx={{ 
              textAlign: 'center', 
              borderRadius: '16px', 
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}>
              <CardContent sx={{ py: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  {totalCities}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>
                  Total Cities
                </Typography>
              </CardContent>
            </Paper>
          </Grid>
          
          <Grid item xs={6} sm={3}>
            <Paper sx={{ 
              textAlign: 'center', 
              borderRadius: '16px',
              background: `rgba(76, 175, 80, 0.2)`,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(76, 175, 80, 0.3)',
              boxShadow: '0 8px 32px rgba(76, 175, 80, 0.1)',
            }}>
              <CardContent sx={{ py: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: DSP_COLORS.SATISFACTORY, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  {satisfactoryCities}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
                  Satisfactory (≥90%)
                </Typography>
              </CardContent>
            </Paper>
          </Grid>
          
          <Grid item xs={6} sm={3}>
            <Paper sx={{ 
              textAlign: 'center', 
              borderRadius: '16px',
              background: `rgba(255, 193, 7, 0.2)`,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 193, 7, 0.3)',
              boxShadow: '0 8px 32px rgba(255, 193, 7, 0.1)',
            }}>
              <CardContent sx={{ py: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: DSP_COLORS.AVERAGE, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  {averageCities}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
                  Average (50-89%)
                </Typography>
              </CardContent>
            </Paper>
          </Grid>
          
          <Grid item xs={6} sm={3}>
            <Paper sx={{ 
              textAlign: 'center', 
              borderRadius: '16px',
              background: `rgba(244, 67, 54, 0.2)`,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(244, 67, 54, 0.3)',
              boxShadow: '0 8px 32px rgba(244, 67, 54, 0.1)',
            }}>
              <CardContent sx={{ py: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: DSP_COLORS.UNSATISFACTORY, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  {unsatisfactoryCities}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>
                  Needs Attention (&lt;50%)
                </Typography>
              </CardContent>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* City Tiles Grid */}
      <Grid container spacing={2}>
        {MOCK_DSP_CITIES.map((city) => (
          <CityTile
            key={city.id}
            city={city}
            onMoreInfo={handleMoreInfo}
          />
        ))}
      </Grid>

      {/* City Details Dialog */}
      <CityDetailsDialog
        city={selectedCity}
        open={dialogOpen}
        onClose={handleCloseDialog}
      />
    </Box>
  );
};

export default CityTiles;