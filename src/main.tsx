<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.tsx'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green for satisfactory
    },
    secondary: {
      main: '#FFC107', // Amber for average
    },
    error: {
      main: '#F44336', // Red for unsatisfactory
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

	createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<App />
	</StrictMode>
)

>>>>>>> b921ad9a7fcd48acf18f26d1c7e0abb207243286
