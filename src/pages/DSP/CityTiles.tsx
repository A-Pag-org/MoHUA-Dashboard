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
const CityTileCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'resolutionColor',
})<{ resolutionColor: string }>(({ resolutionColor }) => ({
  minHeight: '320px',
  height: 'auto',
  borderRadius: '16px',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
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
    }
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
  }
}));

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: string }>(({ status }) => {
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

// Consolidated Gauge Chart Component for Actual Raised and Resolved (full donut with legend)
const ConsolidatedGaugeChart: React.FC<{ 
  raisedValue: number; 
  resolvedValue: number; 
  size?: number 
}> = ({ raisedValue, resolvedValue, size = 260 }) => {
  const resolutionRate = raisedValue > 0 ? Math.min((resolvedValue / raisedValue) * 100, 100) : 0;

  const RAISED_COLOR = '#3b82f6'; // Blue
  const RESOLVED_COLOR = '#22c55e'; // Green
  const TRACK_COLOR = 'rgba(255, 255, 255, 0.12)';

  const center = size / 2;
  const outerRadius = center - 10; // outer ring padding 10
  const innerRadius = outerRadius - 14; // spacing between rings

  const outerCircumference = 2 * Math.PI * outerRadius;
  const innerCircumference = 2 * Math.PI * innerRadius;

  const innerDasharray = `${innerCircumference} ${innerCircumference}`;
  const innerDashoffset = innerCircumference - (resolutionRate / 100) * innerCircumference;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ position: 'relative', width: size, height: size, mx: 'auto' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <g transform={`rotate(-90 ${center} ${center})`}>
            {/* Outer track */}
            <circle cx={center} cy={center} r={outerRadius} fill="none" stroke={TRACK_COLOR} strokeWidth={10} />
            {/* Outer value (Raised - always full) */}
            <circle
              cx={center}
              cy={center}
              r={outerRadius}
              fill="none"
              stroke={RAISED_COLOR}
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray={`${outerCircumference} ${outerCircumference}`}
              strokeDashoffset={0}
              style={{ filter: `drop-shadow(0 0 8px ${RAISED_COLOR}55)` }}
            />

            {/* Inner track */}
            <circle cx={center} cy={center} r={innerRadius} fill="none" stroke={TRACK_COLOR} strokeWidth={10} />
            {/* Inner value (Resolved as % of Raised) */}
            <circle
              cx={center}
              cy={center}
              r={innerRadius}
              fill="none"
              stroke={RESOLVED_COLOR}
              strokeWidth={10}
              strokeLinecap="round"
              strokeDasharray={innerDasharray}
              strokeDashoffset={innerDashoffset}
              style={{ transition: 'stroke-dashoffset 0.8s ease', filter: `drop-shadow(0 0 8px ${RESOLVED_COLOR}55)` }}
            />
          </g>
        </svg>

        {/* Center content */}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          pointerEvents: 'none'
        }}>
          <Typography variant="h4" sx={{ color: '#111827', fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.08)' }}>
            {resolutionRate.toFixed(1)}%
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
            Resolution Rate
          </Typography>
        </Box>
      </Box>

      {/* Legend */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: RAISED_COLOR }} />
          <Typography variant="body2" sx={{ color: '#ffffff' }}>
            Issues Raised ({raisedValue.toLocaleString()})
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: RESOLVED_COLOR }} />
          <Typography variant="body2" sx={{ color: '#ffffff' }}>
            Issues Resolved ({resolvedValue.toLocaleString()})
          </Typography>
        </Box>
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
            padding: '16px', 
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
            <Box sx={{ textAlign: 'center', mb: 1.5, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgressIndicator 
                percentage={city.resolutionPercentage}
                color={resolutionColor}
                size={92}
              />
            </Box>

            {/* Complaints data */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '6px 10px',
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
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '6px 10px',
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
                mt: 1, 
                pt: 1,
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}>
                <InfoIcon sx={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.65)', mr: 0.5 }} />
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.72rem' }}>
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
          borderRadius: '16px',
          background: 'rgba(16, 27, 42, 0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
        }
      }}
    >
      <DialogTitle sx={{ 
        background: `linear-gradient(135deg, ${resolutionColor}26 0%, ${resolutionColor}14 100%)`,
        color: 'text.primary',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pb: 1.5,
        borderRadius: '16px 16px 0 0',
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
            color: 'rgba(255, 255, 255, 0.85)',
            background: 'rgba(255, 255, 255, 0.08)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.14)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 2, background: 'transparent' }}>
        {/* Circular Progress Indicator */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <CircularProgressIndicator 
            percentage={city.resolutionPercentage}
            color={resolutionColor}
            size={128}
          />
        </Box>

        {/* Detailed statistics */}
        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{ 
              background: 'rgba(16, 27, 42, 0.55)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <CardContent sx={{ textAlign: 'center', py: 2.5 }}>
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
              background: 'rgba(16, 27, 42, 0.55)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}>
              <CardContent sx={{ textAlign: 'center', py: 2.5 }}>
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

        <Divider sx={{ my: 2.5, borderColor: 'rgba(255, 255, 255, 0.12)' }} />

        {/* Additional city information */}
        <Grid container spacing={1.5}>
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              py: 1.5,
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '12px',
              px: 2.5,
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
              py: 1.5,
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '12px',
              px: 2.5,
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
      
      <DialogActions sx={{ p: 2.5, pt: 1, background: 'transparent' }}>
        <Button 
          onClick={onClose} 
          variant="contained" 
          sx={{ 
            background: `linear-gradient(135deg, ${resolutionColor} 0%, ${resolutionColor}CC 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${resolutionColor}DD 0%, ${resolutionColor}AA 100%)`,
            },
            borderRadius: '12px',
            px: 3.5,
            py: 1.25,
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: `0 8px 24px ${resolutionColor}33`,
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
              
              {/* Consolidated Donut with Center Percentage and Legend */}
              <Box sx={{ mb: 4 }}>
                <ConsolidatedGaugeChart
                  raisedValue={totalRaised}
                  resolvedValue={totalResolved}
                  size={240}
                />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <StatusChip 
                  label={getResolutionStatus(overallResolutionRate)} 
                  status={getResolutionStatus(overallResolutionRate)}
                  sx={{ fontSize: '1rem', px: 3, py: 1, height: 'auto' }}
                />
              </Box>
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