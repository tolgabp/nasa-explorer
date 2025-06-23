# NASA Explorer Backend API

A **production-ready** Node.js/Express backend API that serves as a proxy for NASA APIs, providing Mars weather data, Astronomy Picture of the Day, Earth events, space weather, and Mars rover photos with enterprise-grade features.

## 🚀 Features

### Core Functionality
- 🌍 **Mars Weather Data**: Real-time weather data from NASA's InSight Lander
- 🛰️ **Astronomy Picture of the Day**: Daily space images from NASA
- 📸 **Mars Rover Photos**: Images from Curiosity rover
- 🌍 **Earth Events**: Natural phenomena tracking via EONET
- 🌌 **Space Weather**: Solar activity and geomagnetic storms via DONKI

### Production-Ready Features
- 🔒 **Security**: CORS, Helmet, request limits, and security headers
- 📊 **Comprehensive Logging**: Winston-based structured logging with file rotation
- 🏥 **Health Checks**: Detailed API health monitoring with cache stats
- ⚡ **Error Handling**: Centralized error handling with custom error classes
- 🚦 **Rate Limiting**: Multi-tier rate limiting (general, NASA API, health checks)
- ✅ **Input Validation**: Express-validator with custom validation schemas
- 💾 **Caching**: In-memory caching with configurable TTL for all endpoints
- 📦 **Response Compression**: Gzip compression for better performance
- 🧪 **Testing**: Jest and Supertest for comprehensive API testing
- 🔄 **Graceful Shutdown**: Proper process management and cleanup

## 📋 Prerequisites

- Node.js >= 14.0.0
- NASA API key (get one at [https://api.nasa.gov/](https://api.nasa.gov/))

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```bash
   # .env
   PORT=3001
   NASA_API_KEY=your_nasa_api_key_here
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   LOG_LEVEL=info
   ```

## 🚀 Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

The server will start on `http://localhost:3001`

## 📚 API Endpoints

### Health & Monitoring
```
GET /api/health
```
Returns detailed server status, uptime, memory usage, and cache statistics.

### Astronomy Picture of the Day
```
GET /api/apod
```
Returns NASA's Astronomy Picture of the Day.

**Query Parameters:**
- `count` (optional): Number of images to return (1-100, default: 1)
- `date` (optional): Specific date (YYYY-MM-DD format)
- `start_date` (optional): Start date for range (YYYY-MM-DD format)
- `end_date` (optional): End date for range (YYYY-MM-DD format)
- `thumbs` (optional): Include thumbnail images (true/false)

### Mars InSight Weather
```
GET /api/insight_weather
```
Returns real-time weather data from Mars InSight Lander.

**Query Parameters:**
- `feedtype` (optional): Data format (json/csv, default: json)
- `ver` (optional): API version (1.0/1.1, default: 1.0)

### Mars Rover Photos
```
GET /api/mars_photos
```
Returns photos from Mars Curiosity rover.

**Query Parameters:**
- `sol` (optional): Martian sol (positive integer, default: 1000)
- `page` (optional): Page number (positive integer, default: 2)
- `camera` (optional): Camera filter (string)

### Earth Events (EONET)
```
GET /api/eonet/events
```
Returns Earth events and natural phenomena.

**Query Parameters:**
- `limit` (optional): Number of events (1-100, default: 20)
- `days` (optional): Days to look back (1-365, default: 30)
- `status` (optional): Event status (open/closed, default: open)
- `category` (optional): Event category (string)

```
GET /api/eonet/categories
```
Returns available EONET event categories.

### Space Weather (DONKI)
```
GET /api/donki/cme
GET /api/donki/solar-flares
GET /api/donki/geomagnetic-storms
GET /api/donki/notifications
```
Returns space weather data from NASA's DONKI system.

**Query Parameters:**
- `startDate` (optional): Start date (YYYY-MM-DD format)
- `endDate` (optional): End date (YYYY-MM-DD format)
- `type` (optional): Event type (string)

### Cache Management
```
GET /api/cache/stats
```
Returns cache statistics and performance metrics.

```
POST /api/cache/clear
```
Clears all cached data.

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── nasa.js          # NASA API configuration
│   │   ├── logger.js        # Winston logger configuration
│   │   └── cache.js         # Cache configuration and utilities
│   ├── middleware/
│   │   ├── errorHandler.js  # Centralized error handling
│   │   ├── logger.js        # Request logging middleware
│   │   ├── validation.js    # Input validation schemas
│   │   └── rateLimiter.js   # Rate limiting configuration
│   ├── routes/
│   │   └── nasaRoutes.js    # API route definitions
│   ├── services/
│   │   └── nasaService.js   # NASA API service layer
│   ├── utils/
│   │   └── errors.js        # Custom error classes
│   └── index.js             # Main application file
├── tests/
│   └── api.test.js          # API endpoint tests
├── logs/                    # Log files (auto-created)
├── .env                     # Environment variables (not in git)
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `NASA_API_KEY` | NASA API key | Required |
| `NODE_ENV` | Environment (development/production) | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |
| `LOG_LEVEL` | Logging level (error/warn/info/debug) | info |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | General rate limit | 100 |
| `NASA_RATE_LIMIT_MAX_REQUESTS` | NASA API rate limit | 50 |
| `CACHE_TTL` | Default cache TTL (seconds) | 300 (5 min) |

### Rate Limiting

The API implements three tiers of rate limiting:

1. **General API**: 100 requests per 15 minutes per IP
2. **NASA API Endpoints**: 50 requests per 15 minutes per IP
3. **Health Checks**: 10 requests per minute per IP

### Caching

All endpoints implement intelligent caching:

- **APOD**: 10 minutes
- **Mars Weather**: 5 minutes
- **Mars Photos**: 30 minutes
- **Earth Events**: 5 minutes
- **EONET Categories**: 1 hour
- **Space Weather**: 10 minutes
- **Notifications**: 5 minutes

## 🧪 Testing

The API includes comprehensive tests:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

Test coverage includes:
- ✅ API endpoint functionality
- ✅ Input validation
- ✅ Error handling
- ✅ Cache operations
- ✅ Rate limiting

## 📊 Logging

The API uses Winston for structured logging:

- **File Logging**: Rotated log files in `logs/` directory
- **Console Logging**: In development mode
- **Structured Format**: JSON format for production
- **Log Levels**: error, warn, info, debug

### Log Files
- `logs/error.log`: Error-level logs only
- `logs/combined.log`: All logs

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Configurable cross-origin requests
- **Rate Limiting**: Protection against abuse
- **Input Validation**: Parameter sanitization
- **Error Sanitization**: No sensitive information exposure
- **Request Size Limits**: 10MB limit on request bodies

## 🚨 Error Handling

The API provides consistent error responses:

```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "type": "VALIDATION_ERROR",
  "details": [
    {
      "field": "count",
      "message": "Count must be between 1 and 100"
    }
  ]
}
```

## 📈 Performance

- **Response Compression**: Gzip compression for all responses
- **Intelligent Caching**: Reduces NASA API calls
- **Connection Pooling**: Optimized HTTP connections
- **Memory Management**: Proper cleanup and garbage collection

## 🔄 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure `NASA_API_KEY`
- [ ] Set `FRONTEND_URL` for CORS
- [ ] Configure log rotation
- [ ] Set up monitoring and alerting
- [ ] Configure reverse proxy (nginx/Apache)
- [ ] Set up SSL/TLS certificates
- [ ] Configure process manager (PM2)

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling and logging
3. Include tests for new features
4. Update this README for new endpoints
5. Follow the validation and rate limiting patterns

## 📄 License

ISC

## 🆘 Support

For issues and questions:
1. Check the logs in `logs/` directory
2. Verify your NASA API key is valid
3. Check rate limiting headers in responses
4. Review the health endpoint for system status 