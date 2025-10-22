import React, { useEffect, useMemo, useState } from 'react';
import DeckGL from '@deck.gl/react';
import { ColumnLayer, GeoJsonLayer, ScatterplotLayer } from '@deck.gl/layers';
import Map from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import type { Feature, FeatureCollection } from 'geojson';

// Types
type Severity = 1 | 2 | 3 | 4 | 5;

type DataPoint = {
  id: string;
  city: 'Delhi' | 'Noida' | 'Gurgaon';
  category: 'Pothole' | 'Garbage dumped' | 'Streetlight out';
  severity: Severity;
  coordinates: [number, number]; // [lng, lat]
};

type CityProps = {
  name: DataPoint['city'];
  color: [number, number, number]; // RGB for stroke
  fill: [number, number, number, number]; // RGBA for fill
};

type CityGeo = FeatureCollection<GeoJSON.Polygon, CityProps>;

// Mock city boundaries (coarse rectangles for demo only)
const CITY_BOUNDARIES: CityGeo = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Delhi', color: [33, 150, 243], fill: [33, 150, 243, 40] },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.01, 28.37],
          [77.34, 28.37],
          [77.34, 28.89],
          [77.01, 28.89],
          [77.01, 28.37]
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Noida', color: [0, 200, 83], fill: [0, 200, 83, 40] },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.30, 28.50],
          [77.50, 28.50],
          [77.50, 28.70],
          [77.30, 28.70],
          [77.30, 28.50]
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Gurgaon', color: [244, 143, 177], fill: [244, 143, 177, 40] },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [76.90, 28.35],
          [77.12, 28.35],
          [77.12, 28.52],
          [76.90, 28.52],
          [76.90, 28.35]
        ]],
      },
    },
  ],
};

// Mock incident points
const MOCK_POINTS: DataPoint[] = [
  { id: 'd1', city: 'Delhi', category: 'Pothole', severity: 5, coordinates: [77.21, 28.67] },
  { id: 'd2', city: 'Delhi', category: 'Garbage dumped', severity: 4, coordinates: [77.12, 28.63] },
  { id: 'd3', city: 'Delhi', category: 'Streetlight out', severity: 3, coordinates: [77.28, 28.55] },
  { id: 'd4', city: 'Delhi', category: 'Pothole', severity: 5, coordinates: [77.16, 28.70] },
  { id: 'n1', city: 'Noida', category: 'Garbage dumped', severity: 5, coordinates: [77.37, 28.60] },
  { id: 'n2', city: 'Noida', category: 'Pothole', severity: 2, coordinates: [77.45, 28.65] },
  { id: 'n3', city: 'Noida', category: 'Streetlight out', severity: 4, coordinates: [77.40, 28.58] },
  { id: 'g1', city: 'Gurgaon', category: 'Pothole', severity: 5, coordinates: [77.03, 28.47] },
  { id: 'g2', city: 'Gurgaon', category: 'Garbage dumped', severity: 3, coordinates: [77.08, 28.50] },
  { id: 'g3', city: 'Gurgaon', category: 'Streetlight out', severity: 4, coordinates: [76.98, 28.42] },
];

// Severity styling helpers
const SEVERITY_COLORS: Record<Severity, [number, number, number, number]> = {
  1: [255, 241, 118, 180],
  2: [255, 213, 79, 200],
  3: [255, 179, 0, 210],
  4: [255, 87, 34, 220],
  5: [198, 40, 40, 240],
};

const circleRadiusPx = (s: Severity) => 4 + s * 3;
const columnElevation = (s: Severity) => s * 500; // meters
const columnRadiusMeters = 150; // meters

const CITY_OPTIONS = ['All', 'Delhi', 'Noida', 'Gurgaon'] as const;
const CATEGORY_OPTIONS = ['All', 'Pothole', 'Garbage dumped', 'Streetlight out'] as const;

type ViewMode = '2d' | '3d';

export default function VulnerableAreasMap(): JSX.Element {
  const [viewMode, setViewMode] = useState<ViewMode>('2d');
  const [severityThreshold, setSeverityThreshold] = useState<Severity>(5);
  const [city, setCity] = useState<typeof CITY_OPTIONS[number]>('All');
  const [category, setCategory] = useState<typeof CATEGORY_OPTIONS[number]>('All');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const [viewState, setViewState] = useState({
    longitude: 77.15,
    latitude: 28.60,
    zoom: 9,
    pitch: 0,
    bearing: 0,
  });

  useEffect(() => {
    setViewState((v) => ({ ...v, pitch: viewMode === '3d' ? 45 : 0 }));
  }, [viewMode]);

  const filteredPoints = useMemo(() => {
    return MOCK_POINTS.filter(
      (p) =>
        p.severity >= severityThreshold &&
        (city === 'All' || p.city === city) &&
        (category === 'All' || p.category === category)
    );
  }, [severityThreshold, city, category]);

  const filteredBoundaries: CityGeo = useMemo(() => {
    if (city === 'All') return CITY_BOUNDARIES;
    const features = CITY_BOUNDARIES.features.filter(
      (f) => f.properties?.name === city
    ) as Feature<GeoJSON.Polygon, CityProps>[];
    return { type: 'FeatureCollection', features };
  }, [city]);

  const layers = useMemo(() => {
    const boundaryLayer = new GeoJsonLayer<CityProps>({
      id: 'city-boundaries',
      data: filteredBoundaries,
      stroked: true,
      filled: true,
      getLineColor: (f) => f.properties?.color ?? [60, 60, 60],
      getFillColor: (f) => f.properties?.fill ?? [200, 200, 200, 30],
      lineWidthMinPixels: 2,
      pickable: true,
      autoHighlight: true,
    });

    const scatterLayer = new ScatterplotLayer<DataPoint>({
      id: 'severity-scatter',
      data: filteredPoints,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => circleRadiusPx(d.severity as Severity),
      radiusUnits: 'pixels',
      getFillColor: (d) => SEVERITY_COLORS[d.severity as Severity],
      getLineColor: [0, 0, 0, 120],
      lineWidthMinPixels: 0.5,
      pickable: true,
    });

    const columnLayer = new ColumnLayer<DataPoint>({
      id: 'severity-columns',
      data: filteredPoints,
      diskResolution: 12,
      radius: columnRadiusMeters,
      extruded: true,
      elevationScale: 1,
      getPosition: (d) => d.coordinates,
      getFillColor: (d) => SEVERITY_COLORS[d.severity as Severity],
      getElevation: (d) => columnElevation(d.severity as Severity),
      pickable: true,
    });

    return viewMode === '2d' ? [boundaryLayer, scatterLayer] : [boundaryLayer, columnLayer];
  }, [filteredBoundaries, filteredPoints, viewMode]);

  const tooltip = (info: any): string | null => {
    const { object } = info ?? {};
    if (!object) return null;
    if ('severity' in object && 'city' in object) {
      return `${object.city} • ${object.category}\nSeverity: ${object.severity}`;
    }
    if (object.properties?.name) {
      return `City boundary: ${object.properties.name}`;
    }
    return null;
  };

  return (
    <div style={styles.container}>
      <aside style={{ ...styles.sidebar, ...(sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed) }}>
        <div style={styles.sidebarHeader}>
          <strong>Filters & Legend</strong>
          <button style={styles.closeBtn} onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            ×
          </button>
        </div>

        <div style={styles.controlGroup}>
          <label htmlFor="city">City</label>
          <select id="city" value={city} onChange={(e) => setCity(e.target.value as typeof CITY_OPTIONS[number])}>
            {CITY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.controlGroup}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof CATEGORY_OPTIONS[number])}
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.controlGroup}>
          <label htmlFor="severity">Severity threshold: {severityThreshold}+</label>
          <input
            id="severity"
            type="range"
            min={1}
            max={5}
            step={1}
            value={severityThreshold}
            onChange={(e) => setSeverityThreshold(parseInt(e.target.value, 10) as Severity)}
          />
        </div>

        <div style={styles.controlGroup}>
          <label>View</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setViewMode('2d')}
              style={{ ...styles.toggleBtn, ...(viewMode === '2d' ? styles.toggleBtnActive : {}) }}
            >
              2D
            </button>
            <button
              onClick={() => setViewMode('3d')}
              style={{ ...styles.toggleBtn, ...(viewMode === '3d' ? styles.toggleBtnActive : {}) }}
            >
              3D
            </button>
          </div>
        </div>

        <div style={styles.legendBlock}>
          <div style={{ marginBottom: 6 }}>
            <strong>Legend</strong> (hidden on map)
          </div>
          {[5, 4, 3, 2, 1].map((s) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ ...styles.legendSwatch, backgroundColor: rgba(SEVERITY_COLORS[s as Severity]) }} />
              <span>Severity {s}</span>
            </div>
          ))}
        </div>

        <button onClick={() => window.print()} style={styles.exportBtn}>
          Export Map View
        </button>
      </aside>

      <div style={styles.mapWrap}>
        <button style={styles.openSidebarBtn} onClick={() => setSidebarOpen(true)} aria-label="Open filters and legend">
          Filters
        </button>
        <div style={styles.mapInner}>
          <DeckGL
            layers={layers}
            viewState={viewState}
            onViewStateChange={(e: any) => setViewState(e.viewState)}
            controller
            getTooltip={tooltip}
          >
            <Map
              mapLib={maplibregl}
              reuseMaps
              mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            />
          </DeckGL>
        </div>
      </div>
    </div>
  );
}

// Inline styles to keep the component self-contained and portable
const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'relative',
    width: '100%',
    height: 320, // fits typical tile height while preserving width
    minHeight: 280,
    display: 'flex',
    gap: 8,
  },
  sidebar: {
    width: 260,
    maxWidth: '85%',
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    padding: 12,
    boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
    transform: 'translateX(-110%)',
    transition: 'transform 0.25s ease',
    overflowY: 'auto',
  },
  sidebarOpen: {
    transform: 'translateX(0)'
  },
  sidebarClosed: {},
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeBtn: {
    border: 'none',
    background: 'transparent',
    fontSize: 20,
    cursor: 'pointer',
    lineHeight: 1,
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginBottom: 12,
  },
  legendBlock: {
    borderTop: '1px solid #eee',
    paddingTop: 10,
    marginTop: 10,
    marginBottom: 12,
  },
  legendSwatch: {
    display: 'inline-block',
    width: 18,
    height: 12,
    borderRadius: 3,
    border: '1px solid rgba(0,0,0,0.1)',
  },
  exportBtn: {
    width: '100%',
    background: '#111827',
    color: '#fff',
    padding: '8px 10px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
  },
  mapWrap: {
    position: 'relative',
    flex: 1,
    minWidth: 0,
  },
  mapInner: {
    position: 'absolute',
    inset: 0,
    borderRadius: 8,
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
  },
  openSidebarBtn: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 3,
    background: '#111827',
    color: '#fff',
    padding: '6px 10px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
  toggleBtn: {
    padding: '6px 10px',
    borderRadius: 8,
    border: '1px solid #d1d5db',
    background: '#fff',
    cursor: 'pointer',
  },
  toggleBtnActive: {
    background: '#111827',
    color: '#fff',
    borderColor: '#111827',
  },
};

function rgba([r, g, b, a]: [number, number, number, number]): string {
  return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
}
