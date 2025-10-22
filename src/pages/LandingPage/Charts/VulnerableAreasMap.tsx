import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON as RLGeoJSON, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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

// City-based pin colors (RGBA)
const CITY_PIN_COLORS: Record<DataPoint['city'], [number, number, number, number]> = {
  Delhi: [33, 150, 243, 230], // blue
  Noida: [0, 200, 83, 230], // green
  Gurgaon: [244, 143, 177, 230], // pink
};

const circleRadiusPx = (s: Severity) => 4 + s * 3;
// removed Deck.GL-specific helpers

const CITY_OPTIONS = ['All', 'Delhi', 'Noida', 'Gurgaon'] as const;
const CATEGORY_OPTIONS = ['All', 'Pothole', 'Garbage dumped', 'Streetlight out'] as const;

// no view mode in Leaflet version

export default function VulnerableAreasMap(): JSX.Element {
  const [severityThreshold, setSeverityThreshold] = useState<Severity>(5);
  const [city, setCity] = useState<typeof CITY_OPTIONS[number]>('All');
  const [category, setCategory] = useState<typeof CATEGORY_OPTIONS[number]>('All');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Leaflet initial view (lat, lng)
  // constants kept inline at usage to avoid unused warnings
  const IS_TEST = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';

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
  
  // Style function for city boundaries (Leaflet)
  const boundaryStyle = useMemo(
    () =>
      (feature: Feature<GeoJSON.Polygon, CityProps>) => {
        const props = feature?.properties;
        return {
          color: props?.color ? rgb(props.color) : '#3c3c3c',
          weight: 2,
          fillColor: props?.fill ? rgba(props.fill) : 'rgba(200,200,200,0.12)',
          fillOpacity: props?.fill ? props.fill[3] / 255 : 0.12,
        } as any;
      },
    []
  );

  // tooltips provided via Leaflet Popups only

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

        {/* View toggle removed for Leaflet (2D only) */}

        <div style={styles.legendBlock}>
          <div style={{ marginBottom: 6 }}>
            <strong>Legend</strong> — pin colors by city
          </div>
          {(['Delhi', 'Noida', 'Gurgaon'] as const).map((c) => (
            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ ...styles.legendSwatch, backgroundColor: rgba(CITY_PIN_COLORS[c]) }} />
              <span>{c}</span>
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
          {IS_TEST ? (
            <div style={{ height: '100%', width: '100%', display: 'grid', placeItems: 'center', background: '#f6f7fb' }}>
              <span style={{ color: '#6b7280', fontSize: 12 }}>Leaflet map placeholder (tests)</span>
            </div>
          ) : (
            <MapContainer center={[28.6, 77.15]} zoom={9} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <RLGeoJSON data={filteredBoundaries as unknown as GeoJSON.GeoJsonObject} style={boundaryStyle as any} />
              {filteredPoints.map((p) => (
                <CircleMarker
                  key={p.id}
                  center={[p.coordinates[1], p.coordinates[0]]}
                  radius={circleRadiusPx(p.severity as Severity)}
                  pathOptions={{
                    color: 'rgba(0,0,0,0.35)',
                    weight: 1,
                    fillColor: rgba(CITY_PIN_COLORS[p.city]),
                    fillOpacity: 1,
                  }}
                >
                  <Popup>
                    <div>
                      <div><strong>{p.city}</strong> • {p.category}</div>
                      <div>Severity: {p.severity}</div>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          )}
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

function rgb([r, g, b]: [number, number, number]): string {
  return `rgb(${r}, ${g}, ${b})`;
}
