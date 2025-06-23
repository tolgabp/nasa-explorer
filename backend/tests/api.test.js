const request = require('supertest');
const express = require('express');

// Mock the NASA service
jest.mock('../src/services/nasaService', () => ({
    getAPOD: jest.fn(),
    getInSightWeather: jest.fn(),
    getEONETEvents: jest.fn(),
    getEONETCategories: jest.fn(),
    getDONKICME: jest.fn(),
    getDONKISolarFlares: jest.fn(),
    getDONKIGeomagneticStorms: jest.fn(),
    getDONKINotifications: jest.fn(),
    clearCache: jest.fn(),
    getCacheStats: jest.fn()
}));

// Mock the logger
jest.mock('../src/config/logger', () => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
}));

// Mock the validation middleware
jest.mock('../src/middleware/validation', () => ({
    validateAPOD: jest.fn((req, res, next) => next()),
    validateInSightWeather: jest.fn((req, res, next) => next()),
    validateMarsPhotos: jest.fn((req, res, next) => next()),
    validateEONETEvents: jest.fn((req, res, next) => next()),
    validateDONKI: jest.fn((req, res, next) => next()),
    handleValidationErrors: jest.fn((req, res, next) => next())
}));

// Mock the rate limiter
jest.mock('../src/middleware/rateLimiter', () => ({
    nasaApiLimiter: jest.fn((req, res, next) => next()),
    healthCheckLimiter: jest.fn((req, res, next) => next())
}));

// Mock the cache
jest.mock('../src/config/cache', () => ({
    withCache: jest.fn((key, ttl) => (req, res, next) => next()),
    cacheUtils: {
        get: jest.fn(),
        set: jest.fn(),
        flush: jest.fn(),
        stats: jest.fn()
    }
}));

// Create test app
const app = express();
app.use(express.json());

// Import routes
const nasaRoutes = require('../src/routes/nasaRoutes');
app.use('/api', nasaRoutes);

describe('NASA API Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/health', () => {
        it('should return health status', async () => {
            const response = await request(app)
                .get('/api/health')
                .expect(200);

            expect(response.body).toHaveProperty('status', 'OK');
            expect(response.body).toHaveProperty('timestamp');
            expect(response.body).toHaveProperty('uptime');
        });
    });

    describe('GET /api/apod', () => {
        it('should return APOD data', async () => {
            const mockAPODData = {
                title: 'Test APOD',
                explanation: 'Test explanation',
                url: 'https://example.com/image.jpg'
            };

            const nasaService = require('../src/services/nasaService');
            nasaService.getAPOD.mockResolvedValue(mockAPODData);

            const response = await request(app)
                .get('/api/apod')
                .expect(200);

            expect(response.body).toEqual(mockAPODData);
            expect(nasaService.getAPOD).toHaveBeenCalledWith({});
        });
    });

    describe('GET /api/insight_weather', () => {
        it('should return InSight weather data', async () => {
            const mockWeatherData = {
                sol_keys: ['1', '2'],
                '1': { AT: { av: -60 } }
            };

            const nasaService = require('../src/services/nasaService');
            nasaService.getInSightWeather.mockResolvedValue(mockWeatherData);

            const response = await request(app)
                .get('/api/insight_weather')
                .expect(200);

            expect(response.body).toEqual(mockWeatherData);
        });
    });

    describe('GET /api/eonet/events', () => {
        it('should return EONET events', async () => {
            const mockEventsData = {
                events: [
                    {
                        id: 'test-event',
                        title: 'Test Event',
                        categories: [{ id: 'wildfires' }]
                    }
                ]
            };

            const nasaService = require('../src/services/nasaService');
            nasaService.getEONETEvents.mockResolvedValue(mockEventsData);

            const response = await request(app)
                .get('/api/eonet/events')
                .expect(200);

            expect(response.body).toEqual(mockEventsData);
        });
    });

    describe('POST /api/cache/clear', () => {
        it('should clear cache', async () => {
            const nasaService = require('../src/services/nasaService');
            nasaService.clearCache.mockImplementation(() => {});

            const response = await request(app)
                .post('/api/cache/clear')
                .expect(200);

            expect(response.body).toHaveProperty('message', 'Cache cleared successfully');
            expect(nasaService.clearCache).toHaveBeenCalled();
        });
    });

    describe('GET /api/cache/stats', () => {
        it('should return cache statistics', async () => {
            const mockStats = {
                keys: 5,
                hits: 100,
                misses: 20
            };

            const nasaService = require('../src/services/nasaService');
            nasaService.getCacheStats.mockReturnValue(mockStats);

            const response = await request(app)
                .get('/api/cache/stats')
                .expect(200);

            expect(response.body).toHaveProperty('cache', mockStats);
        });
    });
}); 