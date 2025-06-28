# 🚀 NASA Explorer

A comprehensive full-stack space exploration application that provides real-time access to NASA's vast collection of space data. Explore Mars weather, Astronomy Picture of the Day, Earth events, and space weather through an intuitive, modern interface.

## 🌟 Live Demo

**Production Deployment:** [https://nasa-explorer-bb11a4ed8b3a.herokuapp.com/](https://nasa-explorer-bb11a4ed8b3a.herokuapp.com/)

## 📱 App Screenshots & Demos

### 🎯 Onboarding Experience
![Onboarding](screenshots/onboarding.gif)

### 🏠 Homepage & Navigation
![Homepage](screenshots/homePage.gif)

### 🔴 Mars Weather Analytics
![Mars Weather Analytics](screenshots/MarsWeather-Analytics.gif)

### 📊 Mars Weather Timeline & Comparison
![Mars Weather Timeline](screenshots/MarsWeather-SolTimeLine%26Comparison.gif)

### 📮 Mars Weather Postcard Generator
![Mars Weather Postcard](screenshots/MarsWeatherPostcard.gif)

### 🌍 Earth Events Tracker
![Earth Events](screenshots/EarthEvents.gif)

### 🌠 Space Weather Hub
![Space Weather Hub](screenshots/SpaceWeatherHub.gif)

### 🛰️ Astronomy Picture of the Day (APOD) Gallery
![APOD Gallery](screenshots/APOD%20Gallery.gif)

## ✨ Features

### 🌍 Mars Weather Dashboard
- **Real-time Mars weather data** from NASA's InSight Lander
- **Historical weather trends** with interactive charts
- **Comprehensive data**: Temperature, pressure, wind speed, and direction
- **Data quality indicators** showing sensor reliability
- **Mars-appropriate weather conditions** based on actual sensor data

### 🔄 Earth vs Mars Comparison
- **Side-by-side weather comparison**
- **Real-time Earth weather** via OpenWeatherMap API
- **Interactive comparison widgets**
- **Geolocation-based Earth data**

### 🛰️ Astronomy Picture of the Day (APOD)
- **Daily space images** from NASA's curated collection
- **Advanced filtering** by date range and count
- **High-resolution images** with detailed descriptions
- **Responsive gallery** with modal view

### 🌍 Earth Events Tracker
- **Natural phenomena monitoring** via NASA's EONET
- **Event categorization** and filtering
- **Real-time event updates** with status tracking
- **Interactive maps** and event statistics

### 🌠 Space Weather Monitor
- **Solar activity tracking** via NASA's DONKI system
- **Geomagnetic storm alerts**
- **Solar flare monitoring**
- **Space weather notifications**

## 🏗️ Architecture

```
├── frontend/          # React.js application
│   ├── src/
│   │   ├── Components/    # Reusable UI components
│   │   ├── Pages/         # Main application pages
│   │   ├── config/        # API configuration
│   │   └── Hooks/         # Custom React hooks
├── backend/           # Node.js/Express API
│   ├── src/
│   │   ├── routes/        # API route definitions
│   │   ├── services/      # NASA API service layer
│   │   ├── middleware/    # Express middleware
│   │   └── config/        # Configuration files
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- NASA API key ([Get one here](https://api.nasa.gov/))
- OpenWeatherMap API key ([Get one here](https://openweathermap.org/api)) (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tolgabp/lastProject.git
   cd lastProject
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

3. **Configure environment variables**

   **Backend (.env file in backend directory):**
   ```bash
   PORT=3001
   NASA_API_KEY=your_nasa_api_key_here
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   LOG_LEVEL=info
   ```

   **Frontend (.env file in frontend directory):**
   ```bash
   REACT_APP_BACKEND_URL=http://localhost:3001
   REACT_APP_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
   ```

4. **Start the application**
   ```bash
   # Start backend (in backend directory)
   npm run dev
   
   # Start frontend (in frontend directory, new terminal)
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🔧 API Endpoints

### Health & Monitoring
- `GET /api/health` - Server status and cache statistics

### Mars Weather
- `GET /api/insight_weather` - Real-time Mars weather data
- `GET /api/mars_photos` - Mars rover photos

### Astronomy Picture of the Day
- `GET /api/apod` - Daily space images with filtering

### Earth Events
- `GET /api/eonet/events` - Natural phenomena data
- `GET /api/eonet/categories` - Available event categories

### Space Weather
- `GET /api/donki/cme` - Coronal mass ejections
- `GET /api/donki/solar-flares` - Solar flare data
- `GET /api/donki/geomagnetic-storms` - Geomagnetic storm alerts

### Cache Management
- `GET /api/cache/stats` - Cache performance metrics
- `POST /api/cache/clear` - Clear cached data

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev          # Start development server
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Frontend Development
```bash
cd frontend
npm start           # Start development server
npm test            # Run tests
npm run build       # Build for production
```

## 🚀 Deployment

### Heroku Deployment
The application is configured for easy Heroku deployment:

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set NASA_API_KEY=your_nasa_api_key
   heroku config:set REACT_APP_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   heroku config:set NODE_ENV=production
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Environment Variables for Production
- `NASA_API_KEY` - Your NASA API key
- `REACT_APP_OPENWEATHERMAP_API_KEY` - Your OpenWeatherMap API key (for Earth weather comparison)
- `NODE_ENV` - Set to 'production'
- `PORT` - Heroku will set this automatically

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report
```

### Frontend Tests
```bash
cd frontend
npm test                   # Run all tests
npm test -- --coverage     # Run tests with coverage
```

## 🔒 Security Features

- **CORS protection** with configurable origins
- **Rate limiting** to prevent API abuse
- **Input validation** using express-validator
- **Security headers** via Helmet middleware
- **Request logging** for monitoring and debugging
- **Error handling** with custom error classes

## 📊 Performance Features

- **In-memory caching** with configurable TTL
- **Response compression** using Gzip
- **Optimized React build** for production
- **Code splitting** for better load times
- **Image optimization** and lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

### Frontend
- **React** ([reactjs.org](https://reactjs.org/)) — for the frontend framework.
- **React Router** ([reactrouter.com](https://reactrouter.com/)) — for client-side routing.
- **React Query** ([tanstack.com/query](https://tanstack.com/query)) — for data fetching and caching.
- **Recharts** ([recharts.org](https://recharts.org/)) — for data visualization and charts.
- **Sonner** ([sonner.emilkowal.ski](https://sonner.emilkowal.ski/)) — for toast notifications.
- **Tailwind CSS** ([tailwindcss.com](https://tailwindcss.com/)) — for rapid UI styling.
- **Lucide React** ([lucide.dev](https://lucide.dev/)) — for beautiful icons.
- **HTML2Canvas** ([html2canvas.hertzen.com](https://html2canvas.hertzen.com/)) — for DOM to canvas conversion.
- **jsPDF** ([artskydj.github.io/jsPDF/docs/](https://artskydj.github.io/jsPDF/docs/)) — for PDF generation.

### Backend
- **Express.js** ([expressjs.com](https://expressjs.com/)) — for the backend framework.
- **Express.js Best Practices** ([expressjs.com/en/advanced/best-practice-performance.html](https://expressjs.com/en/advanced/best-practice-performance.html)) — for production performance guidelines.
- **Helmet** ([helmetjs.github.io](https://helmetjs.github.io/)) — for securing HTTP headers.
- **Compression** ([npmjs.com/package/compression](https://www.npmjs.com/package/compression)) — for response compression.
- **CORS** ([npmjs.com/package/cors](https://www.npmjs.com/package/cors)) — for cross-origin resource sharing.
- **express-validator** ([express-validator.github.io](https://express-validator.github.io/)) — for input validation.
- **dotenv** ([npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)) — for environment variable management.

### Testing
- **Jest** ([jestjs.io](https://jestjs.io/)) — for testing.
- **React Testing Library** ([testing-library.com/docs/react-testing-library/intro/](https://testing-library.com/docs/react-testing-library/intro/)) — for frontend testing.
- **Supertest** ([npmjs.com/package/supertest](https://www.npmjs.com/package/supertest)) — for API testing.

### Tools & Services
- **NASA APIs** ([api.nasa.gov](https://api.nasa.gov/)) — for providing open access to space and planetary data.
- **OpenWeatherMap** ([openweathermap.org](https://openweathermap.org/)) — for Earth weather data.
- **GitHub** ([github.com](https://github.com/)) — for code hosting and collaboration.
- **Heroku** ([heroku.com](https://heroku.com/)) — for hosting and deployment.
- **Git LFS** ([git-lfs.github.com](https://git-lfs.github.com/)) — for large file storage.
- **QuickTime Player** — for recording demo GIFs.

### Resources & Community
- **MDN Web Docs** ([developer.mozilla.org](https://developer.mozilla.org/)) — for web standards and documentation.
- **Open Source Community** — for libraries, tools, and inspiration.

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/tolgabp/nasa-explorer/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

---