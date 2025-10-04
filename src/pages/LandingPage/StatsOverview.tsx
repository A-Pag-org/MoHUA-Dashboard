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

// Mock data for development - replace with actual data source
const mockData: ProgramOverviewData = {
  dspData: [
    {
      city: 'Delhi',
      raised: 450,
      resolved: 420,
      resolutionPercentage: 93.3,
      status: 'Satisfactory',
    },
    {
      city: 'Mumbai',
      raised: 380,
      resolved: 285,
      resolutionPercentage: 75.0,
      status: 'Average',
    },
    {
      city: 'Bangalore',
      raised: 320,
      resolved: 140,
      resolutionPercentage: 43.8,
      status: 'Unsatisfactory',
    },
    {
      city: 'Chennai',
      raised: 290,
      resolved: 275,
      resolutionPercentage: 94.8,
      status: 'Satisfactory',
    },
    {
      city: 'Hyderabad',
      raised: 240,
      resolved: 150,
      resolutionPercentage: 62.5,
      status: 'Average',
    },
  ],
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
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold' }}
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