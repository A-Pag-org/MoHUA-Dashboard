import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Dialog,
  DialogContent,
  Chip,
  CircularProgress,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// InfoIcon removed (no tile-level dialog)
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import BarChartIcon from '@mui/icons-material/BarChart';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MapIcon from '@mui/icons-material/Map';
import DomainIcon from '@mui/icons-material/Domain';
import { DSPCity } from '../../types';
import { DSP_COLORS, MOCK_DSP_CITIES, MOCK_CATEGORY_DATA } from '../../utils/constants';
import CategoryBarChart from './CategoryBarChart';
import PillButton from '../../components/Common/PillButton';

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
    }
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
  minHeight: '128px',
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

type TabType = 'category' | 'agency' | 'zone' | 'vulnerable';

interface CityTileProps {
  city: DSPCity;
  onOpen: (type: TabType, city: DSPCity) => void;
}

const CityTile: React.FC<CityTileProps> = ({ city, onOpen }) => {
  const resolutionColor = getResolutionColor(city.resolutionPercentage);
  const status = getResolutionStatus(city.resolutionPercentage);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <CityTileCard>
        <CardContent
          sx={{
            padding: '16px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 1,
            gap: 1.25,
          }}
        >
          {/* Header with city name and status */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography
              variant="h6"
              sx={(theme) => ({
                fontWeight: 700,
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                fontSize: '1.05rem',
                lineHeight: 1.3,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                pr: 1,
                textShadow: 'none',
                letterSpacing: '0.3px',
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.22) 0%, rgba(0, 0, 0, 0.12) 100%)',
                padding: '6px 14px',
                borderRadius: '6px',
                border: '1px solid rgba(0, 0, 0, 0.35)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                width: 'fit-content',
                maxWidth: '65%',
              })}
            >
              {city.cityName}
            </Typography>
            <StatusChip label={status} status={status} size="small" />
          </Box>

          {/* Gauge */}
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgressIndicator percentage={city.resolutionPercentage} color={resolutionColor} size={74} />
          </Box>

          {/* Action Tabs in tile as per new spec */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TileTab
              icon={<BarChartIcon sx={{ fontSize: 18 }} />}
              label="Category Wise Resolution (Resolved/Raised)"
              onClick={() => onOpen('category', city)}
            />
            <TileTab
              icon={<ApartmentIcon sx={{ fontSize: 18 }} />}
              label="Agency Wise Resolution Rate"
              onClick={() => onOpen('agency', city)}
            />
            <TileTab
              icon={<DomainIcon sx={{ fontSize: 18 }} />}
              label="Zone/Ward Wise Resolution Rate"
              onClick={() => onOpen('zone', city)}
            />
            <TileTab
              icon={<MapIcon sx={{ fontSize: 18 }} />}
              label="Vulnerable Areas (Map)"
              onClick={() => onOpen('vulnerable', city)}
            />
          </Box>
        </CardContent>
      </CityTileCard>
    </Grid>
  );
};

interface CityDetailsDialogProps {
  city: DSPCity | null;
  open: boolean;
  onClose: () => void;
}

// Removed old CityDetailsDialog in favor of per-tab windows

const CityTiles: React.FC = () => {
  const [consolidatedOpen, setConsolidatedOpen] = useState(false);
  const [tabDialog, setTabDialog] = useState<null | { type: TabType; city: DSPCity }>(null);
  

  // Calculate total statistics from actual data
  const totalRaised = MOCK_DSP_CITIES.reduce((sum, city) => sum + city.complaintsRaised, 0);
  const totalResolved = MOCK_DSP_CITIES.reduce((sum, city) => sum + city.complaintsResolved, 0);
  const overallResolutionRate = (totalResolved / totalRaised * 100);

  // Aggregate consolidated category-wise data across all cities
  const consolidatedCategoryData = useMemo(() => {
    const sums: Record<string, { category: string; raised: number; resolved: number }> = {};
    Object.values(MOCK_CATEGORY_DATA).forEach((arr) => {
      arr.forEach(({ category, raised, resolved }) => {
        const current = sums[category] || { category, raised: 0, resolved: 0 };
        current.raised += raised;
        current.resolved += resolved;
        sums[category] = current;
      });
    });
    return Object.values(sums).sort((a, b) => b.raised - a.raised);
  }, []);

  // Handlers for per-tile tabs
  const openTabDialog = (type: TabType, city: DSPCity) => {
    setTabDialog({ type, city });
  };
  const closeTabDialog = () => setTabDialog(null);

  // Dummy categories per user spec (exact wording)
  const USER_SPEC_CATEGORIES: string[] = [
    'Pothole',
    'Unpaved road',
    'Broken footpath/divider',
    'Unsurfaced parking lots',
    'Malba/bricks/bori etc dumped',
    'Garbage dumped',
    'Mud silt/sand pile',
    'C&D activity without safeguards',
    'Encroachment and building material dumped',
    'Garbage/plastic/leaves burning',
    'Barren land to be greened',
    'Greening of central verges',
  ];

  // Deterministic dummy generator using city id to vary numbers a bit
  const generateCategoryDummy = (city: DSPCity): Array<{ category: string; raised: number; resolved: number }> => {
    const seed = Number(city.id);
    return USER_SPEC_CATEGORIES.map((category, idx) => {
      const base = (seed * 983 + (idx + 1) * 197) % 7000; // 0..6999
      const raised = Math.max(200, 600 + base); // >= 600
      const rateIdx = (seed + idx) % 3; // cycle 0..2
      const rate = rateIdx === 0 ? 0.92 : rateIdx === 1 ? 0.76 : 0.58;
      const resolved = Math.min(raised, Math.round(raised * rate));
      return { category, raised, resolved };
    });
  };

  // Small row for Agency/Zone bars inside dialog
  const BarRow: React.FC<{ label: string; raised: number; resolved: number }> = ({ label, raised, resolved }) => {
    const pct = raised > 0 ? Math.min(100, (resolved / raised) * 100) : 0;
    return (
      <Box sx={{ mb: 1.25 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5, gap: 1, flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: '0.85rem', minWidth: '180px', flex: 1 }}>
            {label}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            {resolved.toLocaleString()} / {raised.toLocaleString()} ({pct.toFixed(1)}%)
          </Typography>
        </Box>
        <Box sx={{ position: 'relative', height: '10px', background: '#363636', borderRadius: '5px', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', inset: 0, width: `${pct}%`, background: pct >= 90 ? DSP_COLORS.SATISFACTORY : pct >= 50 ? DSP_COLORS.AVERAGE : DSP_COLORS.UNSATISFACTORY, boxShadow: `0 0 8px ${pct >= 90 ? DSP_COLORS.SATISFACTORY : pct >= 50 ? DSP_COLORS.AVERAGE : DSP_COLORS.UNSATISFACTORY}55`, transition: 'width 0.5s ease' }} />
        </Box>
      </Box>
    );
  };

  const renderTabDialogContent = () => {
    if (!tabDialog) return null;
    const { type, city } = tabDialog;
    if (type === 'category') {
      const data = generateCategoryDummy(city);
      return (
        <CategoryBarChart data={data} cityName={city.cityName} />
      );
    }
    if (type === 'agency') {
      const rows = (MOCK_AGENCY_DATA[city.id] || []);
      return (
        <Paper sx={{ p: 2, borderRadius: '12px', background: 'rgba(16, 27, 42, 0.55)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, mb: 1.5 }}>{city.cityName} — Agency-wise Resolution</Typography>
          {rows.map((r, i) => (
            <BarRow key={i} label={r.agency} raised={r.raised} resolved={r.resolved} />
          ))}
        </Paper>
      );
    }
    if (type === 'zone') {
      const rows = (MOCK_ZONE_DATA[city.id] || []);
      return (
        <Paper sx={{ p: 2, borderRadius: '12px', background: 'rgba(16, 27, 42, 0.55)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, mb: 1.5 }}>{city.cityName} — Zone/Ward-wise Resolution</Typography>
          {rows.map((r, i) => (
            <BarRow key={i} label={r.zone} raised={r.raised} resolved={r.resolved} />
          ))}
        </Paper>
      );
    }
    // vulnerable
    const points = (MOCK_VULNERABLE_POINTS[city.id] || []);
    return (
      <Paper sx={{ p: 2, borderRadius: '12px', background: 'rgba(16, 27, 42, 0.55)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, mb: 1 }}>
          {city.cityName} — Vulnerable Areas (Dummy)
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', display: 'block', mb: 1.5 }}>
          Showing dummy hotspot list for demo
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {points.map((p, i) => (
            <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>{p.name}</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Lat {p.lat.toFixed(4)}, Lng {p.lng.toFixed(4)} • Severity {p.severity}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    );
  };

  return (
    <Box>
      {/* Merged Header Section: Overall Delhi NCR Performance + Performance Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Left: Overall Delhi NCR Performance Donut Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            borderRadius: '24px', 
            background: (theme) => theme.palette.mode === 'dark' ? 'rgba(16, 27, 42, 0.65)' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: (theme) => theme.palette.mode === 'dark' ? '2px solid rgba(255, 255, 255, 0.35)' : '2px solid rgba(0, 0, 0, 0.15)',
            boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 20px 60px rgba(0,0,0,0.4)' : '0 20px 60px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            position: 'relative',
            height: '100%',
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
            <CardContent sx={{ textAlign: 'center', py: 3.2, position: 'relative', zIndex: 1 }}>
              <Typography variant="h4" sx={(theme) => ({ fontWeight: 800, mb: 3.2, color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', textShadow: theme.palette.mode === 'dark' ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.25)' })}>
                Overall Delhi NCR<br />Performance
              </Typography>
              
              {/* Consolidated Donut with Center Percentage and Legend */}
              <Box sx={{ mb: 3.2 }}>
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

              {/* Action row */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <PillButton onClick={() => setConsolidatedOpen(true)} variant="contained">
                  Category Wise
                </PillButton>
              </Box>
            </CardContent>
          </Paper>
        </Grid>

        {/* Right: Performance Metrics - 3 Tiles */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3} sx={{ height: '100%' }}>
            {/* Fastest Resolution - Green Tile */}
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <ResolutionTimeCard bgColor="#9E9E9E">
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
        </Grid>
      </Grid>

      {/* City Tiles Grid */}
      <Grid container spacing={2}>
        {MOCK_DSP_CITIES.map((city) => (
          <CityTile key={city.id} city={city} onOpen={openTabDialog} />
        ))}
      </Grid>

      {/* Performance Legend */}
      <Box sx={{ 
        mt: 4, 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Paper sx={{
          borderRadius: '16px',
          background: (theme) => theme.palette.mode === 'dark' ? 'rgba(16, 27, 42, 0.65)' : 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          px: 4,
          py: 2,
        }}>
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ 
                width: 16, 
                height: 16, 
                borderRadius: '50%', 
                background: DSP_COLORS.SATISFACTORY,
                boxShadow: `0 0 8px ${DSP_COLORS.SATISFACTORY}40`,
              }} />
              <Typography variant="body2" sx={(theme) => ({ 
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                fontWeight: 600,
              })}>
                Satisfactory (≥90%)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ 
                width: 16, 
                height: 16, 
                borderRadius: '50%', 
                background: DSP_COLORS.AVERAGE,
                boxShadow: `0 0 8px ${DSP_COLORS.AVERAGE}40`,
              }} />
              <Typography variant="body2" sx={(theme) => ({ 
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                fontWeight: 600,
              })}>
                Average (50-89%)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ 
                width: 16, 
                height: 16, 
                borderRadius: '50%', 
                background: DSP_COLORS.UNSATISFACTORY,
                boxShadow: `0 0 8px ${DSP_COLORS.UNSATISFACTORY}40`,
              }} />
              <Typography variant="body2" sx={(theme) => ({ 
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                fontWeight: 600,
              })}>
                Unsatisfactory (&lt;50%)
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Consolidated Category-wise Dialog */}
      <Dialog 
        open={consolidatedOpen} 
        onClose={() => setConsolidatedOpen(false)} 
        maxWidth="lg" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: 'rgba(16, 27, 42, 0.65)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
            maxHeight: '90vh',
            height: '90vh',
          }
        }}
      >
        <DialogContent sx={{ p: 2.5, background: 'transparent', overflow: 'auto', height: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <CategoryBarChart 
            data={consolidatedCategoryData} 
            cityName="Delhi NCR"
          />
        </DialogContent>
      </Dialog>

      {/* Centered dialog for tile tabs */}
      <Dialog
        open={!!tabDialog}
        onClose={closeTabDialog}
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
            maxHeight: '90vh',
          }
        }}
      >
        <DialogContent sx={{ p: 2.5, background: 'transparent', overflow: 'auto' }}>
          {renderTabDialogContent()}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <PillButton onClick={closeTabDialog} variant="contained">Close</PillButton>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CityTiles;

// --------------------- New helpers and dummy datasets (scoped to this file) ---------------------

type AgencyRow = { agency: string; raised: number; resolved: number };
type ZoneRow = { zone: string; raised: number; resolved: number };
type VulnerablePoint = { name: string; lat: number; lng: number; severity: number };

const MOCK_AGENCY_DATA: Record<string, AgencyRow[]> = {
  '1': [
    { agency: 'PWD', raised: 2100, resolved: 620 },
    { agency: 'ULB', raised: 1800, resolved: 520 },
    { agency: 'NHAI', raised: 900, resolved: 280 },
  ],
  '2': [
    { agency: 'PWD', raised: 22000, resolved: 17000 },
    { agency: 'MCD', raised: 18000, resolved: 13500 },
    { agency: 'NDMC', raised: 4800, resolved: 4000 },
  ],
  '3': [
    { agency: 'MCF', raised: 7000, resolved: 5600 },
    { agency: 'PWD', raised: 4500, resolved: 3550 },
  ],
  '4': [
    { agency: 'GMC', raised: 9000, resolved: 7800 },
    { agency: 'PWD', raised: 7200, resolved: 6100 },
  ],
  '5': [
    { agency: 'GNIDA', raised: 4200, resolved: 3200 },
    { agency: 'PWD', raised: 3600, resolved: 2700 },
  ],
  '6': [
    { agency: 'MCG', raised: 6500, resolved: 4300 },
    { agency: 'PWD', raised: 5200, resolved: 3300 },
  ],
  '7': [
    { agency: 'Manesar Authority', raised: 2600, resolved: 2000 },
    { agency: 'PWD', raised: 1800, resolved: 1400 },
  ],
  '8': [
    { agency: 'NOIDA Authority', raised: 5200, resolved: 4900 },
    { agency: 'PWD', raised: 4100, resolved: 3800 },
  ],
};

const MOCK_ZONE_DATA: Record<string, ZoneRow[]> = {
  '1': [
    { zone: 'Zone A', raised: 1200, resolved: 360 },
    { zone: 'Zone B', raised: 1000, resolved: 290 },
    { zone: 'Zone C', raised: 800, resolved: 210 },
  ],
  '2': [
    { zone: 'Central', raised: 12000, resolved: 9800 },
    { zone: 'South', raised: 9000, resolved: 7200 },
    { zone: 'North', raised: 7500, resolved: 5800 },
  ],
  '3': [
    { zone: 'Old City', raised: 4800, resolved: 3800 },
    { zone: 'New City', raised: 3600, resolved: 2900 },
  ],
  '4': [
    { zone: 'Vijay Nagar', raised: 5200, resolved: 4500 },
    { zone: 'Indirapuram', raised: 4200, resolved: 3700 },
  ],
  '5': [
    { zone: 'Alpha', raised: 2100, resolved: 1500 },
    { zone: 'Beta', raised: 1900, resolved: 1450 },
  ],
  '6': [
    { zone: 'DLF', raised: 3000, resolved: 1950 },
    { zone: 'Sec-56', raised: 2200, resolved: 1450 },
  ],
  '7': [
    { zone: 'IMT-1', raised: 1000, resolved: 780 },
    { zone: 'IMT-2', raised: 900, resolved: 700 },
  ],
  '8': [
    { zone: 'Sector 62', raised: 1600, resolved: 1500 },
    { zone: 'Sector 18', raised: 1400, resolved: 1300 },
  ],
};

const CITY_CENTER: Record<string, { lat: number; lng: number }> = {
  '1': { lat: 28.6929, lng: 76.935 }, // Bahadurgarh
  '2': { lat: 28.6139, lng: 77.209 }, // Delhi
  '3': { lat: 28.4089, lng: 77.3178 }, // Faridabad
  '4': { lat: 28.6692, lng: 77.4538 }, // Ghaziabad
  '5': { lat: 28.4744, lng: 77.503 }, // Greater Noida
  '6': { lat: 28.4595, lng: 77.0266 }, // Gurgaon
  '7': { lat: 28.3541, lng: 76.9382 }, // Manesar
  '8': { lat: 28.5355, lng: 77.391 }, // Noida
};

const MOCK_VULNERABLE_POINTS: Record<string, VulnerablePoint[]> = Object.fromEntries(
  Object.keys(CITY_CENTER).map((id) => {
    const c = CITY_CENTER[id];
    // fabricate 3 nearby points for demo
    return [id, [
      { name: 'Hotspot 1', lat: c.lat + 0.03, lng: c.lng + 0.03, severity: 5 },
      { name: 'Hotspot 2', lat: c.lat - 0.02, lng: c.lng + 0.02, severity: 4 },
      { name: 'Hotspot 3', lat: c.lat + 0.01, lng: c.lng - 0.02, severity: 3 },
    ] as VulnerablePoint[]];
  })
);

// Small presentational component for tile actions
function TileTab({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <CardActionArea onClick={onClick}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          background: 'rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(0,0,0,0.15)',
          borderRadius: '10px',
          px: 1.25,
          py: 1,
          color: '#000000',
          transition: 'transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            background: 'rgba(0, 0, 0, 0.18)',
            borderColor: 'rgba(0,0,0,0.25)',
            boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
          },
        }}
      >
        <Box sx={{ display: 'grid', placeItems: 'center', width: 24, height: 24 }}>{icon}</Box>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>{label}</Typography>
      </Box>
    </CardActionArea>
  );
}