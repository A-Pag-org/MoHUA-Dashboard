import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const IssueManagement: React.FC = () => {
  // Data matching the image
  const resolutionRate = 76.3;
  const issuesRaised = 197103;
  const issuesResolved = 150479;

  // Chart data for the doughnut chart
  const chartData = {
    datasets: [
      {
        data: [resolutionRate, 100 - resolutionRate],
        backgroundColor: [
          '#2196F3', // Blue color for resolved portion
          'rgba(33, 150, 243, 0.2)', // Light blue for remaining portion
        ],
        borderColor: [
          '#1976D2', // Darker blue border
          'rgba(33, 150, 243, 0.3)',
        ],
        borderWidth: 2,
        cutout: '70%', // Creates the doughnut effect
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false, // Hide legend since we're using custom display
      },
      tooltip: {
        enabled: false, // Disable tooltip
      },
    },
    rotation: -90, // Start from top
    circumference: 360, // Full circle
  };

  // Custom center text plugin for the percentage
  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart: any) => {
      const { width, height, ctx } = chart;
      ctx.restore();

      const fontSize = (height / 114).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';

      const text = `${resolutionRate}%`;
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

      ctx.fillText(text, textX, textY);

      // Subtitle
      const subtitleFontSize = (height / 200).toFixed(2);
      ctx.font = `bold ${subtitleFontSize}em sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      const subtitle = 'Resolution Rate';
      const subtitleX = Math.round((width - ctx.measureText(subtitle).width) / 2);
      const subtitleY = height / 2 + 20;

      ctx.fillText(subtitle, subtitleX, subtitleY);
      ctx.save();
    },
  };

  return (
    <Paper
      sx={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '48px',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          pointerEvents: 'none',
        }
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          marginBottom: '16px',
          color: '#ffffff',
          fontWeight: 700,
          textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Issues Raised vs Resolved
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '48px',
          fontWeight: 400,
          lineHeight: 1.6,
        }}
      >
        Consolidated view of issue management performance
      </Typography>

      {/* Circular Progress Chart */}
      <Box sx={{
        position: 'relative',
        width: 300,
        height: 300,
        margin: '0 auto 48px',
      }}>
        <Doughnut
          data={chartData}
          options={chartOptions}
          plugins={[centerTextPlugin]}
        />
      </Box>

      {/* Statistics Section */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={5}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: '#2196F3',
                marginBottom: '12px',
              }}
            />
            <Typography
              variant="h3"
              sx={{
                color: '#2196F3',
                fontWeight: 700,
                marginBottom: '8px',
              }}
            >
              {issuesRaised.toLocaleString()}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 500,
              }}
            >
              Issues Raised
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: '#4CAF50',
                marginBottom: '12px',
              }}
            />
            <Typography
              variant="h3"
              sx={{
                color: '#4CAF50',
                fontWeight: 700,
                marginBottom: '8px',
              }}
            >
              {issuesResolved.toLocaleString()}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 500,
              }}
            >
              Issues Resolved
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default IssueManagement;