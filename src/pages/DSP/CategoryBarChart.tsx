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
        borderRadius: '12px',
        background: 'rgba(16, 27, 42, 0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
        p: 1.5,
        mt: 1.5,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 1.5, textAlign: 'center' }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            mb: 0.25,
            fontSize: '0.95rem',
          }}
        >
          Category-wise Performance
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 400,
            fontSize: '0.8rem',
          }}
        >
          {cityName}
        </Typography>
      </Box>

      {/* Category Bars */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
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
                  mb: 0.5,
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 500,
                    fontSize: '0.8rem',
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
                      fontSize: '0.7rem',
                      fontWeight: 400,
                    }}
                  >
                    {item.resolved.toLocaleString()} / {item.raised.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: barColor,
                      fontWeight: 600,
                      fontSize: '0.75rem',
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
                  height: '22px',
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '11px',
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
                    borderRadius: '11px',
                    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: `0 0 12px ${barColor}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    pr: 1,
                  }}
                >
                  {/* Status badge inside bar (only if bar is wide enough) */}
                  {resolutionPercentage > 25 && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#ffffff',
                        fontWeight: 600,
                        fontSize: '0.65rem',
                        textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                        background: 'rgba(0, 0, 0, 0.15)',
                        padding: '1px 6px',
                        borderRadius: '6px',
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
                        fontWeight: 500,
                        fontSize: '0.65rem',
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
          mt: 1.5,
          pt: 1.5,
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '3px',
              background: DSP_COLORS.SATISFACTORY,
              boxShadow: `0 0 6px ${DSP_COLORS.SATISFACTORY}40`,
            }}
          />
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.7rem' }}>
            Satisfactory (≥90%)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '3px',
              background: DSP_COLORS.AVERAGE,
              boxShadow: `0 0 6px ${DSP_COLORS.AVERAGE}40`,
            }}
          />
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.7rem' }}>
            Average (50-89%)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '3px',
              background: DSP_COLORS.UNSATISFACTORY,
              boxShadow: `0 0 6px ${DSP_COLORS.UNSATISFACTORY}40`,
            }}
          />
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.7rem' }}>
            Unsatisfactory (&lt;50%)
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CategoryBarChart;
