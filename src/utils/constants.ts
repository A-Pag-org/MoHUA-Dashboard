export const DSP_COLORS = {
  SATISFACTORY: '#4CAF50', // Green - >=90%
  AVERAGE: '#FFC107',      // Amber - 50-89%
  UNSATISFACTORY: '#F44336', // Red - <50%
  RAISED: '#000000',       // Black for raised/target bars
};

export const DSP_CATEGORIES = [
  'Pothole',
  'Unpaved Road',
  'Broken Footpath / Divider',
  'Malba on public land',
  'Garbage on public land',
  'Sand Pile / Mud/Silt on roadside',
  'C&D activity without safeguards',
  'Building Materials on Road',
  'Garbage, Plastic, Leaves Burning',
  'Overflowing Dustbins',
  'Barren land to be greened',
  'Central Verges to be greened',
  'Unsurfaced Parking Lots'
];

export const MOCK_LEADING_CITIES = [
  {
    id: '1',
    name: 'Mumbai',
    value: 95.2,
    metric: 'Resolution %',
    program: 'DSP' as const
  },
  {
    id: '2',
    name: 'Delhi',
    value: 87.5,
    metric: 'Achievement %',
    program: 'C&D' as const
  },
  {
    id: '3',
    name: 'Bangalore',
    value: 92.8,
    metric: 'Road Coverage %',
    program: 'MRS' as const
  }
];

export const MOCK_PROGRAM_STATS = [
  {
    program: 'DSP' as const,
    title: 'Complaint Status: Road repairs & Civic Infra',
    raised: 15420,
    resolved: 13878,
    percentage: 90.0,
    status: 'Satisfactory' as const
  },
  {
    program: 'C&D' as const,
    title: 'Citywise C&D Collection Status',
    raised: 8500,
    resolved: 7225,
    percentage: 85.0,
    status: 'Average' as const
  },
  {
    program: 'MRS' as const,
    title: 'Citywise MRS usage status',
    raised: 12000,
    resolved: 11040,
    percentage: 92.0,
    status: 'Satisfactory' as const
  }
];
