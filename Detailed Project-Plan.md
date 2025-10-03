<<<<<<< HEAD
I'll update the project plan to strictly follow the details and data provided in the images, incorporating the specific features, visualizations, and data structures outlined. Let me create a comprehensive plan based on the exact specifications shown.


[1 tool called]

Now I'll update the project plan to strictly follow the details and data provided in the images:

```markdown:Project-Plan.md
# **MoHUA Dashboard - Detailed Project Plan**

## **Project Overview**
A comprehensive dashboard for monitoring and managing urban development projects across India, featuring real-time data visualization, project tracking, and administrative capabilities. The dashboard will showcase top-performing cities for each program and provide detailed insights into DSP (Dispersed Source Programme), with future expansion for C&D and MRS programs.

## **Technology Stack**
- **Frontend**: React.js with TypeScript
- **UI Framework**: Material-UI (MUI) or Ant Design
- **Charts**: Chart.js or Recharts
- **Deployment**: Vercel (Frontend)
- **Backend**: Python (FastAPI) - if required for complex data processing
- **Database**: PostgreSQL (for production) / SQLite (for development)

## **Project Structure**

```
MoHUA-Dashboard/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage/
│   │   │   │   ├── LandingPage.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── StatsOverview.tsx
│   │   │   │   └── QuickAccess.tsx
│   │   │   ├── DSP/
│   │   │   │   ├── DSPDashboard.tsx
│   │   │   │   ├── CityTiles.tsx
│   │   │   │   ├── CityDetailsModal.tsx
│   │   │   │   ├── CategoryBarChart.tsx
│   │   │   │   ├── IssueDistributionChart.tsx
│   │   │   │   └── OfficerPendencyList.tsx
│   │   │   ├── C&D/ (Future Scope)
│   │   │   └── MRS/ (Future Scope)
│   │   ├── components/
│   │   │   ├── Common/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Navigation.tsx
│   │   │   │   └── DateFilter.tsx
│   │   │   └── Charts/
│   │   │       ├── DoubleBarChart.tsx
│   │   │       ├── StackedBarChart.tsx
│   │   │       └── PieChart.tsx
│   │   ├── hooks/
│   │   │   ├── useDSPData.ts
│   │   │   └── useCityData.ts
│   │   ├── services/
│   │   │   ├── dspService.ts
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   ├── dsp.ts
│   │   │   └── city.ts
│   │   └── utils/
│   │       └── constants.ts
│   ├── public/
│   └── package.json
└── README.md
```

## **Page-wise Development Plan**

---

## **1. LANDING PAGE (Week 1-2)**

### **1.1 Header Section**
**File**: `src/components/Common/Header.tsx`
- **Features**:
  - "MoHUA" text on the left side
  - Three clickable buttons: "DSP", "C&D", "MRS"
  - Selected button turns green, others remain grey
  - Buttons have 3D effect
- **Color Code**: Green for all leading cities

### **1.2 Hero Section - Leaderboard**
**File**: `src/pages/LandingPage/HeroSection.tsx`
- **Purpose**: Display top-performing cities for each program
- **Features**:
  - **DSP Leading City**: Based on "resolution %" - displayed as a Tile
  - **C&D Leading City**: Based on "% achievement of target" - displayed as a Tile  
  - **MRS Leading City**: Based on "average road length covered vs target" - displayed as a Tile
- **Visualization**: Three tiles showing leading cities with their respective metrics

### **1.3 Content Section - Program Overview**
**File**: `src/pages/LandingPage/StatsOverview.tsx`
- **DSP Section**: "Complaint Status: Road repairs & Civic Infra"
  - **Visualization**: Double Bar Graph (Raised Vs Resolved)
  - **Color Scheme**:
    - Bar for "raised" complaints: Black
    - Legend for "resolved" complaints:
      - **Satisfactory**: Green (#4CAF50) for >=90% resolution
      - **Average**: Amber (#FFC107) for 50-89% resolution
      - **Unsatisfactory**: Red (#F44336) for <50% resolution
  - **Data Source**: DSP - refer sheet Overall

- **C&D Section**: "Citywise C&D Collection Status"
  - **Visualization**: Double Bar Graph (Target Vs Actuals)
  - **Color Scheme**:
    - Bar for "Target": Black
    - Legend for "actuals":
      - **Satisfactory**: Green (#4CAF50) for >=90% achievement
      - **Average**: Amber (#FFC107) for 50-89% achievement
      - **Unsatisfactory**: Red (#F44336) for <50% achievement

- **MRS Section**: "Citywise MRS usage status"
  - **Visualization**: Double Bar Graph (Target Road length Vs Actual Road Length covered)
  - **Color Scheme**:
    - Bar for "Target": Black
    - Legend for "Actuals":
      - **Satisfactory**: Green (#4CAF50) for >=90% coverage
      - **Average**: Amber (#FFC107) for 50-89% coverage
      - **Unsatisfactory**: Red (#F44336) for <50% coverage

---

## **2. DSP - DISPERSED SOURCE PROGRAMME (Week 3-4)**

### **2.1 DSP Dashboard Header**
**File**: `src/pages/DSP/DSPDashboard.tsx`
- **Features**:
  - "MoHUA" text on the left side
  - "Dispersed Source Programme (DSP)" in the middle
  - Two interactive buttons: "1. City Wise" and "2. Performance"

### **2.2 City-wise Overview - Main Content**
**File**: `src/pages/DSP/CityTiles.tsx`
- **Response**: Tile details for each city
- **Features**: Each city tile displays:
  - City name
  - Complaints Raised
  - Complaints Resolved
  - % Resolution
  - "More info" option on click
- **Visualization**: Tiles with dynamic color scheme based on resolution %:
  - **Satisfactory (Green - #4CAF50)**: Resolution >= 90%
  - **Average (Amber - #FFC107)**: Resolution 50-89%
  - **Unsatisfactory (Red - #F44336)**: Resolution < 50%
- **Remarks**: Tiles representing all cities shown in content section

### **2.3 City Details Modal (Window Screen)**
**File**: `src/pages/DSP/CityDetailsModal.tsx`
- **Action**: Click on city tile
- **Response**: Window with city details opens
- **Features**: Displays:
  - Total Complaints raised
  - Total Complaints resolved
  - % Resolution
  - Number of issues raised by citizens
  - Road owning agencies onboarded

#### **2.3.1 Category-wise Stacked Horizontal Bar Graph**
**File**: `src/pages/DSP/CategoryBarChart.tsx`
- **Visualization**: Stacked horizontal bar graph showing raised and resolved issues
- **Categories** (Y-axis):
  1. Pothole
  2. Unpaved Road
  3. Broken Footpath / Divider
  4. Malba on public land
  5. Garbage on public land
  6. Sand Pile / Mud/Silt on roadside
  7. C&D activity without safeguards
  8. Building Materials on Road
  9. Garbage, Plastic, Leaves Burning
  10. Overflowing Dustbins
  11. Barren land to be greened
  12. Central Verges to be greened
  13. Unsurfaced Parking Lots
- **Color Scheme**:
  - **Satisfactory (Green - #4CAF50)**: >= 90%
  - **Average (Amber - #FFC107)**: 50-89%
  - **Unsatisfactory (Red - #F44336)**: < 50%

#### **2.3.2 Issue Distribution Pie Chart**
**File**: `src/pages/DSP/IssueDistributionChart.tsx`
- **Response**: Issue distribution (percentage of each issue in total)
- **Visualization**: Pie chart with categories on x-axis
- **Color Scheme**: Same as above (Green/Amber/Red based on resolution %)

#### **2.3.3 Officer-wise Pendency Details**
**File**: `src/pages/DSP/OfficerPendencyList.tsx`
- **Response**: Show 10 officers with highest pendency
- **Visualization**: List (Officer vs Pendency %)
- **Remarks**: "No data available as of now" (placeholder for future implementation)

### **2.4 Date-wise Filtering Options**
**File**: `src/components/Common/DateFilter.tsx`
- **Features**:
  - Option to view in date-wise format by giving start and end date as input
  - Weekly, monthly, quarterly, yearly trends
  - Buttons for "View" and "Download"
- **Implementation**: Available for all charts and data views

---

## **3. C&D - CONSTRUCTION & DEVELOPMENT (Future Scope)**
**File**: `src/pages/C&D/` (Directory structure ready)
- **Status**: Reserved for future development
- **Integration**: Will follow similar structure as DSP
- **Features**: To be defined based on C&D specific requirements

---

## **4. MRS - MONITORING & REPORTING SYSTEM (Future Scope)**
**File**: `src/pages/MRS/` (Directory structure ready)
- **Status**: Reserved for future development
- **Integration**: Will follow similar structure as DSP
- **Features**: To be defined based on MRS specific requirements

---

## **Data Structures**

### **DSP Data Types**
```typescript
interface DSPCity {
  id: string;
  cityName: string;
  complaintsRaised: number;
  complaintsResolved: number;
  resolutionPercentage: number;
  issuesRaisedByCitizens: number;
  roadOwningAgenciesOnboarded: number;
  status: 'Satisfactory' | 'Average' | 'Unsatisfactory';
}

interface DSPCategory {
  id: string;
  name: string;
  complaintsRaised: number;
  complaintsResolved: number;
  resolutionPercentage: number;
  status: 'Satisfactory' | 'Average' | 'Unsatisfactory';
}

interface DSPOfficer {
  id: string;
  officerName: string;
  pendencyPercentage: number;
  totalCases: number;
  pendingCases: number;
}

interface DSPData {
  cities: DSPCity[];
  categories: DSPCategory[];
  officers: DSPOfficer[];
  overallStats: {
    totalComplaints: number;
    totalResolved: number;
    overallResolution: number;
  };
}
```

### **Color Constants**
```typescript
export const DSP_COLORS = {
  SATISFACTORY: '#4CAF50', // Green - >=90%
  AVERAGE: '#FFC107',      // Amber - 50-89%
  UNSATISFACTORY: '#F44336', // Red - <50%
  RAISED: '#000000',       // Black for raised/target bars
};
```

---

## **API Endpoints (if backend needed)**

```
GET /api/dsp/cities - Get all DSP cities data
GET /api/dsp/cities/:id - Get specific city details
GET /api/dsp/categories - Get category-wise data
GET /api/dsp/officers - Get officer pendency data
GET /api/dsp/stats - Get overall DSP statistics
GET /api/dsp/filter - Get filtered data by date range
POST /api/dsp/export - Export data in various formats
```

---

## **Development Timeline**

- **Week 1-2**: Landing Page (Header, Hero Section, Program Overview)
- **Week 3-4**: DSP Dashboard (City Tiles, Details Modal, Charts)
- **Week 5-6**: Date Filtering, Export Features, Testing
- **Week 7-8**: Deployment, Optimization, Future Scope Setup

---

## **Key Features Summary**

### **Landing Page**
- ✅ Header with DSP/C&D/MRS navigation
- ✅ Hero section with leading cities
- ✅ Program overview with double bar charts
- ✅ Color-coded performance indicators

### **DSP Dashboard**
- ✅ City-wise tiles with color coding
- ✅ Detailed city modal with comprehensive data
- ✅ Category-wise stacked bar charts
- ✅ Issue distribution pie charts
- ✅ Officer pendency tracking
- ✅ Date-wise filtering and export options

### **Future Expansion**
- ✅ C&D and MRS program structure ready
- ✅ Modular design for easy integration
- ✅ Consistent UI/UX patterns established

---

*This plan strictly follows the specifications provided in the images, ensuring accurate implementation of the MoHUA Dashboard with DSP focus and future expansion capabilities for C&D and MRS programs.*
```

I've updated the project plan to strictly follow the details and data provided in the images. The plan now includes:

**Key Features from the Images:**
- ✅ Exact header structure with MoHUA branding and DSP/C&D/MRS buttons
- ✅ Hero section with leading cities based on specific metrics
- ✅ Double bar charts with exact color schemes (Green/Amber/Red)
- ✅ DSP city tiles with color coding based on resolution percentage
- ✅ Detailed city modal with category-wise stacked bar charts
- ✅ Issue distribution pie charts
- ✅ Officer pendency tracking
- ✅ Date-wise filtering options
- ✅ Exact category list (13 categories) for DSP issues

**Technical Implementation:**
- ✅ React.js frontend with TypeScript
- ✅ Vercel deployment
- ✅ Python backend (if needed)
- ✅ Modular structure for future C&D and MRS expansion

=======
I'll update the project plan to strictly follow the details and data provided in the images, incorporating the specific features, visualizations, and data structures outlined. Let me create a comprehensive plan based on the exact specifications shown.


[1 tool called]

Now I'll update the project plan to strictly follow the details and data provided in the images:

```markdown:Project-Plan.md
# **MoHUA Dashboard - Detailed Project Plan**

## **Project Overview**
A comprehensive dashboard for monitoring and managing urban development projects across India, featuring real-time data visualization, project tracking, and administrative capabilities. The dashboard will showcase top-performing cities for each program and provide detailed insights into DSP (Dispersed Source Programme), with future expansion for C&D and MRS programs.

## **Technology Stack**
- **Frontend**: React.js with TypeScript
- **UI Framework**: Material-UI (MUI) or Ant Design
- **Charts**: Chart.js or Recharts
- **Deployment**: Vercel (Frontend)
- **Backend**: Python (FastAPI) - if required for complex data processing
- **Database**: PostgreSQL (for production) / SQLite (for development)

## **Project Structure**

```
MoHUA-Dashboard/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage/
│   │   │   │   ├── LandingPage.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── StatsOverview.tsx
│   │   │   │   └── QuickAccess.tsx
│   │   │   ├── DSP/
│   │   │   │   ├── DSPDashboard.tsx
│   │   │   │   ├── CityTiles.tsx
│   │   │   │   ├── CityDetailsModal.tsx
│   │   │   │   ├── CategoryBarChart.tsx
│   │   │   │   ├── IssueDistributionChart.tsx
│   │   │   │   └── OfficerPendencyList.tsx
│   │   │   ├── C&D/ (Future Scope)
│   │   │   └── MRS/ (Future Scope)
│   │   ├── components/
│   │   │   ├── Common/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Navigation.tsx
│   │   │   │   └── DateFilter.tsx
│   │   │   └── Charts/
│   │   │       ├── DoubleBarChart.tsx
│   │   │       ├── StackedBarChart.tsx
│   │   │       └── PieChart.tsx
│   │   ├── hooks/
│   │   │   ├── useDSPData.ts
│   │   │   └── useCityData.ts
│   │   ├── services/
│   │   │   ├── dspService.ts
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   ├── dsp.ts
│   │   │   └── city.ts
│   │   └── utils/
│   │       └── constants.ts
│   ├── public/
│   └── package.json
└── README.md
```

## **Page-wise Development Plan**

---

## **1. LANDING PAGE (Week 1-2)**

### **1.1 Header Section**
**File**: `src/components/Common/Header.tsx`
- **Features**:
  - "MoHUA" text on the left side
  - Three clickable buttons: "DSP", "C&D", "MRS"
  - Selected button turns green, others remain grey
  - Buttons have 3D effect
- **Color Code**: Green for all leading cities

### **1.2 Hero Section - Leaderboard**
**File**: `src/pages/LandingPage/HeroSection.tsx`
- **Purpose**: Display top-performing cities for each program
- **Features**:
  - **DSP Leading City**: Based on "resolution %" - displayed as a Tile
  - **C&D Leading City**: Based on "% achievement of target" - displayed as a Tile  
  - **MRS Leading City**: Based on "average road length covered vs target" - displayed as a Tile
- **Visualization**: Three tiles showing leading cities with their respective metrics

### **1.3 Content Section - Program Overview**
**File**: `src/pages/LandingPage/StatsOverview.tsx`
- **DSP Section**: "Complaint Status: Road repairs & Civic Infra"
  - **Visualization**: Double Bar Graph (Raised Vs Resolved)
  - **Color Scheme**:
    - Bar for "raised" complaints: Black
    - Legend for "resolved" complaints:
      - **Satisfactory**: Green (#4CAF50) for >=90% resolution
      - **Average**: Amber (#FFC107) for 50-89% resolution
      - **Unsatisfactory**: Red (#F44336) for <50% resolution
  - **Data Source**: DSP - refer sheet Overall

- **C&D Section**: "Citywise C&D Collection Status"
  - **Visualization**: Double Bar Graph (Target Vs Actuals)
  - **Color Scheme**:
    - Bar for "Target": Black
    - Legend for "actuals":
      - **Satisfactory**: Green (#4CAF50) for >=90% achievement
      - **Average**: Amber (#FFC107) for 50-89% achievement
      - **Unsatisfactory**: Red (#F44336) for <50% achievement

- **MRS Section**: "Citywise MRS usage status"
  - **Visualization**: Double Bar Graph (Target Road length Vs Actual Road Length covered)
  - **Color Scheme**:
    - Bar for "Target": Black
    - Legend for "Actuals":
      - **Satisfactory**: Green (#4CAF50) for >=90% coverage
      - **Average**: Amber (#FFC107) for 50-89% coverage
      - **Unsatisfactory**: Red (#F44336) for <50% coverage

---

## **2. DSP - DISPERSED SOURCE PROGRAMME (Week 3-4)**

### **2.1 DSP Dashboard Header**
**File**: `src/pages/DSP/DSPDashboard.tsx`
- **Features**:
  - "MoHUA" text on the left side
  - "Dispersed Source Programme (DSP)" in the middle
  - Two interactive buttons: "1. City Wise" and "2. Performance"

### **2.2 City-wise Overview - Main Content**
**File**: `src/pages/DSP/CityTiles.tsx`
- **Response**: Tile details for each city
- **Features**: Each city tile displays:
  - City name
  - Complaints Raised
  - Complaints Resolved
  - % Resolution
  - "More info" option on click
- **Visualization**: Tiles with dynamic color scheme based on resolution %:
  - **Satisfactory (Green - #4CAF50)**: Resolution >= 90%
  - **Average (Amber - #FFC107)**: Resolution 50-89%
  - **Unsatisfactory (Red - #F44336)**: Resolution < 50%
- **Remarks**: Tiles representing all cities shown in content section

### **2.3 City Details Modal (Window Screen)**
**File**: `src/pages/DSP/CityDetailsModal.tsx`
- **Action**: Click on city tile
- **Response**: Window with city details opens
- **Features**: Displays:
  - Total Complaints raised
  - Total Complaints resolved
  - % Resolution
  - Number of issues raised by citizens
  - Road owning agencies onboarded

#### **2.3.1 Category-wise Stacked Horizontal Bar Graph**
**File**: `src/pages/DSP/CategoryBarChart.tsx`
- **Visualization**: Stacked horizontal bar graph showing raised and resolved issues
- **Categories** (Y-axis):
  1. Pothole
  2. Unpaved Road
  3. Broken Footpath / Divider
  4. Malba on public land
  5. Garbage on public land
  6. Sand Pile / Mud/Silt on roadside
  7. C&D activity without safeguards
  8. Building Materials on Road
  9. Garbage, Plastic, Leaves Burning
  10. Overflowing Dustbins
  11. Barren land to be greened
  12. Central Verges to be greened
  13. Unsurfaced Parking Lots
- **Color Scheme**:
  - **Satisfactory (Green - #4CAF50)**: >= 90%
  - **Average (Amber - #FFC107)**: 50-89%
  - **Unsatisfactory (Red - #F44336)**: < 50%

#### **2.3.2 Issue Distribution Pie Chart**
**File**: `src/pages/DSP/IssueDistributionChart.tsx`
- **Response**: Issue distribution (percentage of each issue in total)
- **Visualization**: Pie chart with categories on x-axis
- **Color Scheme**: Same as above (Green/Amber/Red based on resolution %)

#### **2.3.3 Officer-wise Pendency Details**
**File**: `src/pages/DSP/OfficerPendencyList.tsx`
- **Response**: Show 10 officers with highest pendency
- **Visualization**: List (Officer vs Pendency %)
- **Remarks**: "No data available as of now" (placeholder for future implementation)

### **2.4 Date-wise Filtering Options**
**File**: `src/components/Common/DateFilter.tsx`
- **Features**:
  - Option to view in date-wise format by giving start and end date as input
  - Weekly, monthly, quarterly, yearly trends
  - Buttons for "View" and "Download"
- **Implementation**: Available for all charts and data views

---

## **3. C&D - CONSTRUCTION & DEVELOPMENT (Future Scope)**
**File**: `src/pages/C&D/` (Directory structure ready)
- **Status**: Reserved for future development
- **Integration**: Will follow similar structure as DSP
- **Features**: To be defined based on C&D specific requirements

---

## **4. MRS - MONITORING & REPORTING SYSTEM (Future Scope)**
**File**: `src/pages/MRS/` (Directory structure ready)
- **Status**: Reserved for future development
- **Integration**: Will follow similar structure as DSP
- **Features**: To be defined based on MRS specific requirements

---

## **Data Structures**

### **DSP Data Types**
```typescript
interface DSPCity {
  id: string;
  cityName: string;
  complaintsRaised: number;
  complaintsResolved: number;
  resolutionPercentage: number;
  issuesRaisedByCitizens: number;
  roadOwningAgenciesOnboarded: number;
  status: 'Satisfactory' | 'Average' | 'Unsatisfactory';
}

interface DSPCategory {
  id: string;
  name: string;
  complaintsRaised: number;
  complaintsResolved: number;
  resolutionPercentage: number;
  status: 'Satisfactory' | 'Average' | 'Unsatisfactory';
}

interface DSPOfficer {
  id: string;
  officerName: string;
  pendencyPercentage: number;
  totalCases: number;
  pendingCases: number;
}

interface DSPData {
  cities: DSPCity[];
  categories: DSPCategory[];
  officers: DSPOfficer[];
  overallStats: {
    totalComplaints: number;
    totalResolved: number;
    overallResolution: number;
  };
}
```

### **Color Constants**
```typescript
export const DSP_COLORS = {
  SATISFACTORY: '#4CAF50', // Green - >=90%
  AVERAGE: '#FFC107',      // Amber - 50-89%
  UNSATISFACTORY: '#F44336', // Red - <50%
  RAISED: '#000000',       // Black for raised/target bars
};
```

---

## **API Endpoints (if backend needed)**

```
GET /api/dsp/cities - Get all DSP cities data
GET /api/dsp/cities/:id - Get specific city details
GET /api/dsp/categories - Get category-wise data
GET /api/dsp/officers - Get officer pendency data
GET /api/dsp/stats - Get overall DSP statistics
GET /api/dsp/filter - Get filtered data by date range
POST /api/dsp/export - Export data in various formats
```

---

## **Development Timeline**

- **Week 1-2**: Landing Page (Header, Hero Section, Program Overview)
- **Week 3-4**: DSP Dashboard (City Tiles, Details Modal, Charts)
- **Week 5-6**: Date Filtering, Export Features, Testing
- **Week 7-8**: Deployment, Optimization, Future Scope Setup

---

## **Key Features Summary**

### **Landing Page**
- ✅ Header with DSP/C&D/MRS navigation
- ✅ Hero section with leading cities
- ✅ Program overview with double bar charts
- ✅ Color-coded performance indicators

### **DSP Dashboard**
- ✅ City-wise tiles with color coding
- ✅ Detailed city modal with comprehensive data
- ✅ Category-wise stacked bar charts
- ✅ Issue distribution pie charts
- ✅ Officer pendency tracking
- ✅ Date-wise filtering and export options

### **Future Expansion**
- ✅ C&D and MRS program structure ready
- ✅ Modular design for easy integration
- ✅ Consistent UI/UX patterns established

---

*This plan strictly follows the specifications provided in the images, ensuring accurate implementation of the MoHUA Dashboard with DSP focus and future expansion capabilities for C&D and MRS programs.*
```

I've updated the project plan to strictly follow the details and data provided in the images. The plan now includes:

**Key Features from the Images:**
- ✅ Exact header structure with MoHUA branding and DSP/C&D/MRS buttons
- ✅ Hero section with leading cities based on specific metrics
- ✅ Double bar charts with exact color schemes (Green/Amber/Red)
- ✅ DSP city tiles with color coding based on resolution percentage
- ✅ Detailed city modal with category-wise stacked bar charts
- ✅ Issue distribution pie charts
- ✅ Officer pendency tracking
- ✅ Date-wise filtering options
- ✅ Exact category list (13 categories) for DSP issues

**Technical Implementation:**
- ✅ React.js frontend with TypeScript
- ✅ Vercel deployment
- ✅ Python backend (if needed)
- ✅ Modular structure for future C&D and MRS expansion

>>>>>>> 8279627c3a04b1e7daa397b6afe3d19b3ed85e4c
The plan now accurately reflects the specifications shown in the images and provides a clear roadmap for development.