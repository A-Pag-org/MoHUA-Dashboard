import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Divider,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { DSPCity } from '../../types';
import { DSP_COLORS, MOCK_DSP_CITIES } from '../../utils/constants';

// Helper function to get color based on resolution percentage
const getResolutionColor = (percentage: number): string => {
  if (percentage >= 90) return DSP_COLORS.SATISFACTORY;
  if (percentage >= 50) return DSP_COLORS.AVERAGE;
  return DSP_COLORS.UNSATISFACTORY;
};

// Helper function to get status based on resolution percentage
const getResolutionStatus = (percentage: number): 'Satisfactory' | 'Average' | 'Unsatisfactory' => {
  if (percentage >= 90) return 'Satisfactory';
  if (percentage >= 50) return 'Average';
  return 'Unsatisfactory';
};

// Styled components
const CityTileCard = styled(Card)<{ resolutionColor: string }>(({ resolutionColor }) => ({
  height: '100%',
  borderRadius: '16px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  border: `2px solid ${resolutionColor}`,
  borderLeft: `8px solid ${resolutionColor}`,
  boxShadow: `0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px ${resolutionColor}20`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 32px rgba(0,0,0,0.12), 0 0 0 2px ${resolutionColor}40`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '0',
    height: '0',
    borderStyle: 'solid',
    borderWidth: '0 40px 40px 0',
    borderColor: `transparent ${resolutionColor}20 transparent transparent`,
  }
}));

const StatusChip = styled(Chip)<{ status: string }>(({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Satisfactory': return DSP_COLORS.SATISFACTORY;
      case 'Average': return DSP_COLORS.AVERAGE;
      case 'Unsatisfactory': return DSP_COLORS.UNSATISFACTORY;
      default: return DSP_COLORS.AVERAGE;
    }
  };

  return {
    backgroundColor: `${getStatusColor()}20`,
    color: getStatusColor(),
    fontWeight: 600,
    fontSize: '0.75rem',
    height: '24px',
  };
});

const ResolutionPercentage = styled(Typography)<{ resolutionColor: string }>(({ resolutionColor }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: resolutionColor,
  lineHeight: 1,
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

interface CityTileProps {
  city: DSPCity;
  onMoreInfo: (city: DSPCity) => void;
}

const CityTile: React.FC<CityTileProps> = ({ city, onMoreInfo }) => {
  const resolutionColor = getResolutionColor(city.resolutionPercentage);
  const status = getResolutionStatus(city.resolutionPercentage);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <CityTileCard resolutionColor={resolutionColor}>
        <CardActionArea onClick={() => onMoreInfo(city)} sx={{ height: '100%' }}>
          <CardContent sx={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header with city name and status */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  fontSize: '1.1rem',
                  lineHeight: 1.2,
                  flex: 1,
                  pr: 1
                }}
              >
                {city.cityName}
              </Typography>
              <StatusChip 
                label={status} 
                status={status} 
                size="small"
              />
            </Box>

            {/* Resolution percentage - prominently displayed */}
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <ResolutionPercentage resolutionColor={resolutionColor}>
                {city.resolutionPercentage.toFixed(1)}%
              </ResolutionPercentage>
              <Typography variant="body2" sx={{ color: '#7f8c8d', fontSize: '0.85rem', mt: 0.5 }}>
                Resolution Rate
              </Typography>
            </Box>

            <Divider sx={{ my: 1.5, backgroundColor: `${resolutionColor}30` }} />

            {/* Complaints data */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: '#34495e', fontWeight: 500 }}>
                  Complaints Raised:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                  {city.complaintsRaised.toLocaleString()}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: '#34495e', fontWeight: 500 }}>
                  Complaints Resolved:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: resolutionColor }}>
                  {city.complaintsResolved.toLocaleString()}
                </Typography>
              </Box>

              {/* More info indicator */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 'auto', pt: 2 }}>
                <InfoIcon sx={{ fontSize: '16px', color: '#7f8c8d', mr: 0.5 }} />
                <Typography variant="caption" sx={{ color: '#7f8c8d', fontSize: '0.75rem' }}>
                  Click for more info
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </CityTileCard>
    </Grid>
  );
};

interface CityDetailsDialogProps {
  city: DSPCity | null;
  open: boolean;
  onClose: () => void;
}

const CityDetailsDialog: React.FC<CityDetailsDialogProps> = ({ city, open, onClose }) => {
  if (!city) return null;

  const resolutionColor = getResolutionColor(city.resolutionPercentage);
  const status = getResolutionStatus(city.resolutionPercentage);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: '0 16px 48px rgba(0,0,0,0.2)',
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: `${resolutionColor}10`, 
        color: '#2c3e50',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pb: 2
      }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            {city.cityName}
          </Typography>
          <StatusChip 
            label={status} 
            status={status} 
            size="small"
          />
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        {/* Resolution percentage highlight */}
        <Box sx={{ textAlign: 'center', mb: 3, p: 2, bgcolor: `${resolutionColor}08`, borderRadius: '12px' }}>
          <ResolutionPercentage resolutionColor={resolutionColor}>
            {city.resolutionPercentage.toFixed(1)}%
          </ResolutionPercentage>
          <Typography variant="body1" sx={{ color: '#7f8c8d', mt: 0.5 }}>
            Overall Resolution Rate
          </Typography>
        </Box>

        {/* Detailed statistics */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ bgcolor: '#f8f9fa', borderRadius: '12px' }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <TrendingUpIcon sx={{ fontSize: 40, color: '#e74c3c', mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                  {city.complaintsRaised.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                  Complaints Raised
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card sx={{ bgcolor: '#f8f9fa', borderRadius: '12px' }}>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <TrendingDownIcon sx={{ fontSize: 40, color: resolutionColor, mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                  {city.complaintsResolved.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                  Complaints Resolved
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Additional city information */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Issues Raised by Citizens:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {city.issuesRaisedByCitizens.toLocaleString()}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Road Owning Agencies Onboarded:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {city.roadOwningAgenciesOnboarded}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button 
          onClick={onClose} 
          variant="contained" 
          sx={{ 
            backgroundColor: resolutionColor,
            '&:hover': {
              backgroundColor: resolutionColor,
              filter: 'brightness(0.9)',
            },
            borderRadius: '8px',
            px: 3
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CityTiles: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<DSPCity | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleMoreInfo = (city: DSPCity) => {
    setSelectedCity(city);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCity(null);
  };

  // Get statistics for the header
  const totalCities = MOCK_DSP_CITIES.length;
  const satisfactoryCities = MOCK_DSP_CITIES.filter(city => city.resolutionPercentage >= 90).length;
  const averageCities = MOCK_DSP_CITIES.filter(city => city.resolutionPercentage >= 50 && city.resolutionPercentage < 90).length;
  const unsatisfactoryCities = MOCK_DSP_CITIES.filter(city => city.resolutionPercentage < 50).length;

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#2c3e50', 
            mb: 2,
            textAlign: 'center'
          }}
        >
          City-wise Overview
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#7f8c8d', 
            mb: 3,
            textAlign: 'center',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Comprehensive overview of DSP complaint resolution across all participating cities. 
          Each tile displays key metrics with dynamic color coding based on resolution performance.
        </Typography>

        {/* Summary Statistics */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Card sx={{ textAlign: 'center', borderRadius: '12px', bgcolor: '#f8f9fa' }}>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                  {totalCities}
                </Typography>
                <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                  Total Cities
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={3}>
            <Card sx={{ textAlign: 'center', borderRadius: '12px', bgcolor: `${DSP_COLORS.SATISFACTORY}10` }}>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: DSP_COLORS.SATISFACTORY }}>
                  {satisfactoryCities}
                </Typography>
                <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                  Satisfactory (&ge;90%)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={3}>
            <Card sx={{ textAlign: 'center', borderRadius: '12px', bgcolor: `${DSP_COLORS.AVERAGE}10` }}>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: DSP_COLORS.AVERAGE }}>
                  {averageCities}
                </Typography>
                <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                  Average (50-89%)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={3}>
            <Card sx={{ textAlign: 'center', borderRadius: '12px', bgcolor: `${DSP_COLORS.UNSATISFACTORY}10` }}>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: DSP_COLORS.UNSATISFACTORY }}>
                  {unsatisfactoryCities}
                </Typography>
                <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                  Unsatisfactory (&lt;50%)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* City Tiles Grid */}
      <Grid container spacing={3}>
        {MOCK_DSP_CITIES.map((city) => (
          <CityTile
            key={city.id}
            city={city}
            onMoreInfo={handleMoreInfo}
          />
        ))}
      </Grid>

      {/* City Details Dialog */}
      <CityDetailsDialog
        city={selectedCity}
        open={dialogOpen}
        onClose={handleCloseDialog}
      />
    </Box>
  );
};

export default CityTiles;