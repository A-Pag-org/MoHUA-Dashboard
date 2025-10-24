import React, { useMemo, useState } from 'react';
import { Box, Typography, Card, CardContent, CircularProgress, Collapse, IconButton, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LeadingCity } from '../../types';
import { MOCK_LEADING_CITIES, DSP_COLORS } from '../../utils/constants';
import PillButton from '../../components/Common/PillButton';

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

// Status legend removed; no local color constants needed here

// Header program button colors to ensure consistency with leaderboard tiles
const HEADER_PROGRAM_COLORS = {
  'DSP': '#08306b',
  'C&D': '#08519c',
  'MRS': '#2171b5',
} as const;

// Helper for status legend colors was removed with legend

const ProgramTileCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})<{ accentColor: string }>(({ accentColor }) => ({
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
    background: `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}b3 100%)`,
    borderRadius: '0 1.5px 1.5px 0',
  },
}));

// StatusChip removed

const CircularProgressIndicator: React.FC<{
  percentage: number;
  color: string;
  size?: number;
  displayDecimals?: number;
}> = ({ percentage, color, size = 92, displayDecimals = 1 }) => {
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
            fontSize: size > 100 ? '1.5rem' : '1.25rem',
          })}
        >
          {percentage.toFixed(displayDecimals)}%
        </Typography>
      </Box>
    </Box>
  );
};

interface LeaderboardTileProps {
  city: LeadingCity;
}

// Program-specific leaderboard row types
type DSPRow = { city: string; raised: number; resolved: number; resolutionPercentage: number; status: 'Satisfactory' | 'Average' | 'Unsatisfactory' };
type CDRow = { city: string; target: number; actual: number; achievementPercentage: number; status: 'Satisfactory' | 'Average' | 'Unsatisfactory' };
type MRSRow = { city: string; targetRoadLength: number; actualRoadLength: number; coveragePercentage: number; status: 'Satisfactory' | 'Average' | 'Unsatisfactory' };

// Local mock datasets for full list leaderboards (kept here to avoid changing other files)
const DSP_LEADERBOARD_DATA: DSPRow[] = [
  { city: 'Bahadurgarh', raised: 7356, resolved: 2169, resolutionPercentage: (2169 / 7356) * 100, status: getPerformanceStatus((2169 / 7356) * 100) },
  { city: 'Delhi', raised: 70550, resolved: 67728, resolutionPercentage: 96.0, status: getPerformanceStatus(96.0) },
  { city: 'Faridabad', raised: 22161, resolved: 17636, resolutionPercentage: (17636 / 22161) * 100, status: getPerformanceStatus((17636 / 22161) * 100) },
  { city: 'Ghaziabad', raised: 30814, resolved: 26505, resolutionPercentage: (26505 / 30814) * 100, status: getPerformanceStatus((26505 / 30814) * 100) },
  { city: 'Greater Noida', raised: 12705, resolved: 9575, resolutionPercentage: (9575 / 12705) * 100, status: getPerformanceStatus((9575 / 12705) * 100) },
  { city: 'Gurgaon', raised: 26169, resolved: 17656, resolutionPercentage: (17656 / 26169) * 100, status: getPerformanceStatus((17656 / 26169) * 100) },
  { city: 'Manesar', raised: 9606, resolved: 7454, resolutionPercentage: (7454 / 9606) * 100, status: getPerformanceStatus((7454 / 9606) * 100) },
  { city: 'Noida', raised: 17742, resolved: 16500, resolutionPercentage: (16500 / 17742) * 100, status: getPerformanceStatus((16500 / 17742) * 100) },
];

const CD_LEADERBOARD_DATA: CDRow[] = [
  { city: 'Delhi', target: 1200, actual: 1150, achievementPercentage: 95.8, status: 'Satisfactory' },
  { city: 'Faridabad', target: 1000, actual: 750, achievementPercentage: 75.0, status: 'Average' },
  { city: 'Ghaziabad', target: 800, actual: 350, achievementPercentage: 43.8, status: 'Unsatisfactory' },
  { city: 'Greater Noida', target: 700, actual: 686, achievementPercentage: 98.0, status: 'Satisfactory' },
  { city: 'Gurgaon', target: 600, actual: 420, achievementPercentage: 70.0, status: 'Average' },
];

const MRS_LEADERBOARD_DATA: MRSRow[] = [
  { city: 'Delhi', targetRoadLength: 2500, actualRoadLength: 2380, coveragePercentage: 95.2, status: 'Satisfactory' },
  { city: 'Faridabad', targetRoadLength: 2200, actualRoadLength: 1650, coveragePercentage: 75.0, status: 'Average' },
  { city: 'Ghaziabad', targetRoadLength: 1800, actualRoadLength: 720, coveragePercentage: 40.0, status: 'Unsatisfactory' },
  { city: 'Greater Noida', targetRoadLength: 1600, actualRoadLength: 1552, coveragePercentage: 97.0, status: 'Satisfactory' },
  { city: 'Gurgaon', targetRoadLength: 1400, actualRoadLength: 910, coveragePercentage: 65.0, status: 'Average' },
];

// Dummy targets for DSP cities to show "Total issues raised vs. target"
const DSP_CITY_TARGETS: Record<string, number> = {
  'Noida': 20000,
  'Ghaziabad': 32000,
  'Faridabad': 23000,
  'Manesar': 10000,
  'Greater Noida': 13000,
  'Gurgaon': 28000,
  'Bahadurgarh': 8000,
  // Delhi is filtered out as top performer in the list
};

const getPercentForProgramRow = (program: 'DSP' | 'C&D' | 'MRS', row: DSPRow | CDRow | MRSRow): number => {
  if (program === 'DSP') return (row as DSPRow).resolutionPercentage;
  if (program === 'C&D') return (row as CDRow).achievementPercentage;
  return (row as MRSRow).coveragePercentage;
};

const ProgramLeaderboard: React.FC<{ 
  program: 'DSP' | 'C&D' | 'MRS';
  accentColor: string;
  rows: Array<DSPRow | CDRow | MRSRow>;
  containerId: string;
}> = ({ program, accentColor, rows, containerId }) => {
  const headerStyles = {
    color: '#ffffff',
    fontWeight: 400,
    fontSize: '0.68rem', // reduced font size
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
  };

  // Determine top performer city based on program
  const topPerformerCity = program === 'DSP' ? 'Delhi' : 'Greater Noida';
  
  // Filter out top performer and sort remaining cities
  const sortedRows = [...rows]
    .filter((row) => (row as any).city !== topPerformerCity)
    .sort((a, b) => getPercentForProgramRow(program, b) - getPercentForProgramRow(program, a));

  return (
    <Box
      id={containerId}
      role="region"
      aria-label={`${program} leaderboard full list`}
      sx={{
        mt: 1.5,
        borderRadius: '12px',
        background: 'rgba(16, 27, 42, 0.65)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        overflow: 'hidden',
        overflowX: 'hidden',
        maxWidth: '100%',
        minWidth: 0,
        fontSize: '0.85rem', // slightly reduce overall font size in dropdown
      }}
    >
      {/* Headings */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '56px 1fr minmax(120px, auto)',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          width: '100%',
          minWidth: 0,
          overflowX: 'hidden',
        }}
      >
        <Typography sx={headerStyles}>Rank</Typography>
        <Typography sx={headerStyles}>City</Typography>
        {program === 'DSP' && (
          <>
            <Typography sx={headerStyles}>Issues Raised Vs Target</Typography>
          </>
        )}
        {program === 'C&D' && (
          <>
            <Typography sx={headerStyles}>Malba Collected Vs Target (MT)</Typography>
          </>
        )}
        {program === 'MRS' && (
          <>
            <Typography sx={headerStyles}>Coverage %</Typography>
          </>
        )}
      </Box>

      <Box sx={{ maxHeight: 260, overflowY: 'auto', overflowX: 'hidden', width: '100%', minWidth: 0 }}>
        {sortedRows.map((row, index) => {
          const percentage = getPercentForProgramRow(program, row);

          const formatNumber = (num: number): string => Math.round(num).toLocaleString();

          let absoluteLabel = '';
          if (program === 'DSP') {
            const r = row as DSPRow;
            const targetForCity = DSP_CITY_TARGETS[r.city] ?? Math.round(r.raised * 1.1);
            absoluteLabel = `${formatNumber(r.raised)} / ${formatNumber(targetForCity)}`;
          } else if (program === 'C&D') {
            const c = row as CDRow;
            absoluteLabel = ` (${formatNumber(c.actual)} / ${formatNumber(c.target)})`;
          } else {
            const m = row as MRSRow;
            absoluteLabel = ` (${formatNumber(m.actualRoadLength)} / ${formatNumber(m.targetRoadLength)} KM)`;
          }

          return (
            <Box key={`${program}-${index}`}
              sx={{
                px: 2,
                py: 1, // slightly tighter row height
                '&:not(:last-of-type)': { borderBottom: '1px solid rgba(255,255,255,0.06)' },
                transition: 'background 0.2s ease',
                '&:hover': { background: 'rgba(255,255,255,0.04)' },
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '56px 1fr minmax(120px, auto)',
                  alignItems: 'center',
                  gap: 1,
                  width: '100%',
                  minWidth: 0,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '14px',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 600, // unbolded slightly
                    color: '#fff',
                    background: `${accentColor}`,
                    boxShadow: `${accentColor}55 0px 4px 14px`,
                  }}>{index + 2}</Box>
                </Box>
                <Typography sx={{ color: '#E6EDF3', fontWeight: 400, fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{(row as any).city}</Typography>

                {program === 'DSP' && (
                  <>
                    <Typography sx={{
                      color: '#ffffff',
                      fontWeight: 400,
                      fontSize: '0.8rem',
                      fontVariantNumeric: 'tabular-nums',
                    }}>{absoluteLabel}</Typography>
                  </>
                )}

                {program === 'C&D' && (
                  <>
                    <Typography sx={{ color: '#fff', fontWeight: 400 }}>{`${Math.round(percentage)}%${absoluteLabel}`}</Typography>
                  </>
                )}

                {program === 'MRS' && (
                  <>
                    <Typography sx={{ color: '#fff', fontWeight: 400 }}>{`${Math.round(percentage)}%${absoluteLabel}`}</Typography>
                  </>
                )}
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.max(0, Math.min(100, percentage))}
                sx={{
                  mt: 1,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: accentColor,
                  },
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const LeaderboardTile: React.FC<LeaderboardTileProps> = ({ city }) => {
  // Change to Percentage Resolved Vs Raised for DSP
  const dspGaugePercentage = (52984 / 70550) * 100;
  const effectivePercentage = city.program === 'DSP' ? dspGaugePercentage : city.value;
  const color = getPerformanceColor(effectivePercentage);
  const [open, setOpen] = useState(false);
  const collapseId = `lb-${city.program.toLowerCase()}-${city.id}`;

  const handleToggle = () => setOpen((prev) => !prev);
  const handleKeyToggle = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((prev) => !prev);
    } else if (e.key === 'Escape') {
      if (open) setOpen(false);
    }
  };

  return (
    <ProgramTileCard accentColor={HEADER_PROGRAM_COLORS[city.program]}>
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
        {/* Header row: Program label (left) */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <PillButton
            type="button"
            sx={{
              backgroundColor: HEADER_PROGRAM_COLORS[city.program],
              '&:hover': { backgroundColor: HEADER_PROGRAM_COLORS[city.program] },
              color: '#ffffff',
              pointerEvents: 'none',
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '0.95rem',
              minHeight: '36px',
              boxShadow: `0 4px 14px ${HEADER_PROGRAM_COLORS[city.program]}33`,
            }}
          >
            {city.program === 'C&D' ? 'SCC' : city.program}
          </PillButton>
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
          <CircularProgressIndicator percentage={effectivePercentage} color={color} displayDecimals={city.program === 'C&D' ? 0 : 1} />
        </Box>

        {/* Gauge label just below the chart */}
        <Typography
          variant="caption"
          sx={(theme) => ({ color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)', textAlign: 'center', display: 'block', mb: 1 })}
        >
          {city.program === 'DSP'
            ? 'Percentage Resolved Vs Raised'
            : city.program === 'C&D'
            ? 'Number of SCCs Set up Vs Target'
            : 'Number of Active MRS units Vs Target'}
        </Typography>

        {/* Footer with metric info */}
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
          {/* Right side intentionally left blank (status removed) */}
        </Box>

        {/* Expandable Leaderboard */}
        <Collapse in={open} timeout={300} unmountOnExit>
          <ProgramLeaderboard
            program={city.program}
            accentColor={HEADER_PROGRAM_COLORS[city.program]}
            rows={city.program === 'DSP' ? DSP_LEADERBOARD_DATA : city.program === 'C&D' ? CD_LEADERBOARD_DATA : MRS_LEADERBOARD_DATA}
            containerId={collapseId}
          />
        </Collapse>
      </CardContent>

      {/* Bottom-center arrow trigger */}
      <Box sx={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 2 }}>
        <IconButton
          aria-label={`Toggle ${city.program} leaderboard`}
          aria-expanded={open}
          aria-controls={collapseId}
          onClick={handleToggle}
          onKeyDown={handleKeyToggle}
          sx={{
            background: 'rgba(16, 27, 42, 0.7)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            color: '#E6EDF3',
            boxShadow: '0 6px 14px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s ease, background 0.2s ease',
            '&:hover': { background: 'rgba(16, 27, 42, 0.85)' },
          }}
          size="small"
        >
          <KeyboardArrowDownIcon sx={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
        </IconButton>
      </Box>
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
            Program Leaderboard (Target based) : City Wise
          </Typography>
          {/* City chips removed as requested */}
        </Box>

        {/* Leaderboard Grid */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 2.5 },
          alignItems: 'start',
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