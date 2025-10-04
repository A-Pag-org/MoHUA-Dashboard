import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { DSP_COLORS } from '../../utils/constants';

interface CategoryData {
  category: string;
  raised: number;
  resolved: number;
}

interface CategoryBarChartProps {
  data: CategoryData[];
  cityName: string;
}

// Helper function to get color based on resolution percentage
const getResolutionColor = (percentage: number): string => {
  if (percentage >= 90) return DSP_COLORS.SATISFACTORY;
  if (percentage >= 50) return DSP_COLORS.AVERAGE;
  return DSP_COLORS.UNSATISFACTORY;
};

// Helper function to get status text
const getResolutionStatus = (percentage: number): string => {
  if (percentage >= 90) return 'Satisfactory';
  if (percentage >= 50) return 'Average';
  return 'Unsatisfactory';
};

const CategoryBarChart: React.FC<CategoryBarChartProps> = ({ data, cityName }) => {
  return (
    <Paper
      sx={{
        borderRadius: '16px',
        background: 'rgba(16, 27, 42, 0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
        p: 3,
        mt: 3,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            mb: 0.5,
          }}
        >
          Category-wise Performance
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 500,
          }}
        >
          {cityName}
        </Typography>
      </Box>

      {/* Category Bars */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {data.map((item, index) => {
          const resolutionPercentage = item.raised > 0 ? (item.resolved / item.raised) * 100 : 0;
          const barColor = getResolutionColor(resolutionPercentage);
          const status = getResolutionStatus(resolutionPercentage);

          return (
            <Box key={index}>
              {/* Category Name and Stats */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    minWidth: '200px',
                    flex: 1,
                  }}
                >
                  {item.category}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    {item.resolved.toLocaleString()} / {item.raised.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: barColor,
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      minWidth: '45px',
                      textAlign: 'right',
                    }}
                  >
                    {resolutionPercentage.toFixed(1)}%
                  </Typography>
                </Box>
              </Box>

              {/* Progress Bar */}
              <Box
                sx={{
                  position: 'relative',
                  height: '28px',
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                {/* Filled portion */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: `${Math.min(resolutionPercentage, 100)}%`,
                    background: `linear-gradient(90deg, ${barColor} 0%, ${barColor}CC 100%)`,
                    borderRadius: '14px',
                    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: `0 0 12px ${barColor}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    pr: 1.5,
                  }}
                >
                  {/* Status badge inside bar (only if bar is wide enough) */}
                  {resolutionPercentage > 25 && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                        background: 'rgba(0, 0, 0, 0.15)',
                        padding: '2px 8px',
                        borderRadius: '8px',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                      }}
                    >
                      {status}
                    </Typography>
                  )}
                </Box>

                {/* Percentage label for very small bars */}
                {resolutionPercentage <= 25 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                      }}
                    >
                      {status}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Legend */}
      <Box
        sx={{
          mt: 3,
          pt: 2.5,
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '4px',
              background: DSP_COLORS.SATISFACTORY,
              boxShadow: `0 0 8px ${DSP_COLORS.SATISFACTORY}40`,
            }}
          />
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.75rem' }}>
            Satisfactory (≥90%)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '4px',
              background: DSP_COLORS.AVERAGE,
              boxShadow: `0 0 8px ${DSP_COLORS.AVERAGE}40`,
            }}
          />
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.75rem' }}>
            Average (50-89%)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '4px',
              background: DSP_COLORS.UNSATISFACTORY,
              boxShadow: `0 0 8px ${DSP_COLORS.UNSATISFACTORY}40`,
            }}
          />
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.75rem' }}>
            Unsatisfactory (&lt;50%)
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CategoryBarChart;
