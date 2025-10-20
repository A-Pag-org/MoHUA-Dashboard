import React from 'react';
import { Box, Typography } from '@mui/material';
import { DSP_COLORS } from '../../../utils/constants';

export interface MicroBulletDatum {
  id: string;
  label: string; // city
  track: number; // e.g., raised/target
  fill: number; // e.g., resolved/actual
  percentage: number; // 0-100
  status: 'Satisfactory' | 'Average' | 'Unsatisfactory';
}

export interface MicroBulletBarsProps {
  data: MicroBulletDatum[];
  heightPerRow?: number; // default 27 (25% smaller)
  absoluteUnit?: string; // e.g., 'KM' for MRS
}

const getStatusColor = (status: MicroBulletDatum['status']): string => {
  switch (status) {
    case 'Satisfactory':
      return DSP_COLORS.SATISFACTORY;
    case 'Average':
      return DSP_COLORS.AVERAGE;
    default:
      return DSP_COLORS.UNSATISFACTORY;
  }
};

const MicroBulletBars: React.FC<MicroBulletBarsProps> = ({ data, heightPerRow = 27, absoluteUnit }) => {
  const totalTrack = data.reduce((sum, d) => sum + (Number.isFinite(d.track) ? d.track : 0), 0);
  const totalFill = data.reduce((sum, d) => sum + (Number.isFinite(d.fill) ? d.fill : 0), 0);
  const totalPct = totalTrack > 0 ? (totalFill / totalTrack) * 100 : 0;
  const unit = absoluteUnit ? ` ${absoluteUnit}` : '';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {data.map((d) => {
        const color = getStatusColor(d.status);
        const safePct = isFinite(d.percentage) ? Math.max(0, Math.min(100, d.percentage)) : 0;
        const labelTextColor = '#000000';
        const formattedFill = Number.isFinite(d.fill) ? Math.round(d.fill).toLocaleString() : '0';
        const formattedTrack = Number.isFinite(d.track) ? Math.round(d.track).toLocaleString() : '0';
        return (
          <Box key={d.id} sx={{ minHeight: heightPerRow }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5, gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <Typography variant="body2" sx={{ color: '#000000', fontWeight: 600, minWidth: 140 }}>
                  {d.label}
                </Typography>
                <Typography variant="body2" sx={{ color: '#000000', fontWeight: 500 }}>
                  {`${formattedFill}${unit} of ${formattedTrack}${unit}`}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                position: 'relative',
                height: 4,
                width: '100%',
                borderRadius: 2,
                // Stronger grey track behind the filled bar (superimposed look)
                backgroundColor: '#363636',
                overflow: 'hidden',
              }}
            >
              {/* Filled segment */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${safePct}%`,
                  background: `linear-gradient(90deg, ${color} 0%, ${color}CC 100%)`,
                  borderRadius: 2,
                  transition: 'width 0.6s ease',
                  boxShadow: `0 0 10px ${color}40, inset 0 1px 0 rgba(255,255,255,0.15)`,
                }}
              />

              {/* Percentage on the right, above the line */}
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: -16,
                  transform: 'none',
                  color: labelTextColor,
                  fontWeight: 400,
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {safePct.toFixed(1)}%
              </Typography>
            </Box>
          </Box>
        );
      })}

      {/* Section totals */}
      <Box
        sx={{
          mt: 1,
          p: 0.5,
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="caption" sx={{ color: '#000000', fontWeight: 600 }}>
          {`Totals: ${Math.round(totalFill).toLocaleString()}${unit} of ${Math.round(totalTrack).toLocaleString()}${unit}`}
        </Typography>
        <Typography variant="caption" sx={{ color: '#000000' }}>
          {totalPct.toFixed(1)}%
        </Typography>
      </Box>
    </Box>
  );
};

export default MicroBulletBars;
