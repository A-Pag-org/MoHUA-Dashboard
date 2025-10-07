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
        const showInside = safePct >= 12; // show inside more aggressively so percentages appear on the bar
        const isAverage = d.status === 'Average';
        const labelTextColor = isAverage ? '#000000' : '#ffffff';
        const outsideTextColor = isAverage ? '#000000' : 'rgba(255,255,255,0.85)';
        return (
          <Box key={d.id} sx={{ minHeight: heightPerRow }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5, gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, minWidth: 140 }}>
                {d.label}
              </Typography>
              {/* Status chip removed per latest requirement: status will be on the bar itself */}
            </Box>

            <Box
              sx={{
                position: 'relative',
                height: 20,
                width: '100%',
                borderRadius: 10,
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
                  borderRadius: 10,
                  transition: 'width 0.6s ease',
                  boxShadow: `0 0 10px ${color}40, inset 0 1px 0 rgba(255,255,255,0.15)`,
                }}
              />

              {/* Status label inside the filled bar, aligned to the left */}
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: labelTextColor,
                  fontWeight: 600,
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  maxWidth: `${safePct}%`,
                }}
              >
                {d.status}
              </Typography>

              {/* Percentage label placed on the bar; if bar is too thin, place slightly outside but overlapping */}
              {showInside ? (
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: labelTextColor,
                    fontWeight: 400,
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {safePct.toFixed(1)}%
                </Typography>
              ) : (
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    left: `calc(${safePct}% - 4px)`,
                    // slight negative translate so text hugs the bar end and appears on it
                    transform: 'translate(-100%, -50%)',
                    top: '50%',
                    color: outsideTextColor,
                    fontWeight: 400,
                    pointerEvents: 'none',
                  }}
                >
                  {safePct.toFixed(1)}%
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default MicroBulletBars;
