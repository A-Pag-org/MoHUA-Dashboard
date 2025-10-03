<<<<<<< HEAD
import React from 'react'
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
=======

export default function App() {
	return (
		<div style={{ padding: 24, fontFamily: 'Roboto, sans-serif' }}>
			<h1>MoHUA Dashboard</h1>
			<p>Project scaffold is working.</p>
		</div>
	)
}

>>>>>>> b921ad9a7fcd48acf18f26d1c7e0abb207243286
