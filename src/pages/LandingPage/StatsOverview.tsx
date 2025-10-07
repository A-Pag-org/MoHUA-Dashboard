import React, { useMemo, useRef, useState } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { DSP_COLORS } from '../../utils/constants';
import {
  DSPComplaintData,
  CDCollectionData,
  MRSUsageData,
  ProgramOverviewData,
} from '../../types';
import ChartCard from './Charts/ChartCard';
import MicroBulletBars, { MicroBulletDatum } from './Charts/MicroBulletBars';
import ExpandChartDialog, { LabelMode } from './Charts/ExpandChartDialog';
import ExpandedBarChart, { ExpandedBarDatum } from './Charts/ExpandedBarChart';
import { exportRowsToCSV, exportSVGContainerToPNG } from './Charts/exportUtils';

// Color constants matching tile styles (use shared DSP_COLORS)
const COLORS = {
  BLACK: '#0E1525',
  SATISFACTORY: DSP_COLORS.SATISFACTORY,
  AVERAGE: DSP_COLORS.AVERAGE,
  UNSATISFACTORY: DSP_COLORS.UNSATISFACTORY,
};

// Helper to map resolution percentage to status buckets
const getStatusFromPercentage = (
  percentage: number
): 'Satisfactory' | 'Average' | 'Unsatisfactory' => {
  if (percentage >= 90) return 'Satisfactory';
  if (percentage >= 50) return 'Average';
  return 'Unsatisfactory';
};

// DSP city data for landing page (Raised, Resolved, Resolution Rate)
const CITY_DSP_DATA: DSPComplaintData[] = [
  {
    city: 'Bahadurgarh',
    raised: 7356,
    resolved: 2169,
    resolutionPercentage: (2169 / 7356) * 100,
    status: getStatusFromPercentage((2169 / 7356) * 100),
  },
  {
    city: 'Delhi',
    raised: 70550,
    resolved: 52984,
    resolutionPercentage: (52984 / 70550) * 100,
    status: getStatusFromPercentage((52984 / 70550) * 100),
  },
  {
    city: 'Faridabad',
    raised: 22161,
    resolved: 17636,
    resolutionPercentage: (17636 / 22161) * 100,
    status: getStatusFromPercentage((17636 / 22161) * 100),
  },
  {
    city: 'Ghaziabad',
    raised: 30814,
    resolved: 26505,
    resolutionPercentage: (26505 / 30814) * 100,
    status: getStatusFromPercentage((26505 / 30814) * 100),
  },
  {
    city: 'Greater Noida',
    raised: 12705,
    resolved: 9575,
    resolutionPercentage: (9575 / 12705) * 100,
    status: getStatusFromPercentage((9575 / 12705) * 100),
  },
  {
    city: 'Gurgaon',
    raised: 26169,
    resolved: 17656,
    resolutionPercentage: (17656 / 26169) * 100,
    status: getStatusFromPercentage((17656 / 26169) * 100),
  },
  {
    city: 'Manesar',
    raised: 9606,
    resolved: 7454,
    resolutionPercentage: (7454 / 9606) * 100,
    status: getStatusFromPercentage((7454 / 9606) * 100),
  },
  {
    city: 'Noida',
    raised: 17742,
    resolved: 16500,
    resolutionPercentage: (16500 / 17742) * 100,
    status: getStatusFromPercentage((16500 / 17742) * 100),
  },
];

// Program overview data (landing page)
const mockData: ProgramOverviewData = {
  dspData: CITY_DSP_DATA,
  cdData: [
    {
      city: 'Delhi',
      target: 1200,
      actual: 1150,
      achievementPercentage: 95.8,
      status: 'Satisfactory',
    },
    {
      city: 'Faridabad',
      target: 1000,
      actual: 750,
      achievementPercentage: 75.0,
      status: 'Average',
    },
    {
      city: 'Ghaziabad',
      target: 800,
      actual: 350,
      achievementPercentage: 43.8,
      status: 'Unsatisfactory',
    },
    {
      city: 'Greater Noida',
      target: 700,
      actual: 680,
      achievementPercentage: 97.1,
      status: 'Satisfactory',
    },
    {
      city: 'Gurgaon',
      target: 600,
      actual: 420,
      achievementPercentage: 70.0,
      status: 'Average',
    },
  ],
  mrsData: [
    {
      city: 'Delhi',
      targetRoadLength: 2500,
      actualRoadLength: 2380,
      coveragePercentage: 95.2,
      status: 'Satisfactory',
    },
    {
      city: 'Faridabad',
      targetRoadLength: 2200,
      actualRoadLength: 1650,
      coveragePercentage: 75.0,
      status: 'Average',
    },
    {
      city: 'Ghaziabad',
      targetRoadLength: 1800,
      actualRoadLength: 720,
      coveragePercentage: 40.0,
      status: 'Unsatisfactory',
    },
    {
      city: 'Greater Noida',
      targetRoadLength: 1600,
      actualRoadLength: 1520,
      coveragePercentage: 95.0,
      status: 'Satisfactory',
    },
    {
      city: 'Gurgaon',
      targetRoadLength: 1400,
      actualRoadLength: 910,
      coveragePercentage: 65.0,
      status: 'Average',
    },
  ],
};

// Section components render micro bars and provide expand action
const DSPSection: React.FC<{
  data: DSPComplaintData[];
  onExpand: (expanded: { title: string; rows: any[]; chart: ExpandedBarDatum[] }) => void;
}> = ({ data, onExpand }) => {
  const microData: MicroBulletDatum[] = useMemo(
    () =>
      data.map((item, i) => ({
        id: `${i}-${item.city}`,
        label: item.city,
        track: item.raised,
        fill: item.resolved,
        percentage: item.resolutionPercentage,
        status: item.status,
      })),
    [data]
  );

  const expandedChart: ExpandedBarDatum[] = useMemo(
    () =>
      data.map((item) => ({
        city: item.city,
        raisedOrTarget: item.raised,
        actualOrResolved: item.resolved,
        percentage: item.resolutionPercentage,
        status: item.status,
      })),
    [data]
  );

  const csvRows = useMemo(
    () =>
      data.map((d) => ({
        City: d.city,
        Raised: d.raised,
        Resolved: d.resolved,
        ResolutionPercentage: d.resolutionPercentage.toFixed(1),
        Status: d.status,
      })),
    [data]
  );

  return (
    <ChartCard
      title="Complaint Status: Road repairs & Civic Infra"
      subtitle="Percent resolved"
      onExpand={() => onExpand({ title: 'DSP — Complaints Resolved', rows: csvRows, chart: expandedChart })}
    >
      <MicroBulletBars data={microData} />
    </ChartCard>
  );
};

// C&D Section Component
const CDSection: React.FC<{
  data: CDCollectionData[];
  onExpand: (expanded: { title: string; rows: any[]; chart: ExpandedBarDatum[] }) => void;
}> = ({ data, onExpand }) => {
  const microData: MicroBulletDatum[] = useMemo(
    () =>
      data.map((item, i) => ({
        id: `${i}-${item.city}`,
        label: item.city,
        track: item.target,
        fill: item.actual,
        percentage: item.achievementPercentage,
        status: item.status,
      })),
    [data]
  );

  const expandedChart: ExpandedBarDatum[] = useMemo(
    () =>
      data.map((item) => ({
        city: item.city,
        raisedOrTarget: item.target,
        actualOrResolved: item.actual,
        percentage: item.achievementPercentage,
        status: item.status,
      })),
    [data]
  );

  const csvRows = useMemo(
    () =>
      data.map((d) => ({
        City: d.city,
        Target: d.target,
        Actual: d.actual,
        AchievementPercentage: d.achievementPercentage.toFixed(1),
        Status: d.status,
      })),
    [data]
  );

  return (
    <ChartCard
      title="Citywise C&D Collection Status"
      subtitle="Percent achieved"
      onExpand={() => onExpand({ title: 'C&D — Collection Achievement', rows: csvRows, chart: expandedChart })}
    >
      <MicroBulletBars data={microData} />
    </ChartCard>
  );
};

// MRS Section Component
const MRSSection: React.FC<{
  data: MRSUsageData[];
  onExpand: (expanded: { title: string; rows: any[]; chart: ExpandedBarDatum[] }) => void;
}> = ({ data, onExpand }) => {
  const microData: MicroBulletDatum[] = useMemo(
    () =>
      data.map((item, i) => ({
        id: `${i}-${item.city}`,
        label: item.city,
        track: item.targetRoadLength,
        fill: item.actualRoadLength,
        percentage: item.coveragePercentage,
        status: item.status,
      })),
    [data]
  );

  const expandedChart: ExpandedBarDatum[] = useMemo(
    () =>
      data.map((item) => ({
        city: item.city,
        raisedOrTarget: item.targetRoadLength,
        actualOrResolved: item.actualRoadLength,
        percentage: item.coveragePercentage,
        status: item.status,
      })),
    [data]
  );

  const csvRows = useMemo(
    () =>
      data.map((d) => ({
        City: d.city,
        TargetRoadLength: d.targetRoadLength,
        ActualRoadLength: d.actualRoadLength,
        CoveragePercentage: d.coveragePercentage.toFixed(1),
        Status: d.status,
      })),
    [data]
  );

  return (
    <ChartCard
      title="Citywise MRS Usage Status"
      subtitle="Percent road length covered"
      onExpand={() => onExpand({ title: 'MRS — Road Coverage', rows: csvRows, chart: expandedChart })}
    >
      <MicroBulletBars data={microData} />
    </ChartCard>
  );
};

// Main StatsOverview Component
const StatsOverview: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [labelMode, setLabelMode] = useState<LabelMode>('percent');
  const [dialogTitle, setDialogTitle] = useState('');
  const [expandedData, setExpandedData] = useState<ExpandedBarDatum[]>([]);
  const [csvRows, setCsvRows] = useState<any[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const openExpand = (cfg: { title: string; rows: any[]; chart: ExpandedBarDatum[] }) => {
    setDialogTitle(cfg.title);
    setExpandedData(cfg.chart);
    setCsvRows(cfg.rows);
    setDialogOpen(true);
  };

  const exportCSV = () => exportRowsToCSV(`${dialogTitle.replace(/\s+/g, '_').toLowerCase()}.csv`, csvRows);
  const exportPNG = () => {
    if (contentRef.current) {
      exportSVGContainerToPNG(contentRef.current, `${dialogTitle.replace(/\s+/g, '_').toLowerCase()}.png`);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3, position: 'relative' }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ 
          textAlign: 'center', 
          mb: 4, 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #7aa2ff 0%, #89d0ff 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 6px rgba(0,0,0,0.25)'
        }}
      >
        Program Overview Statistics
      </Typography>
      
      <Grid container spacing={3}>
        {/* DSP Section */}
        <Grid item xs={12} lg={4}>
          <DSPSection data={mockData.dspData} onExpand={openExpand} />
        </Grid>
        
        {/* C&D Section */}
        <Grid item xs={12} lg={4}>
          <CDSection data={mockData.cdData} onExpand={openExpand} />
        </Grid>
        
        {/* MRS Section */}
        <Grid item xs={12} lg={4}>
          <MRSSection data={mockData.mrsData} onExpand={openExpand} />
        </Grid>
      </Grid>

      {/* Unified status legend below the three charts */}
      <Box
        sx={{
          mt: 2.5,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            p: 1,
            borderRadius: '12px',
            background: 'rgba(16, 27, 42, 0.6)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: COLORS.SATISFACTORY, borderRadius: '3px' }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              Satisfactory (≥90%)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: COLORS.AVERAGE, borderRadius: '3px' }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              Average (50-89%)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: COLORS.UNSATISFACTORY, borderRadius: '3px' }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              Unsatisfactory (&lt;50%)
            </Typography>
          </Box>
        </Box>
      </Box>
      <ExpandChartDialog
        open={dialogOpen}
        title={dialogTitle}
        onClose={() => setDialogOpen(false)}
        onExportCSV={exportCSV}
        onExportPNG={exportPNG}
        labelMode={labelMode}
        onLabelModeChange={setLabelMode}
        contentRef={contentRef}
      >
        <ExpandedBarChart data={expandedData} labelMode={labelMode} />
      </ExpandChartDialog>

    </Container>
  );
};

export default StatsOverview;