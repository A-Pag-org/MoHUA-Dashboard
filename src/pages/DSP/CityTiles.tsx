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
  IconButton,
  CircularProgress,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { DSPCity } from '../../types';
import { DSP_COLORS, MOCK_DSP_CITIES, MOCK_CATEGORY_DATA } from '../../utils/constants';
import CategoryBarChart from './CategoryBarChart';

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
const CityTileCard = styled(Card)(() => ({
  // Reduced height for a more compact tile
  minHeight: '280px',
  height: 'auto',
  borderRadius: '16px',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.18) 0%, rgba(76, 175, 80, 0.32) 100%)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(76, 175, 80, 0.45)',
  boxShadow: '0 8px 24px rgba(76, 175, 80, 0.25)',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.5), 0 18px 56px rgba(76, 175, 80, 0.35)',
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
    background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.22) 0%, rgba(76, 175, 80, 0.12) 100%)',
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
    background: 'linear-gradient(180deg, #4CAF50 0%, rgba(76, 175, 80, 0.7) 100%)',
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
  size = 90 
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
          sx={(theme) => ({
            color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
            fontWeight: 800,
            textShadow: theme.palette.mode === 'dark' ? '0 2px 4px rgba(0,0,0,0.3)' : 'none',
            lineHeight: 1,
            fontSize: size > 120 ? '1.8rem' : size > 100 ? '1.4rem' : '1.1rem',
            maxWidth: `${size * 0.8}px`,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          })}
        >
          {percentage.toFixed(0)}%
        </Typography>
        <Typography
          variant="caption"
          sx={(theme) => ({
            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
            fontSize: size > 120 ? '0.85rem' : size > 100 ? '0.75rem' : '0.65rem',
            fontWeight: 500,
            maxWidth: `${size * 0.9}px`,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          })}
        >
          Resolution
        </Typography>
      </Box>
    </Box>
  );
};

// Category Labels List Component for DONUT view
interface CategoryData {
  category: string;
  raised: number;
  resolved: number;
}

const CategoryLabelsList: React.FC<{ 
  data: CategoryData[];
}> = ({ data }) => {
  // Pleasant readable color palette matching CategoryBarChart
  const CATEGORY_COLORS = [
    '#7aa2ff', '#4fd1c5', '#ffd166', '#fb7185', '#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#f472b6', '#22c55e', '#c084fc', '#38bdf8',
  ];

  return (
    <Box sx={{ 
      maxHeight: 'calc(85vh - 280px)', 
      overflowY: 'auto',
      pr: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 1.5
    }}>
      {data.map((item, index) => (
        <Box 
          key={index}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5,
            p: 1.5,
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Colored Indicator */}
          <Box sx={{ 
            width: 12, 
            height: 12, 
            borderRadius: '50%', 
            background: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
            flexShrink: 0,
          }} />
          
          {/* Label and Value */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ 
              color: '#ffffff', 
              fontWeight: 500,
              fontSize: '0.85rem',
              mb: 0.25
            }}>
              {item.category}
            </Typography>
            <Typography variant="caption" sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.75rem'
            }}>
              Raised: {item.raised.toLocaleString()} | Resolved: {item.resolved.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// Consolidated Gauge Chart Component for Actual Raised and Resolved (full donut with legend)
const ConsolidatedGaugeChart: React.FC<{ 
  raisedValue: number; 
  resolvedValue: number; 
  size?: number 
}> = ({ raisedValue, resolvedValue, size = 195 }) => {
  const resolutionRate = raisedValue > 0 ? Math.min((resolvedValue / raisedValue) * 100, 100) : 0;

  // Fixed color for Raised ring (brand blue)
  const RAISED_COLOR = '#3b82f6';
  // Dynamic color for Resolved ring based on performance thresholds
  // Satisfactory >=90%: Green #4CAF50, Average 50-89%: Amber #FFC107, Unsatisfactory <50%: Red #F44336
  const getResolvedColorForRate = (rate: number): string => {
    if (rate >= 90) return '#4CAF50';
    if (rate >= 50) return '#FFC107';
    return '#F44336';
  };
  const RESOLVED_COLOR = getResolvedColorForRate(resolutionRate);
  const TRACK_COLOR = 'rgba(255, 255, 255, 0.12)';

  const center = size / 2;
  const outerRadius = center - 6; // outer ring padding 6
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
          <Typography 
            variant="h4" 
            sx={(theme) => ({ 
              color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary, 
              fontWeight: 800, 
              textShadow: theme.palette.mode === 'dark' ? '0 2px 4px rgba(0,0,0,0.08)' : 'none' 
            })}
          >
            {resolutionRate.toFixed(1)}%
          </Typography>
          <Typography 
            variant="body2" 
            sx={(theme) => ({ 
              color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.85)' : theme.palette.text.primary 
            })}
          >
            Resolution Rate
          </Typography>
        </Box>
      </Box>

      {/* Legend */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: RAISED_COLOR }} />
          <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary })}>
            Issues Raised ({raisedValue.toLocaleString()})
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: RESOLVED_COLOR }} />
          <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary })}>
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
      <CityTileCard>
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
                sx={(theme) => ({ 
                  fontWeight: 700,
                  color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
                  fontSize: '1.05rem',
                  lineHeight: 1.3,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  pr: 1,
                  textShadow: theme.palette.mode === 'dark' ? '0 2px 6px rgba(0,0,0,0.35)' : 'none',
                  letterSpacing: '0.3px',
                  background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.22) 0%, rgba(76, 175, 80, 0.12) 100%)',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: '1px solid rgba(76, 175, 80, 0.35)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  width: 'fit-content',
                  maxWidth: '65%',
                })}
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
                size={69}
              />
            </Box>

            {/* Complaints data */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'rgba(76, 175, 80, 0.12)',
                padding: '6px 10px',
                borderRadius: '8px',
              }}>
                <Typography variant="body2" sx={{ color: '#000000', fontWeight: 500 }}>
                  Raised:
                </Typography>
                <Typography variant="body2" sx={(theme) => ({ fontWeight: 'bold', color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary })}>
                  {city.complaintsRaised.toLocaleString()}
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'rgba(76, 175, 80, 0.12)',
                padding: '6px 10px',
                borderRadius: '8px',
              }}>
                <Typography variant="body2" sx={{ color: '#000000', fontWeight: 500 }}>
                  Resolved:
                </Typography>
                <Typography variant="body2" sx={(theme) => ({ fontWeight: 'bold', color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary })}>
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
  const [viewMode, setViewMode] = useState<'donut' | 'bar'>('bar');
  
  if (!city) return null;

  const resolutionColor = getResolutionColor(city.resolutionPercentage);
  const status = getResolutionStatus(city.resolutionPercentage);

  return (
      <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          background: 'rgba(16, 27, 42, 0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
          maxHeight: '85vh',
        }
      }}
    >
      <DialogTitle sx={{ 
        background: `linear-gradient(135deg, ${resolutionColor}26 0%, ${resolutionColor}14 100%)`,
        color: 'text.primary',
        pb: 1.5,
        pt: 1.5,
        px: 2,
        borderRadius: '16px 16px 0 0',
      }}>
        {/* Toggle Buttons Row */}
        <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
          <Button 
            variant={viewMode === 'donut' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('donut')}
            size="small"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.75rem',
              color: viewMode === 'donut' ? '#000000' : 'rgba(255, 255, 255, 0.85)',
              background: viewMode === 'donut' ? '#ffffff' : 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '&:hover': {
                background: viewMode === 'donut' ? '#f0f0f0' : 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            DONUT
          </Button>
          <Button 
            variant={viewMode === 'bar' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('bar')}
            size="small"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.75rem',
              color: viewMode === 'bar' ? '#000000' : 'rgba(255, 255, 255, 0.85)',
              background: viewMode === 'bar' ? '#ffffff' : 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '&:hover': {
                background: viewMode === 'bar' ? '#f0f0f0' : 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            BAR
          </Button>
        </Box>

        {/* City Name, Resolution % and Status Row */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              {city.cityName}
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ fontWeight: 800, color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.35)' }}
            >
              {city.resolutionPercentage.toFixed(0)}%
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
        </Box>
      </DialogTitle>

      {/* Stat cards row removed as per requirements */}
      
      <DialogContent sx={{ pt: 1.5, px: 2, pb: 1, background: 'transparent', overflowY: 'auto' }}>
        {/* 2-Column Layout */}
        <Grid container spacing={3}>
          {/* LEFT COLUMN - Gauge Chart */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-start',
              height: '100%',
              minHeight: '300px'
            }}>
              <CircularProgressIndicator 
                percentage={city.resolutionPercentage}
                color={resolutionColor}
                size={140}
              />
            </Box>
          </Grid>

          {/* RIGHT COLUMN - Conditional Chart/Labels based on viewMode */}
          <Grid item xs={12} md={6}>
            {viewMode === 'bar' ? (
              <CategoryBarChart 
                data={MOCK_CATEGORY_DATA[city.id] || []} 
                cityName={city.cityName}
              />
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CategoryLabelsList 
                  data={MOCK_CATEGORY_DATA[city.id] || []}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 1.5, pt: 0.5, background: 'transparent' }}>
        <Button 
          onClick={onClose} 
          variant="contained" 
          sx={{ 
            background: `linear-gradient(135deg, ${resolutionColor} 0%, ${resolutionColor}CC 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${resolutionColor}DD 0%, ${resolutionColor}AA 100%)`,
            },
            borderRadius: '10px',
            px: 2.5,
            py: 0.75,
            fontWeight: 500,
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

        {/* Total Summary Card */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Paper sx={{ 
            maxWidth: 800, 
            borderRadius: '24px', 
            background: (theme) => theme.palette.mode === 'dark' ? 'rgba(16, 27, 42, 0.65)' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: (theme) => theme.palette.mode === 'dark' ? '2px solid rgba(255, 255, 255, 0.35)' : '2px solid rgba(0, 0, 0, 0.15)',
            boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 20px 60px rgba(0,0,0,0.4)' : '0 20px 60px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: (theme) => theme.palette.mode === 'dark' 
                ? `linear-gradient(135deg, ${getResolutionColor(overallResolutionRate)}20 0%, ${getResolutionColor(overallResolutionRate)}10 100%)`
                : 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)',
            }
          }}>
            <CardContent sx={{ textAlign: 'center', py: 4, position: 'relative', zIndex: 1 }}>
              <Typography variant="h4" sx={(theme) => ({ fontWeight: 800, mb: 4, color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', textShadow: theme.palette.mode === 'dark' ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.25)' })}>
                Overall Delhi NCR Performance
              </Typography>
              
              {/* Consolidated Donut with Center Percentage and Legend */}
              <Box sx={{ mb: 4 }}>
                <ConsolidatedGaugeChart
                  raisedValue={totalRaised}
                  resolvedValue={totalResolved}
                  size={210}
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
              border: (theme) => theme.palette.mode === 'dark' ? '2px solid rgba(255, 255, 255, 0.35)' : '2px solid rgba(0, 0, 0, 0.15)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}>
              <CardContent sx={{ py: 3 }}>
                <Typography variant="h4" sx={(theme) => ({ fontWeight: 800, color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', textShadow: theme.palette.mode === 'dark' ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.25)' })}>
                  {totalCities}
                </Typography>
                <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#000000', fontWeight: 500 })}>
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
                <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)', fontWeight: 500 })}>
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
                <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)', fontWeight: 500 })}>
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
                <Typography variant="body2" sx={(theme) => ({ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)', fontWeight: 500 })}>
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