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
  heightPerRow?: number; // default 36
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

const MicroBulletBars: React.FC<MicroBulletBarsProps> = ({ data, heightPerRow = 36 }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {data.map((d) => {
        const color = getStatusColor(d.status);
        const safePct = isFinite(d.percentage) ? Math.max(0, Math.min(100, d.percentage)) : 0;
        const showInside = safePct >= 28; // inside badge if wide enough
        return (
          <Box key={d.id} sx={{ minHeight: heightPerRow }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5, gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, minWidth: 140 }}>
                {d.label}
              </Typography>
              {/* Right-side textual summary: just percentage per user request */}
              <Typography variant="caption" sx={{ color: color, fontWeight: 700 }}>
                {safePct.toFixed(1)}%
              </Typography>
            </Box>

            <Box sx={{ position: 'relative', height: 18, width: '100%', borderRadius: 9, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              {/* Track not directly rendered numerically since we only show %; we still use track for semantics */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${safePct}%`,
                  background: `linear-gradient(90deg, ${color} 0%, ${color}CC 100%)`,
                  borderRadius: 9,
                  transition: 'width 0.6s ease',
                  boxShadow: `0 0 10px ${color}40, inset 0 1px 0 rgba(255,255,255,0.15)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  pr: 1,
                }}
              >
                {showInside && (
                  <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700 }}>
                    {d.status}
                  </Typography>
                )}
              </Box>

              {!showInside && (
                <Box sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                    {d.status}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default MicroBulletBars;
