import React from 'react'

import { Container } from '@mui/material'
import Header from './components/Common/Header'

export default function App() {
	return (
		<div style={{ fontFamily: 'Roboto, sans-serif' }}>
			<Header />
			<Container sx={{ py: 3 }}>
				<h1>MoHUA Dashboard</h1>
				<p>Project scaffold is working.</p>
			</Container>
		</div>
	)
}

