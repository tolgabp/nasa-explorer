const logger = require('../config/logger');

// Request logging middleware
const requestLogger = (req, res, next) => {
    const start = Date.now();
    
    // Log request
    logger.info('Request started', {
        method: req.method,
        path: req.path,
        query: req.query,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString()
    });
    
    // Log response when finished
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logLevel = res.statusCode >= 400 ? 'warn' : 'info';
        
        logger.log(logLevel, 'Request completed', {
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            contentLength: res.get('Content-Length'),
            timestamp: new Date().toISOString()
        });
    });
    
    next();
};

module.exports = requestLogger; 