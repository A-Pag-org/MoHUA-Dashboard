export interface LeadingCity {
  id: string;
  name: string;
  value: number;
  metric: string;
  program: 'DSP' | 'C&D' | 'MRS';
}

export interface ProgramStats {
  program: 'DSP' | 'C&D' | 'MRS';
  title: string;
  raised: number;
  resolved: number;
  percentage: number;
  status: 'Satisfactory' | 'Average' | 'Unsatisfactory';
}

export interface DSPData {
  cities: DSPCity[];
  categories: DSPCategory[];
  officers: DSPOfficer[];
  overallStats: {
    totalComplaints: number;
    totalResolved: number;
    overallResolution: number;
  };
}

export interface DSPCity {
  id: string;
  cityName: string;
  complaintsRaised: number;
  complaintsResolved: number;
  resolutionPercentage: number;
  issuesRaisedByCitizens: number;
  roadOwningAgenciesOnboarded: number;
  status: 'Satisfactory' | 'Average' | 'Unsatisfactory';
}

export interface DSPCategory {
  id: string;
  name: string;
  complaintsRaised: number;
  complaintsResolved: number;
  resolutionPercentage: number;
  status: 'Satisfactory' | 'Average' | 'Unsatisfactory';
}

export interface DSPOfficer {
  id: string;
  officerName: string;
  pendencyPercentage: number;
  totalCases: number;
  pendingCases: number;
}

// Program Overview Data Types
export interface DSPComplaintData {
  city: string;
  raised: number;
  resolved: number;
  resolutionPercentage: number;
  status: 'Satisfactory' | 'Average' | 'Unsatisfactory';
}

export interface CDCollectionData {
  city: string;
  target: number;
  actual: number;
  achievementPercentage: number;
  status: 'Satisfactory' | 'Average' | 'Unsatisfactory';
}

export interface MRSUsageData {
  city: string;
  targetRoadLength: number;
  actualRoadLength: number;
  coveragePercentage: number;
  status: 'Satisfactory' | 'Average' | 'Unsatisfactory';
}

export interface ProgramOverviewData {
  dspData: DSPComplaintData[];
  cdData: CDCollectionData[];
  mrsData: MRSUsageData[];
}
