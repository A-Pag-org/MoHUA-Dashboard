export const DSP_COLORS = {
  SATISFACTORY: '#4CAF50', // Green - >=90%
  AVERAGE: '#FFD166',      // Amber - 50-89%
  UNSATISFACTORY: '#FF6B6B', // Red - <50%
  RAISED: '#0E1525',       // Deep night for raised/target bars
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

export const MOCK_DSP_CITIES = [
  {
    id: '1',
    cityName: 'Baharudgarh',
    complaintsRaised: 7356,
    complaintsResolved: 2169,
    resolutionPercentage: 29.0,
    issuesRaisedByCitizens: 8100,
    roadOwningAgenciesOnboarded: 8,
    status: 'Unsatisfactory' as const
  },
  {
    id: '2',
    cityName: 'Delhi',
    complaintsRaised: 70550,
    complaintsResolved: 52984,
    resolutionPercentage: 75.0,
    issuesRaisedByCitizens: 78000,
    roadOwningAgenciesOnboarded: 45,
    status: 'Average' as const
  },
  {
    id: '3',
    cityName: 'Faridabad',
    complaintsRaised: 22161,
    complaintsResolved: 17636,
    resolutionPercentage: 80.0,
    issuesRaisedByCitizens: 24500,
    roadOwningAgenciesOnboarded: 18,
    status: 'Average' as const
  },
  {
    id: '4',
    cityName: 'Ghaziabad',
    complaintsRaised: 30814,
    complaintsResolved: 26505,
    resolutionPercentage: 86.0,
    issuesRaisedByCitizens: 34000,
    roadOwningAgenciesOnboarded: 22,
    status: 'Average' as const
  },
  {
    id: '5',
    cityName: 'Greater Noida',
    complaintsRaised: 12705,
    complaintsResolved: 9575,
    resolutionPercentage: 75.0,
    issuesRaisedByCitizens: 14000,
    roadOwningAgenciesOnboarded: 12,
    status: 'Average' as const
  },
  {
    id: '6',
    cityName: 'Gurgaon',
    complaintsRaised: 26169,
    complaintsResolved: 17656,
    resolutionPercentage: 67.0,
    issuesRaisedByCitizens: 29000,
    roadOwningAgenciesOnboarded: 20,
    status: 'Average' as const
  },
  {
    id: '7',
    cityName: 'Manesar',
    complaintsRaised: 9606,
    complaintsResolved: 7454,
    resolutionPercentage: 78.0,
    issuesRaisedByCitizens: 10500,
    roadOwningAgenciesOnboarded: 10,
    status: 'Average' as const
  },
  {
    id: '8',
    cityName: 'Noida',
    complaintsRaised: 17742,
    complaintsResolved: 16500,
    resolutionPercentage: 93.0,
    issuesRaisedByCitizens: 19500,
    roadOwningAgenciesOnboarded: 16,
    status: 'Satisfactory' as const
  }
];
