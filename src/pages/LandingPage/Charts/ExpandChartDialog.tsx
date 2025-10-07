import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';

export type LabelMode = 'percent' | 'absolute';

export interface ExpandChartDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onExportCSV?: () => void;
  onExportPNG?: () => void;
  labelMode: LabelMode;
  onLabelModeChange: (mode: LabelMode) => void;
  children: React.ReactNode;
  contentRef?: React.RefObject<HTMLDivElement>;
}

const ExpandChartDialog: React.FC<ExpandChartDialogProps> = ({
  open,
  title,
  onClose,
  onExportCSV,
  onExportPNG,
  labelMode,
  onLabelModeChange,
  children,
  contentRef,
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="lg" 
      aria-labelledby="expanded-chart-title"
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'center',
          justifyContent: 'center',
        },
        '& .MuiPaper-root': {
          margin: 0, // remove default margin that can offset from center
        },
      }}
    >
      <DialogTitle id="expanded-chart-title" sx={{ pr: 6 }}>
        {title}
        <IconButton onClick={onClose} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ bgcolor: 'background.default' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, gap: 2, flexWrap: 'wrap' }}>
          <ToggleButtonGroup
            size="small"
            value={labelMode}
            exclusive
            onChange={(_, v) => v && onLabelModeChange(v)}
            aria-label="Label mode"
          >
            <ToggleButton value="percent" aria-label="percentage labels">% Labels</ToggleButton>
            <ToggleButton value="absolute" aria-label="absolute labels">Absolute</ToggleButton>
          </ToggleButtonGroup>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {onExportCSV && (
              <Tooltip title="Download CSV">
                <Button size="small" variant="outlined" startIcon={<DownloadIcon />} onClick={onExportCSV}>CSV</Button>
              </Tooltip>
            )}
            {onExportPNG && (
              <Tooltip title="Download PNG">
                <Button size="small" variant="outlined" startIcon={<DownloadIcon />} onClick={onExportPNG}>PNG</Button>
              </Tooltip>
            )}
          </Box>
        </Box>
        <Box ref={contentRef} sx={{ height: 460 }}>
          {children}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpandChartDialog;
