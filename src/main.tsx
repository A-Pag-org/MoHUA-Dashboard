import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'

type ThemeMode = 'light' | 'dark'

const getDesignTokens = (mode: ThemeMode) => ({
  palette: {
    mode,
    primary: {
      main: '#7aa2ff',
    },
    secondary: {
      main: '#FFD166',
    },
    error: {
      main: '#FF6B6B',
    },
    background: mode === 'dark'
      ? {
          default: '#0B1220',
          paper: '#0F1B2A',
        }
      : {
          default: '#F8FAFF',
          paper: '#FFFFFF',
        },
    text: mode === 'dark'
      ? {
          primary: '#E6EDF3',
          secondary: '#B0B7C3',
        }
      : {
          primary: '#111827',
          secondary: '#4B5563',
        },
  },
  typography: {
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

const getInitialMode = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('color-mode');
    if (stored === 'light' || stored === 'dark') return stored;
  }
  return 'dark';
}

function Root() {
  const [mode, setMode] = React.useState<ThemeMode>(getInitialMode);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('color-mode', mode);
    }
  }, [mode]);

  React.useEffect(() => {
    const handler = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    window.addEventListener('toggle-color-mode', handler);
    return () => window.removeEventListener('toggle-color-mode', handler);
  }, []);

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
