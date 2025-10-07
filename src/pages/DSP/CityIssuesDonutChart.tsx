import React, { useMemo, useRef, useState } from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton, Tooltip, ToggleButtonGroup, ToggleButton, MenuItem, Select, FormControl, FormHelperText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as ReTooltip, Legend } from 'recharts';
import { exportRowsToCSV, exportSVGContainerToPNG } from '../LandingPage/Charts/exportUtils';

export interface CityIssueDatum {
  category: string;
  raised: number;
  resolved: number;
}

export interface CityIssuesDonutChartProps {
  cityName: string;
  data: CityIssueDatum[]; // any blanks already filtered by caller
}

type LabelMode = 'percent' | 'absolute';
type SortMode = 'raised' | 'resolved' | 'rate' | 'alpha';

const CATEGORY_PALETTE = [
  '#7aa2ff', '#4CAF50', '#FFD54F', '#F44336', '#26C6DA', '#BA68C8',
  '#FFA726', '#81C784', '#E57373', '#64B5F6', '#A1887F', '#90A4AE'
];

const getRate = (raised: number, resolved: number) => (raised > 0 ? (resolved / raised) * 100 : 0);

interface RingDatum {
  name: string;
  value: number;
  color: string;
  rate: number;
  raised?: number;
  resolved?: number;
}

const CityIssuesDonutChart: React.FC<CityIssuesDonutChartProps> = ({ cityName, data }: CityIssuesDonutChartProps) => {
  const [labelMode, setLabelMode] = useState<LabelMode>('percent');
  const [sortMode, setSortMode] = useState<SortMode>('raised');
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const cleaned = useMemo((): CityIssueDatum[] => {
    return (data || [])
      .filter((d: CityIssueDatum) => Number.isFinite(d.raised) && Number.isFinite(d.resolved))
      .filter((d: CityIssueDatum) => d.raised > 0 || d.resolved > 0);
  }, [data]);

  const filtered = useMemo((): CityIssueDatum[] => {
    const q = query.trim().toLowerCase();
    if (!q) return cleaned;
    return cleaned.filter((d: CityIssueDatum) => d.category.toLowerCase().includes(q));
  }, [cleaned, query]);

  const totals = useMemo(() => {
    const raised = filtered.reduce((s: number, d: CityIssueDatum) => s + d.raised, 0);
    const resolved = filtered.reduce((s: number, d: CityIssueDatum) => s + d.resolved, 0);
    return { raised, resolved, rate: getRate(raised, resolved) };
  }, [filtered]);

  const sorted = useMemo((): CityIssueDatum[] => {
    const arr: CityIssueDatum[] = [...filtered];
    switch (sortMode) {
      case 'resolved':
        arr.sort((a: CityIssueDatum, b: CityIssueDatum) => b.resolved - a.resolved);
        break;
      case 'rate':
        arr.sort((a: CityIssueDatum, b: CityIssueDatum) => getRate(b.raised, b.resolved) - getRate(a.raised, a.resolved));
        break;
      case 'alpha':
        arr.sort((a: CityIssueDatum, b: CityIssueDatum) => a.category.localeCompare(b.category));
        break;
      default:
        arr.sort((a: CityIssueDatum, b: CityIssueDatum) => b.raised - a.raised);
    }
    return arr;
  }, [filtered, sortMode]);

  const raisedSeries: RingDatum[] = useMemo(() => sorted.map((d: CityIssueDatum, i: number): RingDatum => ({
    name: d.category,
    value: d.raised,
    color: CATEGORY_PALETTE[i % CATEGORY_PALETTE.length],
    rate: getRate(d.raised, d.resolved),
    resolved: d.resolved,
  })), [sorted]);

  const resolvedSeries: RingDatum[] = useMemo(() => sorted.map((d: CityIssueDatum, i: number): RingDatum => ({
    name: d.category,
    value: d.resolved,
    color: CATEGORY_PALETTE[i % CATEGORY_PALETTE.length],
    rate: getRate(d.raised, d.resolved),
    raised: d.raised,
  })), [sorted]);

  const tooltipFormatter = (_: any, __: any, p: any) => {
    const payload = p?.payload;
    if (!payload) return _;
    const name = payload.name as string;
    const raised = payload.raised ?? payload.value; // depends on series
    const resolved = payload.resolved ?? payload.value;
    const shareRaised = totals.raised > 0 ? (payload.raised ?? 0) / totals.raised * 100 : 0;
    const shareResolved = totals.resolved > 0 ? (payload.resolved ?? 0) / totals.resolved * 100 : 0;
    const rate = payload.rate ?? getRate(raised, resolved);
    return [
      `${labelMode === 'percent' ? rate.toFixed(1) + '%' : resolved.toLocaleString()}`,
      name,
      {
        name,
        raised: raised?.toLocaleString?.() ?? raised,
        resolved: resolved?.toLocaleString?.() ?? resolved,
        shareRaised: `${shareRaised.toFixed(1)}%`,
        shareResolved: `${shareResolved.toFixed(1)}%`,
        rate: `${rate.toFixed(1)}%`,
      },
    ];
  };

  const exportCSV = () => {
    const rows = sorted.map((d: CityIssueDatum) => ({
      Category: d.category,
      Raised: d.raised,
      Resolved: d.resolved,
      ResolutionRatePct: getRate(d.raised, d.resolved).toFixed(1),
    }));
    exportRowsToCSV(`${cityName.replace(/\s+/g, '_')}_issues.csv`, rows);
  };

  const exportPNG = async () => {
    if (containerRef.current) {
      await exportSVGContainerToPNG(containerRef.current, `${cityName.replace(/\s+/g, '_')}_issues.png`);
    }
  };

  return (
    <Box>
      {/* Controls */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <TextField
          size="small"
          placeholder="Search category"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setQuery('')}><RestartAltIcon fontSize="small" /></IconButton>
              </InputAdornment>
            ) : null,
          }}
        />

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <FormControl size="small">
            <Select value={sortMode} onChange={(e) => setSortMode(e.target.value as SortMode)} displayEmpty>
              <MenuItem value="raised">Sort: Raised</MenuItem>
              <MenuItem value="resolved">Sort: Resolved</MenuItem>
              <MenuItem value="rate">Sort: Resolution %</MenuItem>
              <MenuItem value="alpha">Sort: A→Z</MenuItem>
            </Select>
            <FormHelperText sx={{ color: 'rgba(255,255,255,0.6)' }}>Categories order</FormHelperText>
          </FormControl>

          <ToggleButtonGroup size="small" value={labelMode} exclusive onChange={(
            _event: React.MouseEvent<HTMLElement>,
            v: LabelMode | null
          ) => v && setLabelMode(v)}>
            <ToggleButton value="percent">% Labels</ToggleButton>
            <ToggleButton value="absolute">Absolute</ToggleButton>
          </ToggleButtonGroup>

          <Tooltip title="Export CSV">
            <IconButton size="small" onClick={exportCSV} aria-label="export csv">
              <span className="material-icons" style={{ fontSize: 18 }}>table_view</span>
            </IconButton>
          </Tooltip>
          <Tooltip title="Export PNG">
            <IconButton size="small" onClick={exportPNG} aria-label="export png">
              <span className="material-icons" style={{ fontSize: 18 }}>image</span>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Donut chart */}
      <Box ref={containerRef} sx={{ height: 420, bgcolor: 'transparent' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <ReTooltip
              contentStyle={{ background: '#0E1525', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8 }}
              labelStyle={{ color: '#E6EDF3' }}
              itemStyle={{ color: '#E6EDF3' }}
              formatter={tooltipFormatter}
            />

            {/* Outer ring: Raised */}
            <Pie
              data={raisedSeries}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={110}
              outerRadius={150}
              paddingAngle={1}
              isAnimationActive
            >
              {raisedSeries.map((e: RingDatum, i: number) => (
                <Cell key={`raised-${i}`} fill={e.color} stroke="rgba(0,0,0,0.2)" />
              ))}
            </Pie>

            {/* Inner ring: Resolved */}
            <Pie
              data={resolvedSeries}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={1}
              isAnimationActive
              label={({ value, percent }: { value: number; percent?: number }) =>
                labelMode === 'percent' ? `${Math.round((percent || 0) * 100)}%` : `${(value ?? 0).toLocaleString()}`
              }
              labelLine={false}
            >
              {resolvedSeries.map((e: RingDatum, i: number) => (
                <Cell key={`resolved-${i}`} fill={e.color} stroke="rgba(0,0,0,0.2)" />
              ))}
            </Pie>

            <Legend verticalAlign="bottom" align="center" wrapperStyle={{ color: '#E6EDF3' }} />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Center stats overlay */}
      <Box sx={{ position: 'relative', mt: -36, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: -340, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{cityName}</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Raised {totals.raised.toLocaleString()} • Resolved {totals.resolved.toLocaleString()} • {totals.rate.toFixed(1)}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CityIssuesDonutChart;

