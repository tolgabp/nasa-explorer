require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

// Import middleware
const requestLogger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");

// Import routes
const nasaRoutes = require("./routes/nasaRoutes");

// Import logger
const logger = require("./config/logger");

const app = express();
const PORT = process.env.PORT || 3001;

// Create logs directory if it doesn't exist
const fs = require('fs');
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:", "http:"],
            connectSrc: ["'self'", "https://api.openweathermap.org"],
        },
    },
}));

// Compression middleware
app.use(compression());

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP request logging (Morgan)
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined', {
        stream: {
            write: (message) => logger.info(message.trim())
        }
    }));
} else {
    app.use(morgan('dev'));
}

// Custom request logging
app.use(requestLogger);

// Rate limiting for all API routes
app.use('/api', apiLimiter);

// Routes
app.use("/api", nasaRoutes);

// MONO REPO
// // Serve static files from React build in production
// if (process.env.NODE_ENV === 'production') {
//     // Serve static files from the React build directory
//     app.use(express.static(path.join(__dirname, '../../frontend/build')));
    
//     // Handle React routing, return all requests to React app
//     app.get('*', (req, res, next) => {
//         if (req.path.startsWith('/api')) {
//             return next();
//         }
//         res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
//     });
// }

// Root endpoint
app.get('/', (req, res) => {
    // if (process.env.NODE_ENV === 'production') {
    //     res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
    // } else {
    res.json({
        message: 'NASA Explorer API',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        endpoints: {
            apod: '/api/apod',
            insight_weather: '/api/insight_weather',
            mars_photos: '/api/mars_photos',
            eonet_events: '/api/eonet/events',
            eonet_categories: '/api/eonet/categories',
            donki_cme: '/api/donki/cme',
            donki_solar_flares: '/api/donki/solar-flares',
            donki_geomagnetic_storms: '/api/donki/geomagnetic-storms',
            donki_notifications: '/api/donki/notifications',
            cache_clear: '/api/cache/clear',
            cache_stats: '/api/cache/stats',
            health: '/api/health'
        }
    });
    }
);

// 404 handler
app.use((req, res) => {
    logger.warn('404 Not Found', {
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    
    res.status(404).json({
        error: 'Endpoint not found',
        status: 404,
        timestamp: new Date().toISOString(),
        path: req.path
    });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Graceful shutdown
const gracefulShutdown = (signal) => {
    logger.info(`${signal} received, shutting down gracefully`);
    
    // Close server
    server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
    });
    
    // Force close after 10 seconds
    setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection', { reason, promise });
    process.exit(1);
});

// Start server
const server = app.listen(PORT, () => {
    logger.info(`🚀 NASA Explorer API server running on port ${PORT}`, {
        port: PORT,
        environment: process.env.NODE_ENV || 'development',
        nodeVersion: process.version,
        platform: process.platform
    });
    logger.info(`📡 Health check: http://localhost:${PORT}/api/health`);
});
