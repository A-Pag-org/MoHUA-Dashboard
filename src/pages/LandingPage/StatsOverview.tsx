import React, { useMemo, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CircularProgress, Collapse, IconButton, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PillButton from '../../components/Common/PillButton';
import { DSP_COLORS, MOCK_LEADING_CITIES } from '../../utils/constants';

// Helpers and styled components mirroring the DSP/SCC/MRS tiles used on Home Hero
const getPerformanceColor = (percentage: number): string => {
  if (percentage >= 90) return DSP_COLORS.SATISFACTORY;
  if (percentage >= 50) return DSP_COLORS.AVERAGE;
  return DSP_COLORS.UNSATISFACTORY;
};

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
    '&::before': { opacity: 1 },
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
        sx={{ color: 'rgba(255, 255, 255, 0.1)', position: 'absolute' }}
      />
      <CircularProgress
        variant="determinate"
        value={percentage}
        size={size}
        thickness={4}
        sx={{
          color: color,
          filter: `drop-shadow(0 0 8px ${color}50)`,
          '& .MuiCircularProgress-circle': { strokeLinecap: 'round' },
        }}
      />
      <Box
        sx={{
          top: 0, left: 0, bottom: 0, right: 0,
          position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
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

// Dummy leaderboards for dropdowns
type DSPRow = { city: string; raised: number; resolved: number; resolutionPercentage: number };
type CDRow = { city: string; target: number; actual: number; achievementPercentage: number };
type MRSRow = { city: string; targetUnits: number; actualUnits: number; coveragePercentage: number };

const DSP_LEADERBOARD_DATA: DSPRow[] = [
  { city: 'Bahadurgarh', raised: 7356, resolved: 2169, resolutionPercentage: (2169 / 7356) * 100 },
  { city: 'Delhi', raised: 70550, resolved: 52984, resolutionPercentage: (52984 / 70550) * 100 },
  { city: 'Faridabad', raised: 22161, resolved: 17636, resolutionPercentage: (17636 / 22161) * 100 },
  { city: 'Ghaziabad', raised: 30814, resolved: 26505, resolutionPercentage: (26505 / 30814) * 100 },
  { city: 'Greater Noida', raised: 12705, resolved: 9575, resolutionPercentage: (9575 / 12705) * 100 },
  { city: 'Gurgaon', raised: 26169, resolved: 17656, resolutionPercentage: (17656 / 26169) * 100 },
  { city: 'Manesar', raised: 9606, resolved: 7454, resolutionPercentage: (7454 / 9606) * 100 },
  { city: 'Noida', raised: 17742, resolved: 16500, resolutionPercentage: (16500 / 17742) * 100 },
];

const CD_LEADERBOARD_DATA: CDRow[] = [
  { city: 'Delhi', target: 1200, actual: 1150, achievementPercentage: (1150 / 1200) * 100 },
  { city: 'Faridabad', target: 1000, actual: 750, achievementPercentage: (750 / 1000) * 100 },
  { city: 'Ghaziabad', target: 800, actual: 350, achievementPercentage: (350 / 800) * 100 },
  { city: 'Greater Noida', target: 700, actual: 686, achievementPercentage: (686 / 700) * 100 },
  { city: 'Gurgaon', target: 600, actual: 420, achievementPercentage: (420 / 600) * 100 },
];

const MRS_LEADERBOARD_DATA: MRSRow[] = [
  { city: 'Delhi', targetUnits: 50, actualUnits: 48, coveragePercentage: (48 / 50) * 100 },
  { city: 'Faridabad', targetUnits: 30, actualUnits: 22, coveragePercentage: (22 / 30) * 100 },
  { city: 'Ghaziabad', targetUnits: 24, actualUnits: 10, coveragePercentage: (10 / 24) * 100 },
  { city: 'Greater Noida', targetUnits: 20, actualUnits: 19, coveragePercentage: (19 / 20) * 100 },
  { city: 'Gurgaon', targetUnits: 18, actualUnits: 12, coveragePercentage: (12 / 18) * 100 },
];

const HEADER_PROGRAM_COLORS = {
  DSP: '#08306b',
  'C&D': '#08519c',
  MRS: '#2171b5',
} as const;

const ProgramLeaderboard: React.FC<{ program: 'DSP' | 'C&D' | 'MRS'; accentColor: string; containerId: string }>
  = ({ program, accentColor, containerId }) => {
  const headerStyles = {
    color: '#ffffff',
    fontWeight: 400,
    fontSize: '0.68rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
  };

  const rows = program === 'DSP' ? DSP_LEADERBOARD_DATA : program === 'C&D' ? CD_LEADERBOARD_DATA : MRS_LEADERBOARD_DATA;
  const getPercent = (row: DSPRow | CDRow | MRSRow) => {
    if (program === 'DSP') return (row as DSPRow).resolutionPercentage;
    if (program === 'C&D') return (row as CDRow).achievementPercentage;
    return (row as MRSRow).coveragePercentage;
  };

  const topPerformerCity = program === 'DSP' ? 'Delhi' : 'Greater Noida';
  const sortedRows = [...rows]
    .filter((r: any) => r.city !== topPerformerCity)
    .sort((a, b) => getPercent(b) - getPercent(a));

  const formatNumber = (num: number): string => Math.round(num).toLocaleString();

  return (
    <Box id={containerId} sx={{
      mt: 1.5,
      borderRadius: '12px',
      background: 'rgba(16, 27, 42, 0.65)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      overflow: 'hidden', overflowX: 'hidden', maxWidth: '100%', minWidth: 0, fontSize: '0.85rem',
    }}>
      <Box sx={{
        display: 'grid', gridTemplateColumns: '56px 1fr minmax(160px, auto)', alignItems: 'center', gap: 1, px: 2, py: 1,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.08)', width: '100%', minWidth: 0, overflowX: 'hidden',
      }}>
        <Typography sx={headerStyles}>Rank</Typography>
        <Typography sx={headerStyles}>City</Typography>
        {program === 'DSP' && <Typography sx={headerStyles}>Resolved Vs Raised</Typography>}
        {program === 'C&D' && <Typography sx={headerStyles}>SCCs Set up Vs Target</Typography>}
        {program === 'MRS' && <Typography sx={headerStyles}>Active Units Vs Target</Typography>}
      </Box>

      <Box sx={{ maxHeight: 260, overflowY: 'auto', overflowX: 'hidden', width: '100%', minWidth: 0 }}>
        {sortedRows.map((row, index) => {
          const percentage = getPercent(row);
          let absoluteLabel = '';
          if (program === 'DSP') {
            const r = row as DSPRow;
            absoluteLabel = `${formatNumber(r.resolved)} / ${formatNumber(r.raised)}`;
          } else if (program === 'C&D') {
            const c = row as CDRow;
            absoluteLabel = `${formatNumber(c.actual)} / ${formatNumber(c.target)}`;
          } else {
            const m = row as MRSRow;
            absoluteLabel = `${formatNumber(m.actualUnits)} / ${formatNumber(m.targetUnits)}`;
          }

          return (
            <Box key={`${program}-${index}`} sx={{
              px: 2, py: 1, '&:not(:last-of-type)': { borderBottom: '1px solid rgba(255,255,255,0.06)' },
              transition: 'background 0.2s ease', '&:hover': { background: 'rgba(255,255,255,0.04)' },
            }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '56px 1fr minmax(160px, auto)', alignItems: 'center', gap: 1, width: '100%', minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{
                    width: 28, height: 28, borderRadius: '14px', display: 'grid', placeItems: 'center', fontWeight: 600, color: '#fff',
                    background: `${accentColor}`, boxShadow: `${accentColor}55 0px 4px 14px`,
                  }}>{index + 2}</Box>
                </Box>
                <Typography sx={{ color: '#E6EDF3', fontWeight: 400, fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{(row as any).city}</Typography>
                <Typography sx={{ color: '#ffffff', fontWeight: 400, fontSize: '0.8rem', fontVariantNumeric: 'tabular-nums' }}>{`${Math.round(percentage)}% (${absoluteLabel})`}</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.max(0, Math.min(100, percentage))}
                sx={{ mt: 1, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.08)', '& .MuiLinearProgress-bar': { backgroundColor: accentColor } }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const LeaderboardTile: React.FC<{ program: 'DSP' | 'C&D' | 'MRS'; cityName: string; metric: string; percentage: number; }>
  = ({ program, cityName, metric, percentage }) => {
  const [open, setOpen] = useState(false);
  const color = getPerformanceColor(percentage);
  const collapseId = `lp-lb-${program.toLowerCase()}`;

  return (
    <ProgramTileCard accentColor={HEADER_PROGRAM_COLORS[program]}>
      <CardContent sx={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <PillButton
            type="button"
            sx={{
              backgroundColor: HEADER_PROGRAM_COLORS[program],
              '&:hover': { backgroundColor: HEADER_PROGRAM_COLORS[program] },
              color: '#ffffff', pointerEvents: 'none', padding: '8px 16px', borderRadius: '10px', fontSize: '0.95rem', minHeight: '36px',
              boxShadow: `0 4px 14px ${HEADER_PROGRAM_COLORS[program]}33`,
            }}
          >
            {program === 'C&D' ? 'SCC' : program}
          </PillButton>
        </Box>

        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h5" sx={(theme) => ({ fontWeight: 900, color: theme.palette.mode === 'light' ? '#000000' : '#ffffff', fontSize: '1.5rem', lineHeight: 1.2, textShadow: theme.palette.mode === 'light' ? 'none' : '0 3px 8px rgba(0,0,0,0.35)', letterSpacing: '0.5px' })}>
            {cityName}
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', mb: 1.5, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgressIndicator percentage={percentage} color={color} displayDecimals={program === 'C&D' ? 0 : 1} />
        </Box>

        <Typography variant="caption" sx={(theme) => ({ color: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)', textAlign: 'center', display: 'block', mb: 1 })}>
          {program === 'DSP' ? 'Percentage Resolved Vs Raised' : program === 'C&D' ? 'Number of SCCs Set up Vs Target' : 'Number of Active MRS units Vs Target'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1, pt: 1, borderTop: '1px solid rgba(0, 0, 0, 0.25)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InfoIcon sx={(theme) => ({ fontSize: '15px', color: theme.palette.mode === 'light' ? '#000000' : 'rgba(230, 237, 243, 0.85)', mr: 0.5 })} />
            <Typography variant="caption" sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#000000' : 'rgba(230, 237, 243, 0.85)', fontSize: '0.72rem' })}>
              Top in {metric}
            </Typography>
          </Box>
        </Box>

        <Collapse in={open} timeout={300} unmountOnExit>
          <ProgramLeaderboard program={program} accentColor={HEADER_PROGRAM_COLORS[program]} containerId={collapseId} />
        </Collapse>
      </CardContent>

      <Box sx={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 2 }}>
        <IconButton
          aria-label={`Toggle ${program} leaderboard`}
          aria-expanded={open}
          aria-controls={collapseId}
          onClick={() => setOpen((p) => !p)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setOpen((p) => !p);
            } else if (e.key === 'Escape') {
              if (open) setOpen(false);
            }
          }}
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

const StatsOverview: React.FC = () => {
  const leadingCities = useMemo(() => MOCK_LEADING_CITIES, []);

  // Compute percentages based on dummy data
  const dspRow = DSP_LEADERBOARD_DATA.find((r) => r.city === 'Delhi');
  const dspPercentage = dspRow ? (dspRow.resolved / dspRow.raised) * 100 : 0;

  const cdTop = leadingCities.find((c) => c.program === 'C&D');
  const cdRow = CD_LEADERBOARD_DATA.find((r) => r.city === cdTop?.name) || CD_LEADERBOARD_DATA[0];
  const cdPercentage = (cdRow.actual / cdRow.target) * 100;

  const mrsTop = leadingCities.find((c) => c.program === 'MRS');
  const mrsRow = MRS_LEADERBOARD_DATA.find((r) => r.city === mrsTop?.name) || MRS_LEADERBOARD_DATA[0];
  const mrsPercentage = (mrsRow.actualUnits / mrsRow.targetUnits) * 100;

  return (
    <Container maxWidth="xl" sx={{ py: 3, position: 'relative' }}>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        sx={{ textAlign: 'center', mb: 4, color: '#000000', fontWeight: 400, fontSize: { xs: '2rem', md: '3rem' } }}
      >
        Program Leaderboard (Resolution based) : City Wise
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <LeaderboardTile program="DSP" cityName="Delhi" metric="Resolution %" percentage={dspPercentage} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <LeaderboardTile program="C&D" cityName={cdRow.city} metric="SCCs Setup %" percentage={cdPercentage} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <LeaderboardTile program="MRS" cityName={mrsRow.city} metric="Active Units %" percentage={mrsPercentage} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default StatsOverview;
