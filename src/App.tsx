import { Routes, Route } from 'react-router-dom'
import { Box, Typography, Container, AppBar, Toolbar } from '@mui/material'
import LandingPage from './pages/LandingPage/LandingPage'
import DSPDashboard from './pages/DSP/DSPDashboard'
import BackButton from './components/Common/BackButton'

// Coming Soon Page Component
const ComingSoonPage = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <Box sx={{ 
    minHeight: '100vh', 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%)',
      pointerEvents: 'none',
    }
  }}>
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        top: 0,
        zIndex: 1100,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar sx={{ padding: '16px 32px', position: 'relative', zIndex: 1 }}>
        <BackButton sx={{ marginRight: '16px' }} />
        <Typography
          variant="h4"
          component="div"
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            letterSpacing: '2px',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          MoHUA
        </Typography>
        <Box sx={{ flex: 1, textAlign: 'center', marginX: 4 }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: '#ffffff',
              fontWeight: 700,
              letterSpacing: '1px',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.85rem',
              letterSpacing: '0.5px',
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>

    <Container maxWidth="xl" sx={{ padding: '64px 16px', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)' }}>
      <Box
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
          maxWidth: '600px',
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
        <Typography 
          variant="h3" 
          sx={{ 
            marginBottom: '24px', 
            color: '#ffffff',
            fontWeight: 700,
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Coming Soon
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.8)', 
            marginBottom: '32px',
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          We're working hard to bring you advanced {title.toLowerCase()} dashboard features and analytics.
        </Typography>
        <Box sx={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '12px 24px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)',
              fontStyle: 'italic',
              fontSize: '0.95rem',
            }}
          >
            🚀 Stay tuned for updates!
          </Typography>
        </Box>
      </Box>
    </Container>
  </Box>
)

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dsp" element={<DSPDashboard />} />
      <Route path="/cd" element={<ComingSoonPage title="Construction & Demolition" subtitle="Waste Management Dashboard" />} />
      <Route path="/mrs" element={<ComingSoonPage title="Material Recovery System" subtitle="Sustainability Dashboard" />} />
    </Routes>
  )
}

export default App
