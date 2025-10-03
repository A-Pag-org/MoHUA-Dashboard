import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { styled } from '@mui/material/styles';
import { ProgramStats } from '../../types';
import { MOCK_PROGRAM_STATS, DSP_COLORS } from '../../utils/constants';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '400px',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
  },
}));

const StatusChip = styled('div')<{ status: string }>(({ status }) => ({
  display: 'inline-block',
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: 
    status === 'Satisfactory' ? DSP_COLORS.SATISFACTORY :
    status === 'Average' ? DSP_COLORS.AVERAGE :
    DSP_COLORS.UNSATISFACTORY,
}));

const StatsOverview: React.FC = () => {
  const getChartData = (stats: ProgramStats) => {
    return [
      {
        name: 'Raised',
        value: stats.raised,
        fill: DSP_COLORS.RAISED,
      },
      {
        name: 'Resolved',
        value: stats.resolved,
        fill: 
          stats.status === 'Satisfactory' ? DSP_COLORS.SATISFACTORY :
          stats.status === 'Average' ? DSP_COLORS.AVERAGE :
          DSP_COLORS.UNSATISFACTORY,
      },
    ];
  };

  return (
    <Box sx={{ padding: '40px 0', backgroundColor: 'white' }}>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: 'center',
            marginBottom: '40px',
            color: 'primary.main',
            fontWeight: 'bold',
          }}
        >
          Program Performance Overview
        </Typography>

        <Grid container spacing={4}>
          {MOCK_PROGRAM_STATS.map((stats: ProgramStats) => (
            <Grid item xs={12} md={4} key={stats.program}>
              <StyledCard>
                <CardContent sx={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ marginBottom: '20px' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: 'text.primary',
                      }}
                    >
                      {stats.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <StatusChip status={stats.status}>
                        {stats.status}
                      </StatusChip>
                      <Typography variant="body2" color="text.secondary">
                        {stats.percentage}% Achievement
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ flex: 1, minHeight: '200px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getChartData(stats)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number) => [value.toLocaleString(), 'Count']}
                          labelStyle={{ color: '#333' }}
                        />
                        <Legend />
                        <Bar 
                          dataKey="value" 
                          radius={[4, 4, 0, 0]}
                          maxBarSize={60}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>

                  <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Raised
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {stats.raised.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Resolved
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {stats.resolved.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default StatsOverview;
