import React from 'react';
import { Card, CardContent, Box, Typography, IconButton, Tooltip } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onExpand?: () => void;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children, onExpand }) => {
  return (
    <Card sx={{ height: '100%', backgroundColor: 'background.paper', position: 'relative' }}>
      <CardContent sx={{ pr: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 0 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {onExpand && (
            <Tooltip title="Expand">
              <IconButton size="small" aria-label="expand chart" onClick={onExpand} sx={{ mt: -0.5 }}>
                <OpenInFullIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        {children}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
