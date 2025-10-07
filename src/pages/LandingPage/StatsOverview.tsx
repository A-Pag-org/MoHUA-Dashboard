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
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  DSPComplaintData,
  CDCollectionData,
  MRSUsageData,
  ProgramOverviewData,
} from '../../types';

// Color constants matching the requirements
const COLORS = {
  BLACK: '#0E1525',
  SATISFACTORY: '#4CAF50',
  AVERAGE: '#FFD166',
  UNSATISFACTORY: '#FF6B6B',
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
    city: 'Baharudgarh',
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
      city: 'Mumbai',
      target: 1000,
      actual: 750,
      achievementPercentage: 75.0,
      status: 'Average',
    },
    {
      city: 'Bangalore',
      target: 800,
      actual: 350,
      achievementPercentage: 43.8,
      status: 'Unsatisfactory',
    },
    {
      city: 'Chennai',
      target: 700,
      actual: 680,
      achievementPercentage: 97.1,
      status: 'Satisfactory',
    },
    {
      city: 'Hyderabad',
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
      city: 'Mumbai',
      targetRoadLength: 2200,
      actualRoadLength: 1650,
      coveragePercentage: 75.0,
      status: 'Average',
    },
    {
      city: 'Bangalore',
      targetRoadLength: 1800,
      actualRoadLength: 720,
      coveragePercentage: 40.0,
      status: 'Unsatisfactory',
    },
    {
      city: 'Chennai',
      targetRoadLength: 1600,
      actualRoadLength: 1520,
      coveragePercentage: 95.0,
      status: 'Satisfactory',
    },
    {
      city: 'Hyderabad',
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

  // Totals computed from provided city data
  const totalRaised = data.reduce((sum, item) => sum + item.raised, 0);
  const totalResolved = data.reduce((sum, item) => sum + item.resolved, 0);
  const overallResolutionRate = totalRaised > 0 ? (totalResolved / totalRaised) * 100 : 0;

  return (
    <Card sx={{ height: '100%', backgroundColor: 'background.paper' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Complaint Status: Road repairs & Civic Infra
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          DSP Section - Raised vs Resolved Complaints
        </Typography>
        <Box sx={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="raised" fill={COLORS.BLACK} name="Raised" />
              <Bar dataKey="resolvedSatisfactory" fill={COLORS.SATISFACTORY} name="Resolved (Satisfactory)" stackId="resolved" />
              <Bar dataKey="resolvedAverage" fill={COLORS.AVERAGE} name="Resolved (Average)" stackId="resolved" />
              <Bar dataKey="resolvedUnsatisfactory" fill={COLORS.UNSATISFACTORY} name="Resolved (Unsatisfactory)" stackId="resolved" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            Resolution Status Legend:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: COLORS.SATISFACTORY }} />
              <Typography variant="caption">Satisfactory (≥90%)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: COLORS.AVERAGE }} />
              <Typography variant="caption">Average (50-89%)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: COLORS.UNSATISFACTORY }} />
              <Typography variant="caption">Unsatisfactory (&lt;50%)</Typography>
            </Box>
          </Box>
        </Box>

        {/* Totals summary based on provided city data */}
        <Box sx={{ mt: 2, p: 1.25, borderRadius: '8px', bgcolor: 'action.hover' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Totals (DSP)
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Raised: {totalRaised.toLocaleString()} | Resolved: {totalResolved.toLocaleString()} | Resolution Rate: {overallResolutionRate.toFixed(2)}%
          </Typography>
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
          C&D Section - Target vs Actuals
        </Typography>
        <Box sx={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="target" fill={COLORS.BLACK} name="Target" />
              <Bar dataKey="actualSatisfactory" fill={COLORS.SATISFACTORY} name="Actuals (Satisfactory)" stackId="actual" />
              <Bar dataKey="actualAverage" fill={COLORS.AVERAGE} name="Actuals (Average)" stackId="actual" />
              <Bar dataKey="actualUnsatisfactory" fill={COLORS.UNSATISFACTORY} name="Actuals (Unsatisfactory)" stackId="actual" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            Achievement Status Legend:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: COLORS.SATISFACTORY }} />
              <Typography variant="caption">Satisfactory (≥90%)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: COLORS.AVERAGE }} />
              <Typography variant="caption">Average (50-89%)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: COLORS.UNSATISFACTORY }} />
              <Typography variant="caption">Unsatisfactory (&lt;50%)</Typography>
            </Box>
          </Box>
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
          MRS Section - Target Road Length vs Actual Road Length Covered
        </Typography>
        <Box sx={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="targetRoadLength" fill={COLORS.BLACK} name="Target" />
              <Bar dataKey="actualSatisfactory" fill={COLORS.SATISFACTORY} name="Actuals (Satisfactory)" stackId="actual" />
              <Bar dataKey="actualAverage" fill={COLORS.AVERAGE} name="Actuals (Average)" stackId="actual" />
              <Bar dataKey="actualUnsatisfactory" fill={COLORS.UNSATISFACTORY} name="Actuals (Unsatisfactory)" stackId="actual" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            Coverage Status Legend:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: COLORS.SATISFACTORY }} />
              <Typography variant="caption">Satisfactory (≥90%)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: COLORS.AVERAGE }} />
              <Typography variant="caption">Average (50-89%)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: COLORS.UNSATISFACTORY }} />
              <Typography variant="caption">Unsatisfactory (&lt;50%)</Typography>
            </Box>
          </Box>
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
    </Container>
  );
};

export default StatsOverview;