export const DSP_COLORS = {
  SATISFACTORY: '#4CAF50', // Green - >=90%
  AVERAGE: '#FFD54F',      // Lighter Amber - 50-89%
  UNSATISFACTORY: '#F44336', // Red - <50%
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
    name: 'Noida',
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
    cityName: 'Bahadurgarh',
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

// Mock category-wise data for each city
export const MOCK_CATEGORY_DATA: Record<string, Array<{ category: string; raised: number; resolved: number; }>> = {
  '1': [ // Bahadurgarh
    { category: 'Pothole', raised: 1200, resolved: 360 },
    { category: 'Unpaved Road', raised: 850, resolved: 220 },
    { category: 'Broken Footpath / Divider', raised: 920, resolved: 280 },
    { category: 'Malba on public land', raised: 680, resolved: 190 },
    { category: 'Garbage on public land', raised: 750, resolved: 210 },
    { category: 'Sand Pile / Mud/Silt on roadside', raised: 540, resolved: 160 },
    { category: 'C&D activity without safeguards', raised: 420, resolved: 110 },
    { category: 'Building Materials on Road', raised: 580, resolved: 170 },
    { category: 'Garbage, Plastic, Leaves Burning', raised: 490, resolved: 140 },
    { category: 'Overflowing Dustbins', raised: 380, resolved: 100 },
    { category: 'Barren land to be greened', raised: 260, resolved: 80 },
    { category: 'Central Verges to be greened', raised: 180, resolved: 50 },
    { category: 'Unsurfaced Parking Lots', raised: 106, resolved: 99 }
  ],
  '2': [ // Delhi
    { category: 'Pothole', raised: 12500, resolved: 9750 },
    { category: 'Unpaved Road', raised: 8200, resolved: 6560 },
    { category: 'Broken Footpath / Divider', raised: 9800, resolved: 7350 },
    { category: 'Malba on public land', raised: 6400, resolved: 4800 },
    { category: 'Garbage on public land', raised: 7100, resolved: 5325 },
    { category: 'Sand Pile / Mud/Silt on roadside', raised: 5300, resolved: 3975 },
    { category: 'C&D activity without safeguards', raised: 4200, resolved: 3150 },
    { category: 'Building Materials on Road', raised: 5800, resolved: 4350 },
    { category: 'Garbage, Plastic, Leaves Burning', raised: 4900, resolved: 3675 },
    { category: 'Overflowing Dustbins', raised: 3600, resolved: 2700 },
    { category: 'Barren land to be greened', raised: 1850, resolved: 1480 },
    { category: 'Central Verges to be greened', raised: 1200, resolved: 960 },
    { category: 'Unsurfaced Parking Lots', raised: 700, resolved: 560 }
  ],
  '3': [ // Faridabad
    { category: 'Pothole', raised: 3800, resolved: 3040 },
    { category: 'Unpaved Road', raised: 2600, resolved: 2080 },
    { category: 'Broken Footpath / Divider', raised: 3100, resolved: 2480 },
    { category: 'Malba on public land', raised: 2000, resolved: 1600 },
    { category: 'Garbage on public land', raised: 2250, resolved: 1800 },
    { category: 'Sand Pile / Mud/Silt on roadside', raised: 1700, resolved: 1360 },
    { category: 'C&D activity without safeguards', raised: 1350, resolved: 1080 },
    { category: 'Building Materials on Road', raised: 1850, resolved: 1480 },
    { category: 'Garbage, Plastic, Leaves Burning', raised: 1550, resolved: 1240 },
    { category: 'Overflowing Dustbins', raised: 1200, resolved: 960 },
    { category: 'Barren land to be greened', raised: 411, resolved: 329 },
    { category: 'Central Verges to be greened', raised: 250, resolved: 200 },
    { category: 'Unsurfaced Parking Lots', raised: 100, resolved: 87 }
  ],
  '4': [ // Ghaziabad
    { category: 'Pothole', raised: 5200, resolved: 4472 },
    { category: 'Unpaved Road', raised: 3600, resolved: 3096 },
    { category: 'Broken Footpath / Divider', raised: 4300, resolved: 3698 },
    { category: 'Malba on public land', raised: 2800, resolved: 2408 },
    { category: 'Garbage on public land', raised: 3100, resolved: 2666 },
    { category: 'Sand Pile / Mud/Silt on roadside', raised: 2400, resolved: 2064 },
    { category: 'C&D activity without safeguards', raised: 1900, resolved: 1634 },
    { category: 'Building Materials on Road', raised: 2600, resolved: 2236 },
    { category: 'Garbage, Plastic, Leaves Burning', raised: 2200, resolved: 1892 },
    { category: 'Overflowing Dustbins', raised: 1700, resolved: 1462 },
    { category: 'Barren land to be greened', raised: 614, resolved: 528 },
    { category: 'Central Verges to be greened', raised: 300, resolved: 258 },
    { category: 'Unsurfaced Parking Lots', raised: 100, resolved: 91 }
  ],
  '5': [ // Greater Noida
    { category: 'Pothole', raised: 2100, resolved: 1575 },
    { category: 'Unpaved Road', raised: 1500, resolved: 1125 },
    { category: 'Broken Footpath / Divider', raised: 1750, resolved: 1312 },
    { category: 'Malba on public land', raised: 1200, resolved: 900 },
    { category: 'Garbage on public land', raised: 1350, resolved: 1012 },
    { category: 'Sand Pile / Mud/Silt on roadside', raised: 1000, resolved: 750 },
    { category: 'C&D activity without safeguards', raised: 800, resolved: 600 },
    { category: 'Building Materials on Road', raised: 1100, resolved: 825 },
    { category: 'Garbage, Plastic, Leaves Burning', raised: 950, resolved: 712 },
    { category: 'Overflowing Dustbins', raised: 700, resolved: 525 },
    { category: 'Barren land to be greened', raised: 155, resolved: 116 },
    { category: 'Central Verges to be greened', raised: 80, resolved: 60 },
    { category: 'Unsurfaced Parking Lots', raised: 20, resolved: 63 }
  ],
  '6': [ // Gurgaon
    { category: 'Pothole', raised: 4500, resolved: 3015 },
    { category: 'Unpaved Road', raised: 3100, resolved: 2077 },
    { category: 'Broken Footpath / Divider', raised: 3700, resolved: 2479 },
    { category: 'Malba on public land', raised: 2400, resolved: 1608 },
    { category: 'Garbage on public land', raised: 2700, resolved: 1809 },
    { category: 'Sand Pile / Mud/Silt on roadside', raised: 2050, resolved: 1373 },
    { category: 'C&D activity without safeguards', raised: 1650, resolved: 1105 },
    { category: 'Building Materials on Road', raised: 2250, resolved: 1507 },
    { category: 'Garbage, Plastic, Leaves Burning', raised: 1900, resolved: 1273 },
    { category: 'Overflowing Dustbins', raised: 1450, resolved: 971 },
    { category: 'Barren land to be greened', raised: 269, resolved: 180 },
    { category: 'Central Verges to be greened', raised: 150, resolved: 100 },
    { category: 'Unsurfaced Parking Lots', raised: 50, resolved: 159 }
  ],
  '7': [ // Manesar
    { category: 'Pothole', raised: 1650, resolved: 1287 },
    { category: 'Unpaved Road', raised: 1150, resolved: 897 },
    { category: 'Broken Footpath / Divider', raised: 1350, resolved: 1053 },
    { category: 'Malba on public land', raised: 880, resolved: 686 },
    { category: 'Garbage on public land', raised: 990, resolved: 772 },
    { category: 'Sand Pile / Mud/Silt on roadside', raised: 750, resolved: 585 },
    { category: 'C&D activity without safeguards', raised: 600, resolved: 468 },
    { category: 'Building Materials on Road', raised: 820, resolved: 639 },
    { category: 'Garbage, Plastic, Leaves Burning', raised: 706, resolved: 550 },
    { category: 'Overflowing Dustbins', raised: 550, resolved: 429 },
    { category: 'Barren land to be greened', raised: 110, resolved: 85 },
    { category: 'Central Verges to be greened', raised: 40, resolved: 31 },
    { category: 'Unsurfaced Parking Lots', raised: 10, resolved: 72 }
  ],
  '8': [ // Noida
    { category: 'Pothole', raised: 3000, resolved: 2790 },
    { category: 'Unpaved Road', raised: 2100, resolved: 1953 },
    { category: 'Broken Footpath / Divider', raised: 2450, resolved: 2278 },
    { category: 'Malba on public land', raised: 1600, resolved: 1488 },
    { category: 'Garbage on public land', raised: 1800, resolved: 1674 },
    { category: 'Sand Pile / Mud/Silt on roadside', raised: 1400, resolved: 1302 },
    { category: 'C&D activity without safeguards', raised: 1100, resolved: 1023 },
    { category: 'Building Materials on Road', raised: 1500, resolved: 1395 },
    { category: 'Garbage, Plastic, Leaves Burning', raised: 1292, resolved: 1201 },
    { category: 'Overflowing Dustbins', raised: 1000, resolved: 930 },
    { category: 'Barren land to be greened', raised: 300, resolved: 279 },
    { category: 'Central Verges to be greened', raised: 150, resolved: 139 },
    { category: 'Unsurfaced Parking Lots', raised: 50, resolved: 48 }
  ]
};
