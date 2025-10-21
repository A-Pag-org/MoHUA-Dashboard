import React, { useMemo } from 'react';
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

// Removed donut/radial helpers to keep bar-only view

const OTHER_COLOR = 'rgba(255,255,255,0.25)';

interface ProcessedRow extends CategoryData {
  resolutionRate: number;
  statusColor: string;
}

const CategoryBarChart: React.FC<CategoryBarChartProps> = ({ data, cityName }) => {
  // Data prep with performance color mapping per unified legend
  const processed = useMemo((): { rows: ProcessedRow[]; totalRaised: number; totalResolved: number; overallRate: number } => {
    const totalRaised = data.reduce((sum, d) => sum + d.raised, 0) || 1;
    const totalResolved = data.reduce((sum, d) => sum + d.resolved, 0) || 1;

    const getStatusColorForRate = (rate: number): string => {
      if (rate >= 90) return DSP_COLORS.SATISFACTORY;
      if (rate >= 50) return DSP_COLORS.AVERAGE;
      return DSP_COLORS.UNSATISFACTORY;
    };

    const rows: ProcessedRow[] = data.map((d) => {
      const resolutionRate = d.raised > 0 ? (d.resolved / d.raised) * 100 : 0;
      return {
        ...d,
        resolutionRate,
        statusColor: d.category === 'Other' ? OTHER_COLOR : getStatusColorForRate(resolutionRate),
      };
    });

    return {
      rows,
      totalRaised,
      totalResolved,
      overallRate: (totalResolved / totalRaised) * 100,
    };
  }, [data]);

  // Donut-related geometry and angles removed for bar-only component

  // Bars view colored per Satisfactory/Average/Unsatisfactory legend
  const BarsView = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
      {processed.rows.map((r: ProcessedRow, idx: number) => (
        <Box key={idx}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5, gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500, fontSize: '0.8rem', minWidth: '180px', flex: 1 }}>
              {r.category}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem' }}>
                {r.resolved.toLocaleString()} / {r.raised.toLocaleString()}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ position: 'relative', height: '10px', background: '#363636', borderRadius: '5px', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', inset: 0, width: `${Math.min(r.resolutionRate, 100)}%`, background: r.statusColor, boxShadow: `0 0 8px ${r.statusColor}55`, transition: 'width 0.5s ease' }} />
          </Box>
        </Box>
      ))}
      
      {/* Performance Legend */}
      <Box sx={{ 
        mt: 3, 
        pt: 2,
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 14, 
              height: 14, 
              borderRadius: '50%', 
              background: DSP_COLORS.SATISFACTORY,
              boxShadow: `0 0 8px ${DSP_COLORS.SATISFACTORY}40`,
            }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
              Satisfactory (≥90%)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 14, 
              height: 14, 
              borderRadius: '50%', 
              background: DSP_COLORS.AVERAGE,
              boxShadow: `0 0 8px ${DSP_COLORS.AVERAGE}40`,
            }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
              Average (50-89%)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 14, 
              height: 14, 
              borderRadius: '50%', 
              background: DSP_COLORS.UNSATISFACTORY,
              boxShadow: `0 0 8px ${DSP_COLORS.UNSATISFACTORY}40`,
            }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
              Unsatisfactory (&lt;50%)
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  // Donut view removed; component now always renders bar view

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
        pb: 3,
        mt: 1.5,
        width: '100%',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 1.25, position: 'relative' }}>
        {/* City name - Top Left */}
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            fontWeight: 700,
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            fontSize: '1.5rem',
          }}
        >
          {cityName}
        </Typography>
        
        {/* Title - Centered */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              mb: 0.25,
              fontSize: '1rem',
            }}
          >
            Category-wise Performance
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 500,
              mt: 0.5,
            }}
          >
            {`${processed.totalResolved.toLocaleString()} / ${processed.totalRaised.toLocaleString()} • ${processed.overallRate.toFixed(1)}%`}
          </Typography>
        </Box>
      </Box>

      {BarsView}
    </Paper>
  );
};

export default CategoryBarChart;
