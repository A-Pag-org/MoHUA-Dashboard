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
    <Card
      sx={{
        height: '100%',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.16) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.25)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
        position: 'relative',
      }}
    >
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
