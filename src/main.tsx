import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'

const theme = createTheme({
  palette: {
    primary: {
      // Soft sky blue accent inspired by iOS Weather
      main: '#7aa2ff',
    },
    secondary: {
      // Warm sunrise amber for highlights
      main: '#FFD166',
    },
    error: {
      main: '#FF6B6B',
    },
    background: {
      // Night-sky background
      default: '#0B1220',
      paper: '#0F1B2A',
    },
    text: {
      primary: '#E6EDF3',
      secondary: '#B0B7C3',
    },
  },
  typography: {
    // Prefer San Francisco on Apple devices, fall back to system UI/fonts elsewhere
    fontFamily:
      '"SF Pro Text", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, "Noto Sans", sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      letterSpacing: '0.2px',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '0.2px',
    },
    h3: {
      fontSize: '1.35rem',
      fontWeight: 600,
      letterSpacing: '0.2px',
    },
    body1: {
      lineHeight: 1.5,
    },
    body2: {
      lineHeight: 1.45,
    },
  },
})

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
