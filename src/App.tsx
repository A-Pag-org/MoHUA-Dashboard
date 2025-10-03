import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import DSPDashboard from './pages/DSP/DSPDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dsp" element={<DSPDashboard />} />
      <Route path="/cd" element={<div>Coming Soon - C&D Dashboard</div>} />
      <Route path="/mrs" element={<div>Coming Soon - MRS Dashboard</div>} />
    </Routes>
  )
}

export default App
