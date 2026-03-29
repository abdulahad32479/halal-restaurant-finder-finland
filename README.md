# Verdant Halal — Halal Restaurant Finder Finland

A high-fidelity, production-ready web application built to discover Halal restaurants across Finland on an interactive map. This project was developed as part of the **Neuralflex Frontend Trainee Task**.

## 🌟 Key Features

- **Interactive Map**: Centered on Finland using `react-leaflet` with custom "premium" markers (white-on-green aesthetic).
- **Real-Time Data**: Fetches and parses CSV data directly from a public Google Sheet using a custom `useRestaurants` hook and a zero-dependency `sheetParser`.
- **High-Fidelity UI**: Implements a modern sage/pine-green design system with Lucide icons (`react-icons/lu`).
- **Dynamic Search & Filter**: Instant filtering by restaurant name, city, and cuisine type.
- **Full Responsiveness**: 100% responsive design with a specialized mobile navigation and layout toggles.
- **Bonus Capabilities**:
  - 📍 **"Near Me" Geolocation**: Centering and highlighting the user's current position.
  - 🛡️ **Verification Badges**: "VERIFIED HALAL" status indicators for premium listings.
  - 🍱 **Rich Detail View**: Comprehensive restaurant information including hours, contact, and directions.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Map**: [React Leaflet 4](https://react-leaflet.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Vanilla CSS Tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Railway](https://railway.app/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Visit `http://localhost:5173/` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

## 📂 Project Structure
```
src/
├── components/     # Specialized UI components (Map, Cards, Filters)
├── hooks/          # Custom hooks for data fetching and filtering
├── utils/          # Logic for CSV parsing and map markers
├── types/          # TypeScript interface definitions
├── constants/      # App configuration and fallback data
└── App.tsx         # Root application component
```

## 🏆 Submission Details
- **Developer**: [Your Name/abdulahad32479]
- **Task**: Neuralflex Frontend Trainee Task
- **Goal**: Replicate high-fidelity design with real-time Google Sheet integration.

---
*Built with precision and modern web standards.*
