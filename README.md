# NASA Explorer v2

A comprehensive space exploration application featuring Mars weather data, Astronomy Picture of the Day (APOD), Earth events, and space weather information.

## Features

- **Mars Weather Dashboard**: Real-time weather data from NASA's InSight lander
- **APOD Gallery**: Browse and search NASA's Astronomy Picture of the Day
- **Earth Events**: Natural events tracked by NASA's EONET
- **Space Weather**: Solar flares, CMEs, and geomagnetic storms
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Caching & Rate Limiting**: Optimized API performance and security

## Tech Stack

### Backend
- Node.js/Express
- NASA API integration
- Caching with node-cache
- Rate limiting
- Comprehensive logging with Winston
- Security middleware (Helmet, CORS)

### Frontend
- React 19
- Tailwind CSS
- React Query for data fetching
- React Router for navigation
- Responsive design

## Deployment to Heroku

### Prerequisites
1. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
2. [Git](https://git-scm.com/) installed
3. NASA API key from [https://api.nasa.gov/](https://api.nasa.gov/)

### Step-by-Step Deployment

1. **Login to Heroku**
   ```bash
   heroku login
   ```

2. **Create a new Heroku app**
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables**
   ```bash
   heroku config:set NASA_API_KEY=your_nasa_api_key_here
   heroku config:set NODE_ENV=production
   ```

4. **Deploy to Heroku**
   ```bash
   git add .
   git commit -m "Prepare for Heroku deployment"
   git push heroku main
   ```

5. **Open your app**
   ```bash
   heroku open
   ```

### Environment Variables

The following environment variables can be configured in Heroku:

- `NASA_API_KEY` (required): Your NASA API key
- `NODE_ENV`: Set to "production" for production deployment
- `FRONTEND_URL`: Frontend URL for CORS (auto-set by Heroku)
- `LOG_LEVEL`: Logging level (default: "info")
- `RATE_LIMIT_WINDOW_MS`: Rate limiting window (default: 900000ms)
- `RATE_LIMIT_MAX_REQUESTS`: Max requests per window (default: 100)
- `CACHE_TTL`: Cache time-to-live (default: 300 seconds)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nasa-explorer-v2
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # In backend directory
   cp env.example .env
   # Edit .env with your NASA API key
   ```

4. **Start development servers**
   ```bash
   # Start backend (from backend directory)
   npm run dev
   
   # Start frontend (from frontend directory, in new terminal)
   npm start
   ```

## API Endpoints

- `GET /api/apod` - Astronomy Picture of the Day
- `GET /api/insight_weather` - Mars weather data
- `GET /api/mars_photos` - Mars rover photos
- `GET /api/eonet/events` - Earth natural events
- `GET /api/eonet/categories` - Event categories
- `GET /api/donki/cme` - Coronal Mass Ejections
- `GET /api/donki/solar-flares` - Solar flares
- `GET /api/donki/geomagnetic-storms` - Geomagnetic storms
- `GET /api/health` - Health check

## Project Structure

```
nasa-explorer-v2/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── tests/              # Backend tests
├── frontend/               # React application
│   ├── src/
│   │   ├── Components/     # React components
│   │   ├── Pages/          # Page components
│   │   ├── config/         # Frontend configuration
│   │   └── Hooks/          # Custom React hooks
│   └── public/             # Static assets
├── Procfile               # Heroku deployment configuration
├── app.json              # Heroku app configuration
└── package.json          # Root package.json for deployment
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the GitHub repository or contact the development team. 