import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Box, Button, Stack } from '@mui/material'

type ProgramKey = 'DSP' | 'C&D' | 'MRS'

const PROGRAMS: ProgramKey[] = ['DSP', 'C&D', 'MRS']

export default function Header() {
	const [selected, setSelected] = useState<ProgramKey>('DSP')

	return (
<AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
	<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, py: 1.5 }}>
		<Typography variant="h6" sx={{ fontWeight: 700, color: '#000' }}>MoHUA</Typography>
		<Box>
			<Stack direction="row" spacing={2}>
				{PROGRAMS.map((key) => {
					const isSelected = selected === key
					return (
						<Button
							key={key}
							variant="contained"
							onClick={() => setSelected(key)}
							sx={{
								textTransform: 'none',
								fontWeight: 700,
								px: 3,
								py: 1,
								borderRadius: 1.5,
								transition: 'transform 80ms ease, box-shadow 120ms ease, background-color 120ms ease',
								backgroundColor: isSelected ? '#4CAF50' : '#e0e0e0',
								color: isSelected ? '#fff' : '#000',

								// 3D effect
								boxShadow: isSelected
									? '0 6px 0 #2e7d32, 0 6px 12px rgba(0,0,0,0.2)'
									: '0 6px 0 #9e9e9e, 0 6px 12px rgba(0,0,0,0.12)',
								'&:hover': {
									backgroundColor: isSelected ? '#43A047' : '#d5d5d5'
								},
								'&:active': {
									transform: 'translateY(2px)',
									boxShadow: isSelected
										? '0 4px 0 #2e7d32, 0 4px 8px rgba(0,0,0,0.2)'
										: '0 4px 0 #9e9e9e, 0 4px 8px rgba(0,0,0,0.12)'
								}
							}}
						>
							{key}
						</Button>
					)
				})}
			</Stack>
		</Box>
	</Toolbar>
</AppBar>
	)
}

