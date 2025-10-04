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

export const MOCK_DSP_CITIES = [
  {
    id: '1',
    cityName: 'Mumbai',
    complaintsRaised: 2840,
    complaintsResolved: 2698,
    resolutionPercentage: 95.0,
    issuesRaisedByCitizens: 3120,
    roadOwningAgenciesOnboarded: 18,
    status: 'Satisfactory' as const
  },
  {
    id: '2',
    cityName: 'Delhi',
    complaintsRaised: 3250,
    complaintsResolved: 2763,
    resolutionPercentage: 85.0,
    issuesRaisedByCitizens: 3680,
    roadOwningAgenciesOnboarded: 22,
    status: 'Average' as const
  },
  {
    id: '3',
    cityName: 'Bangalore',
    complaintsRaised: 2150,
    complaintsResolved: 2021,
    resolutionPercentage: 94.0,
    issuesRaisedByCitizens: 2420,
    roadOwningAgenciesOnboarded: 16,
    status: 'Satisfactory' as const
  },
  {
    id: '4',
    cityName: 'Chennai',
    complaintsRaised: 1890,
    complaintsResolved: 1512,
    resolutionPercentage: 80.0,
    issuesRaisedByCitizens: 2100,
    roadOwningAgenciesOnboarded: 14,
    status: 'Average' as const
  },
  {
    id: '5',
    cityName: 'Hyderabad',
    complaintsRaised: 1650,
    complaintsResolved: 1518,
    resolutionPercentage: 92.0,
    issuesRaisedByCitizens: 1820,
    roadOwningAgenciesOnboarded: 13,
    status: 'Satisfactory' as const
  },
  {
    id: '6',
    cityName: 'Kolkata',
    complaintsRaised: 2020,
    complaintsResolved: 1414,
    resolutionPercentage: 70.0,
    issuesRaisedByCitizens: 2300,
    roadOwningAgenciesOnboarded: 15,
    status: 'Average' as const
  },
  {
    id: '7',
    cityName: 'Pune',
    complaintsRaised: 1430,
    complaintsResolved: 1315,
    resolutionPercentage: 91.9,
    issuesRaisedByCitizens: 1580,
    roadOwningAgenciesOnboarded: 12,
    status: 'Satisfactory' as const
  },
  {
    id: '8',
    cityName: 'Ahmedabad',
    complaintsRaised: 1280,
    complaintsResolved: 1165,
    resolutionPercentage: 91.0,
    issuesRaisedByCitizens: 1420,
    roadOwningAgenciesOnboarded: 11,
    status: 'Satisfactory' as const
  },
  {
    id: '9',
    cityName: 'Jaipur',
    complaintsRaised: 950,
    complaintsResolved: 665,
    resolutionPercentage: 70.0,
    issuesRaisedByCitizens: 1120,
    roadOwningAgenciesOnboarded: 9,
    status: 'Average' as const
  },
  {
    id: '10',
    cityName: 'Indore',
    complaintsRaised: 780,
    complaintsResolved: 327,
    resolutionPercentage: 42.0,
    issuesRaisedByCitizens: 920,
    roadOwningAgenciesOnboarded: 8,
    status: 'Unsatisfactory' as const
  },
  {
    id: '11',
    cityName: 'Lucknow',
    complaintsRaised: 850,
    complaintsResolved: 365,
    resolutionPercentage: 43.0,
    issuesRaisedByCitizens: 980,
    roadOwningAgenciesOnboarded: 7,
    status: 'Unsatisfactory' as const
  },
  {
    id: '12',
    cityName: 'Bhopal',
    complaintsRaised: 620,
    complaintsResolved: 248,
    resolutionPercentage: 40.0,
    issuesRaisedByCitizens: 750,
    roadOwningAgenciesOnboarded: 6,
    status: 'Unsatisfactory' as const
  }
];
