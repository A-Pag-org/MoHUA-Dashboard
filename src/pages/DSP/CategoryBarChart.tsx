import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Typography, Paper, ToggleButton, ToggleButtonGroup, Divider } from '@mui/material';
// Removed DSP_COLORS import as percentages are hidden now

interface CategoryData {
  category: string;
  raised: number;
  resolved: number;
}

interface CategoryBarChartProps {
  data: CategoryData[];
  cityName: string;
}

// Radial geometry helpers
const toRadians = (deg: number) => (deg * Math.PI) / 180;
const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => ({
  x: cx + r * Math.cos(angle),
  y: cy + r * Math.sin(angle),
});

const donutArcPath = (
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  start: number,
  end: number
) => {
  const largeArc = end - start > Math.PI ? 1 : 0;
  const p1 = polarToCartesian(cx, cy, outerR, start);
  const p2 = polarToCartesian(cx, cy, outerR, end);
  const p3 = polarToCartesian(cx, cy, innerR, end);
  const p4 = polarToCartesian(cx, cy, innerR, start);
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    'Z',
  ].join(' ');
};

// Pleasant readable color palette for categories (max 12 distinct + grey for Other)
const CATEGORY_COLORS = [
  '#7aa2ff', '#4fd1c5', '#ffd166', '#fb7185', '#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#f472b6', '#22c55e', '#c084fc', '#38bdf8',
];
const OTHER_COLOR = 'rgba(255,255,255,0.25)';

type ViewMode = 'donut' | 'bars';

interface ProcessedRow extends CategoryData {
  color: string;
  raisedShare: number;
  resolvedShare: number;
  resolutionRate: number;
}

const CategoryBarChart: React.FC<CategoryBarChartProps> = ({ data, cityName }) => {
  const DISPLAY_SCALE = 0.65; // scale down visual size for better fit
  // Display tuning constants
  const AGGREGATION_THRESHOLD = 0.025; // 2.5%
  const MAX_SLICES_VISIBLE = 8; // cap visible slices for readability

  // Data prep with small-slice aggregation for readability
  const processed = useMemo((): { rows: ProcessedRow[]; totalRaised: number; totalResolved: number; overallRate: number } => {
    const totalRaised = data.reduce((s: number, d: CategoryData) => s + d.raised, 0) || 1;
    const totalResolved = data.reduce((s: number, d: CategoryData) => s + d.resolved, 0) || 1;
    const threshold = AGGREGATION_THRESHOLD;
    const MAX_SLICES = MAX_SLICES_VISIBLE;
    const sorted = [...data].sort((a: CategoryData, b: CategoryData) => b.raised - a.raised);
    const major: CategoryData[] = [];
    const other: CategoryData[] = [];
    sorted.forEach((d: CategoryData, idx: number) => {
      const share = d.raised / totalRaised;
      if (idx >= MAX_SLICES - 1 || share < threshold) other.push(d); else major.push(d);
    });
    if (other.length) {
      major.push({
        category: 'Other',
        raised: other.reduce((s: number, d: CategoryData) => s + d.raised, 0),
        resolved: other.reduce((s: number, d: CategoryData) => s + d.resolved, 0),
      });
    }
    const withColors: ProcessedRow[] = major.map((d: CategoryData, i: number) => ({
      ...d,
      color: d.category === 'Other' ? OTHER_COLOR : CATEGORY_COLORS[i % CATEGORY_COLORS.length],
      raisedShare: d.raised / totalRaised,
      resolvedShare: d.resolved / totalResolved,
      resolutionRate: d.raised > 0 ? (d.resolved / d.raised) * 100 : 0,
    }));
    return {
      rows: withColors,
      totalRaised,
      totalResolved,
      overallRate: (totalResolved / totalRaised) * 100,
    };
  }, [data]);

  const [view, setView] = useState<ViewMode>('donut');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // Geometry
  const chartBoxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number>(340);

  useEffect(() => {
    const el = chartBoxRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 340;
      const clamped = Math.max(260, Math.min(420, Math.floor(w)));
      setSize(clamped);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const center = size / 2;
  const padding = Math.max(8, Math.floor(size * 0.03));
  const ringThickness = Math.max(18, Math.floor(size * 0.075));
  const ringGap = Math.max(10, Math.floor(size * 0.04));
  const outerR = center - padding;
  const innerR = outerR - ringThickness; // outer ring thickness
  const innerOuterR = innerR - ringGap; // inter-ring gap
  const innerInnerR = innerOuterR - ringThickness; // inner ring thickness
  const pad = toRadians(0.8); // small gap between slices

  // Precompute cumulative angles
  const raisedAngles = useMemo(() => {
    let acc = -Math.PI / 2; // start at top
    return processed.rows.map((r: ProcessedRow) => {
      const a0 = acc;
      const delta = Math.max(0, r.raisedShare * Math.PI * 2 - pad);
      acc += delta + pad;
      return { start: a0 + pad / 2, end: a0 + pad / 2 + delta };
    });
  }, [processed.rows]);

  const resolvedAngles = useMemo(() => {
    let acc = -Math.PI / 2;
    return processed.rows.map((r: ProcessedRow) => {
      const a0 = acc;
      const delta = Math.max(0, r.resolvedShare * Math.PI * 2 - pad);
      acc += delta + pad;
      return { start: a0 + pad / 2, end: a0 + pad / 2 + delta };
    });
  }, [processed.rows]);

  // Bars view reused from original but simplified; kept for optional toggle
  const BarsView = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
      {processed.rows.map((r: ProcessedRow, idx: number) => (
        <Box key={idx}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5, gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500, fontSize: '0.8rem', minWidth: '180px', flex: 1 }}>
              {r.category}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem' }}>
                {r.resolved.toLocaleString()} / {r.raised.toLocaleString()}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ position: 'relative', height: '20px', background: '#363636', borderRadius: '10px', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', inset: 0, width: `${Math.min(r.resolutionRate, 100)}%`, background: r.category === 'Other' ? OTHER_COLOR : r.color, boxShadow: `0 0 8px ${r.color}55`, transition: 'width 0.5s ease' }} />
          </Box>
        </Box>
      ))}
      
      {/* Performance Legend */}
      <Box sx={{ 
        mt: 3, 
        pt: 2,
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 14, 
              height: 14, 
              borderRadius: '50%', 
              background: '#4CAF50',
              boxShadow: '0 0 8px #4CAF5040',
            }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
              Satisfactory (≥90%)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 14, 
              height: 14, 
              borderRadius: '50%', 
              background: '#FFD54F',
              boxShadow: '0 0 8px #FFD54F40',
            }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
              Average (50-89%)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ 
              width: 14, 
              height: 14, 
              borderRadius: '50%', 
              background: '#F44336',
              boxShadow: '0 0 8px #F4433640',
            }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
              Unsatisfactory (&lt;50%)
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  // Donut view
  const DonutView = (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'stretch', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
      <Box ref={chartBoxRef} sx={{ flex: '1 1 340px', minWidth: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: `scale(${DISPLAY_SCALE})`, transformOrigin: 'center' }}>
          {/* Outer ring background */}
          <circle cx={center} cy={center} r={outerR} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={ringThickness} />
          {/* Inner ring background */}
          <circle cx={center} cy={center} r={innerOuterR} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={ringThickness} />

          {/* Raised (outer ring) */}
          {processed.rows.map((r: ProcessedRow, idx: number) => (
            <path
              key={`raised-${idx}`}
              d={donutArcPath(center, center, outerR, innerR, raisedAngles[idx].start, raisedAngles[idx].end)}
              fill={r.category === 'Other' ? OTHER_COLOR : r.color}
              opacity={hoverIdx === null || hoverIdx === idx ? 1 : 0.35}
              stroke="#0e1525"
              strokeWidth={1}
              onMouseEnter={() => setHoverIdx(idx)}
              onMouseLeave={() => setHoverIdx(null)}
            >
              <title>{`${r.category}: Raised ${r.raised.toLocaleString()} (${(r.raisedShare*100).toFixed(1)}%)`}</title>
            </path>
          ))}

          {/* Resolved (inner ring) */}
          {processed.rows.map((r: ProcessedRow, idx: number) => (
            <path
              key={`resolved-${idx}`}
              d={donutArcPath(center, center, innerOuterR, innerInnerR, resolvedAngles[idx].start, resolvedAngles[idx].end)}
              fill={r.category === 'Other' ? OTHER_COLOR : r.color}
              opacity={hoverIdx === null || hoverIdx === idx ? 1 : 0.35}
              stroke="#0e1525"
              strokeWidth={1}
              onMouseEnter={() => setHoverIdx(idx)}
              onMouseLeave={() => setHoverIdx(null)}
            >
              <title>{`${r.category}: Resolved ${r.resolved.toLocaleString()} (${(r.resolvedShare*100).toFixed(1)}%)`}</title>
            </path>
          ))}

          {/* Center labels (overall or hovered category) */}
          <g pointerEvents="none">
            {hoverIdx === null ? (
              <>
                <text
                  x={center}
                  y={center - Math.floor(size * 0.02)}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.95)"
                  fontSize={Math.floor(size * 0.10)}
                >
                  {processed.overallRate.toFixed(1)}%
                </text>
                <text x={center} y={center + Math.floor(size * 0.06)} textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize={Math.floor(size * 0.035)}>
                  Overall Resolution
                </text>
              </>
            ) : (
              <>
                <text x={center} y={center + Math.floor(size * 0.015)} textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize={Math.floor(size * 0.035)}>
                  {processed.rows[hoverIdx].category}
                </text>
                <text x={center} y={center + Math.floor(size * 0.07)} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize={Math.floor(size * 0.032)}>
                  {`${processed.rows[hoverIdx].resolved.toLocaleString()} / ${processed.rows[hoverIdx].raised.toLocaleString()}`}
                </text>
              </>
            )}
          </g>
        </svg>
      </Box>

      {/* Legend */}
      <Box sx={{ flex: '1 1 260px', minWidth: 240, pr: 1 }}>
        <Typography variant="body2" sx={{ color: '#ffffff', mb: 0.6, textAlign: 'center' }}>
          Raised vs Resolved by Category
        </Typography>
        <Divider sx={{ mb: 0.6, borderColor: 'rgba(255,255,255,0.08)' }} />
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0.55 }}>
          {processed.rows.map((r: ProcessedRow, idx: number) => (
            <Box key={`leg-${idx}`} onMouseEnter={() => setHoverIdx(idx)} onMouseLeave={() => setHoverIdx(null)} sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 0.45, borderRadius: 1, cursor: 'default', background: hoverIdx === idx ? 'rgba(255,255,255,0.06)' : 'transparent' }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '3px', background: r.category === 'Other' ? OTHER_COLOR : r.color, boxShadow: `0 0 6px ${r.color}40` }} />
              <Typography variant="body2" sx={{ color: '#ffffff', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {r.category}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );

  return (
    <Paper
      sx={{
        borderRadius: '12px',
        background: 'rgba(16, 27, 42, 0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
        p: 1.5,
        pb: 3,
        mt: 1.5,
        width: '100%',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 1.25, position: 'relative' }}>
        {/* City name - Top Left */}
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            fontWeight: 700,
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            fontSize: '1.5rem',
          }}
        >
          {cityName}
        </Typography>
        
        {/* Performance Legend - Top Right (only in bars view) */}
        {view === 'bars' && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: '#52627A',
            borderRadius: '8px',
            px: 2,
            py: 1,
            display: 'flex',
            gap: 2,
            alignItems: 'center',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                background: '#4CAF50',
              }} />
              <Typography variant="caption" sx={{ color: '#ffffff', fontWeight: 500, fontSize: '0.7rem' }}>
                Satisfactory (≥90%)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                background: '#FFD54F',
              }} />
              <Typography variant="caption" sx={{ color: '#ffffff', fontWeight: 500, fontSize: '0.7rem' }}>
                Average (50-89%)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                background: '#F44336',
              }} />
              <Typography variant="caption" sx={{ color: '#ffffff', fontWeight: 500, fontSize: '0.7rem' }}>
                Unsatisfactory (&lt;50%)
              </Typography>
            </Box>
          </Box>
        )}
        
        {/* Title - Centered */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              mb: 0.25,
              fontSize: '1rem',
            }}
          >
            Category-wise Performance
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 500,
              mt: 0.5,
            }}
          >
            {`${processed.totalResolved.toLocaleString()} / ${processed.totalRaised.toLocaleString()} • ${processed.overallRate.toFixed(1)}%`}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        <ToggleButtonGroup size="small" value={view} exclusive onChange={(_event: React.MouseEvent<HTMLElement>, v: ViewMode | null) => v && setView(v)} sx={{
          '& .MuiToggleButton-root': {
            color: 'rgba(255, 255, 255, 0.85)',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)',
            '&.Mui-selected': {
              color: '#ffffff',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(255,255,255,0.1)',
            },
            '&:hover': {
              boxShadow: '0 3px 6px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.15)',
            }
          }
        }}>
          <ToggleButton value="donut">Donut</ToggleButton>
          <ToggleButton value="bars">Bars</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {view === 'donut' ? DonutView : BarsView}
    </Paper>
  );
};

export default CategoryBarChart;
