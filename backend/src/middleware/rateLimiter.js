const rateLimit = require('express-rate-limit');
const logger = require('../config/logger');

// General API rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP',
        status: 429,
        timestamp: new Date().toISOString(),
        retryAfter: '15 minutes'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res) => {
        logger.warn('Rate limit exceeded', {
            ip: req.ip,
            path: req.path,
            userAgent: req.get('User-Agent')
        });
        res.status(429).json({
            error: 'Too many requests from this IP',
            status: 429,
            timestamp: new Date().toISOString(),
            retryAfter: '15 minutes'
        });
    }
});

// Stricter rate limiter for NASA API endpoints
const nasaApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs for NASA API calls
    message: {
        error: 'Too many requests to NASA API',
        status: 429,
        timestamp: new Date().toISOString(),
        retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logger.warn('NASA API rate limit exceeded', {
            ip: req.ip,
            path: req.path,
            userAgent: req.get('User-Agent')
        });
        res.status(429).json({
            error: 'Too many requests to NASA API',
            status: 429,
            timestamp: new Date().toISOString(),
            retryAfter: '15 minutes'
        });
    }
});

// Very strict rate limiter for health checks (prevent abuse)
const healthCheckLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 health check requests per minute
    message: {
        error: 'Too many health check requests',
        status: 429,
        timestamp: new Date().toISOString(),
        retryAfter: '1 minute'
    },
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = {
    apiLimiter,
    nasaApiLimiter,
    healthCheckLimiter
}; 