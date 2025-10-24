import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Header from '../../components/Common/Header';
import HeroSection from './HeroSection';
import StatsOverview from './StatsOverview';
import { DSP_COLORS } from '../../utils/constants';

const LandingPage: React.FC = () => {
  return (
    <Box
      sx={(theme) => ({
        minHeight: '100vh',
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #0B1220 0%, #0F1B2A 100%)'
            : 'linear-gradient(180deg, #F8FAFF 0%, #FFFFFF 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            theme.palette.mode === 'dark'
              ? 'radial-gradient(1000px 400px at 20% 0%, rgba(122,162,255,0.15) 0%, rgba(122,162,255,0) 60%), radial-gradient(800px 300px at 80% 10%, rgba(255,209,102,0.12) 0%, rgba(255,209,102,0) 60%)'
              : 'radial-gradient(1000px 400px at 20% 0%, rgba(122,162,255,0.20) 0%, rgba(122,162,255,0) 60%), radial-gradient(800px 300px at 80% 10%, rgba(255,209,102,0.16) 0%, rgba(255,209,102,0) 60%)',
          pointerEvents: 'none',
        },
      })}
    >
      <Header />
      <HeroSection />
      <StatsOverview />
      {/* Status legend at bottom of home page */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', position: 'relative', zIndex: 1, mb: 4, mt: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper
            sx={{
              borderRadius: '16px',
              background: 'rgba(16, 27, 42, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              px: 3,
              py: 1.5,
            }}
          >
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 14, height: 14, borderRadius: '50%', background: DSP_COLORS.SATISFACTORY, boxShadow: `0 0 8px ${DSP_COLORS.SATISFACTORY}40` }} />
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Satisfactory (≥90%)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 14, height: 14, borderRadius: '50%', background: DSP_COLORS.AVERAGE, boxShadow: `0 0 8px ${DSP_COLORS.AVERAGE}40` }} />
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Average (50-89%)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 14, height: 14, borderRadius: '50%', background: DSP_COLORS.UNSATISFACTORY, boxShadow: `0 0 8px ${DSP_COLORS.UNSATISFACTORY}40` }} />
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Unsatisfactory (&lt;50%)
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
