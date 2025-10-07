import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DSP_COLORS } from '../../utils/constants';
import {
  DSPComplaintData,
  CDCollectionData,
  MRSUsageData,
  ProgramOverviewData,
} from '../../types';

// Color constants matching tile styles (use shared DSP_COLORS)
const COLORS = {
  BLACK: '#0E1525',
  SATISFACTORY: DSP_COLORS.SATISFACTORY,
  AVERAGE: DSP_COLORS.AVERAGE,
  UNSATISFACTORY: DSP_COLORS.UNSATISFACTORY,
};

// Helper to map resolution percentage to status buckets
const getStatusFromPercentage = (
  percentage: number
): 'Satisfactory' | 'Average' | 'Unsatisfactory' => {
  if (percentage >= 90) return 'Satisfactory';
  if (percentage >= 50) return 'Average';
  return 'Unsatisfactory';
};

// DSP city data for landing page (Raised, Resolved, Resolution Rate)
const CITY_DSP_DATA: DSPComplaintData[] = [
  {
    city: 'Bahadurgarh',
    raised: 7356,
    resolved: 2169,
    resolutionPercentage: (2169 / 7356) * 100,
    status: getStatusFromPercentage((2169 / 7356) * 100),
  },
  {
    city: 'Delhi',
    raised: 70550,
    resolved: 52984,
    resolutionPercentage: (52984 / 70550) * 100,
    status: getStatusFromPercentage((52984 / 70550) * 100),
  },
  {
    city: 'Faridabad',
    raised: 22161,
    resolved: 17636,
    resolutionPercentage: (17636 / 22161) * 100,
    status: getStatusFromPercentage((17636 / 22161) * 100),
  },
  {
    city: 'Ghaziabad',
    raised: 30814,
    resolved: 26505,
    resolutionPercentage: (26505 / 30814) * 100,
    status: getStatusFromPercentage((26505 / 30814) * 100),
  },
  {
    city: 'Greater Noida',
    raised: 12705,
    resolved: 9575,
    resolutionPercentage: (9575 / 12705) * 100,
    status: getStatusFromPercentage((9575 / 12705) * 100),
  },
  {
    city: 'Gurgaon',
    raised: 26169,
    resolved: 17656,
    resolutionPercentage: (17656 / 26169) * 100,
    status: getStatusFromPercentage((17656 / 26169) * 100),
  },
  {
    city: 'Manesar',
    raised: 9606,
    resolved: 7454,
    resolutionPercentage: (7454 / 9606) * 100,
    status: getStatusFromPercentage((7454 / 9606) * 100),
  },
  {
    city: 'Noida',
    raised: 17742,
    resolved: 16500,
    resolutionPercentage: (16500 / 17742) * 100,
    status: getStatusFromPercentage((16500 / 17742) * 100),
  },
];

// Program overview data (landing page)
const mockData: ProgramOverviewData = {
  dspData: CITY_DSP_DATA,
  cdData: [
    {
      city: 'Delhi',
      target: 1200,
      actual: 1150,
      achievementPercentage: 95.8,
      status: 'Satisfactory',
    },
    {
      city: 'Faridabad',
      target: 1000,
      actual: 750,
      achievementPercentage: 75.0,
      status: 'Average',
    },
    {
      city: 'Ghaziabad',
      target: 800,
      actual: 350,
      achievementPercentage: 43.8,
      status: 'Unsatisfactory',
    },
    {
      city: 'Greater Noida',
      target: 700,
      actual: 680,
      achievementPercentage: 97.1,
      status: 'Satisfactory',
    },
    {
      city: 'Gurgaon',
      target: 600,
      actual: 420,
      achievementPercentage: 70.0,
      status: 'Average',
    },
  ],
  mrsData: [
    {
      city: 'Delhi',
      targetRoadLength: 2500,
      actualRoadLength: 2380,
      coveragePercentage: 95.2,
      status: 'Satisfactory',
    },
    {
      city: 'Faridabad',
      targetRoadLength: 2200,
      actualRoadLength: 1650,
      coveragePercentage: 75.0,
      status: 'Average',
    },
    {
      city: 'Ghaziabad',
      targetRoadLength: 1800,
      actualRoadLength: 720,
      coveragePercentage: 40.0,
      status: 'Unsatisfactory',
    },
    {
      city: 'Greater Noida',
      targetRoadLength: 1600,
      actualRoadLength: 1520,
      coveragePercentage: 95.0,
      status: 'Satisfactory',
    },
    {
      city: 'Gurgaon',
      targetRoadLength: 1400,
      actualRoadLength: 910,
      coveragePercentage: 65.0,
      status: 'Average',
    },
  ],
};

// DSP Section Component
const DSPSection: React.FC<{ data: DSPComplaintData[] }> = ({ data }) => {
  // Transform data for recharts with separate columns for each status
  const chartData = data.map((item) => ({
    city: item.city,
    raised: item.raised,
    resolvedSatisfactory: item.status === 'Satisfactory' ? item.resolved : 0,
    resolvedAverage: item.status === 'Average' ? item.resolved : 0,
    resolvedUnsatisfactory: item.status === 'Unsatisfactory' ? item.resolved : 0,
  }));

  

  return (
    <Card sx={{ height: '100%', backgroundColor: 'background.paper' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Complaint Status: Road repairs & Civic Infra
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Actual Raise Vs Actual Resolved
        </Typography>
        <Box sx={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="raised" fill={COLORS.BLACK} name="Raised" />
              <Bar dataKey="resolvedSatisfactory" fill={COLORS.SATISFACTORY} name="Resolved (Satisfactory)" stackId="resolved" />
              <Bar dataKey="resolvedAverage" fill={COLORS.AVERAGE} name="Resolved (Average)" stackId="resolved" />
              <Bar dataKey="resolvedUnsatisfactory" fill={COLORS.UNSATISFACTORY} name="Resolved (Unsatisfactory)" stackId="resolved" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        
      </CardContent>
    </Card>
  );
};

// C&D Section Component
const CDSection: React.FC<{ data: CDCollectionData[] }> = ({ data }) => {
  // Transform data for recharts with separate columns for each status
  const chartData = data.map((item) => ({
    city: item.city,
    target: item.target,
    actualSatisfactory: item.status === 'Satisfactory' ? item.actual : 0,
    actualAverage: item.status === 'Average' ? item.actual : 0,
    actualUnsatisfactory: item.status === 'Unsatisfactory' ? item.actual : 0,
  }));

  return (
    <Card sx={{ height: '100%', backgroundColor: 'background.paper' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Citywise C&D Collection Status
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Target Vs Actual
        </Typography>
        <Box sx={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="target" fill={COLORS.BLACK} name="Target" />
              <Bar dataKey="actualSatisfactory" fill={COLORS.SATISFACTORY} name="Actuals (Satisfactory)" stackId="actual" />
              <Bar dataKey="actualAverage" fill={COLORS.AVERAGE} name="Actuals (Average)" stackId="actual" />
              <Bar dataKey="actualUnsatisfactory" fill={COLORS.UNSATISFACTORY} name="Actuals (Unsatisfactory)" stackId="actual" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

// MRS Section Component
const MRSSection: React.FC<{ data: MRSUsageData[] }> = ({ data }) => {
  // Transform data for recharts with separate columns for each status
  const chartData = data.map((item) => ({
    city: item.city,
    targetRoadLength: item.targetRoadLength,
    actualSatisfactory: item.status === 'Satisfactory' ? item.actualRoadLength : 0,
    actualAverage: item.status === 'Average' ? item.actualRoadLength : 0,
    actualUnsatisfactory: item.status === 'Unsatisfactory' ? item.actualRoadLength : 0,
  }));

  return (
    <Card sx={{ height: '100%', backgroundColor: 'background.paper' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Citywise MRS Usage Status
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Target Road Length Covered to Actual Road Length Covered
        </Typography>
        <Box sx={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="targetRoadLength" fill={COLORS.BLACK} name="Target" />
              <Bar dataKey="actualSatisfactory" fill={COLORS.SATISFACTORY} name="Actuals (Satisfactory)" stackId="actual" />
              <Bar dataKey="actualAverage" fill={COLORS.AVERAGE} name="Actuals (Average)" stackId="actual" />
              <Bar dataKey="actualUnsatisfactory" fill={COLORS.UNSATISFACTORY} name="Actuals (Unsatisfactory)" stackId="actual" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

// Main StatsOverview Component
const StatsOverview: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 3, position: 'relative' }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ 
          textAlign: 'center', 
          mb: 4, 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #7aa2ff 0%, #89d0ff 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 6px rgba(0,0,0,0.25)'
        }}
      >
        Program Overview Statistics
      </Typography>
      
      <Grid container spacing={3}>
        {/* DSP Section */}
        <Grid item xs={12} lg={4}>
          <DSPSection data={mockData.dspData} />
        </Grid>
        
        {/* C&D Section */}
        <Grid item xs={12} lg={4}>
          <CDSection data={mockData.cdData} />
        </Grid>
        
        {/* MRS Section */}
        <Grid item xs={12} lg={4}>
          <MRSSection data={mockData.mrsData} />
        </Grid>
      </Grid>

      {/* Unified status legend below the three charts */}
      <Box
        sx={{
          mt: 2.5,
          display: 'flex',
          justifyContent: 'center',
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
            <Box sx={{ width: 12, height: 12, bgcolor: COLORS.SATISFACTORY, borderRadius: '3px' }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              Satisfactory (≥90%)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: COLORS.AVERAGE, borderRadius: '3px' }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              Average (50-89%)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: COLORS.UNSATISFACTORY, borderRadius: '3px' }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              Unsatisfactory (&lt;50%)
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default StatsOverview;