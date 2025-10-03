# MoHUA Dashboard

A comprehensive dashboard for monitoring and managing urban development projects across India, featuring real-time data visualization, project tracking, and administrative capabilities.

## 🚀 Features

### Landing Page
- **Header Navigation**: MoHUA branding with DSP/C&D/MRS program buttons
- **Hero Section**: Leading cities performance tiles with key metrics
- **Program Overview**: Double bar charts showing raised vs resolved statistics
- **Quick Access**: Navigation tiles for easy program access

### DSP (Dispersed Source Programme)
- City-wise tiles with color-coded performance indicators
- Detailed city modal with comprehensive data
- Category-wise stacked bar charts
- Issue distribution pie charts
- Officer pendency tracking

## 🛠️ Technology Stack

- **Frontend**: React.js with TypeScript
- **UI Framework**: Material-UI (MUI)
- **Charts**: Recharts
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Deployment**: Vercel

## 🎨 Design System

### Color Scheme
- **Satisfactory**: Green (#4CAF50) - >=90%
- **Average**: Amber (#FFC107) - 50-89%
- **Unsatisfactory**: Red (#F44336) - <50%
- **Raised/Target**: Black (#000000)

### Typography
- **Font Family**: Roboto
- **Headings**: Bold, primary color
- **Body Text**: Regular weight, secondary color

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/A-Pag-org/MoHUA-Dashboard.git
cd MoHUA-Dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   └── Common/
│       └── Header.tsx
├── pages/
│   ├── LandingPage/
│   │   ├── LandingPage.tsx
│   │   ├── HeroSection.tsx
│   │   ├── StatsOverview.tsx
│   │   └── QuickAccess.tsx
│   └── DSP/
│       └── DSPDashboard.tsx
├── types/
│   └── index.ts
├── utils/
│   └── constants.ts
├── App.tsx
└── main.tsx
```

## 🌐 Deployment

The application is deployed on Vercel and automatically updates when changes are pushed to the main branch.

**Live URL**: [https://mohua-dashboard.vercel.app](https://mohua-dashboard.vercel.app)

## 📊 Data Structure

### Leading Cities
- City name and performance metrics
- Program-specific indicators (DSP, C&D, MRS)
- Color-coded status indicators

### Program Statistics
- Raised vs Resolved data
- Performance percentages
- Status categorization

## 🔮 Future Enhancements

- **C&D Dashboard**: Construction & Development monitoring
- **MRS Dashboard**: Monitoring & Reporting System
- **Real-time Data**: Live data integration
- **Advanced Analytics**: Predictive insights
- **Mobile App**: Progressive Web App (PWA)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please contact the development team.

---

**Ministry of Housing and Urban Affairs (MoHUA) Dashboard** - Empowering urban development through data-driven insights.
