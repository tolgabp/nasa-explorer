const logger = require('../config/logger');
const { formatErrorResponse, createError } = require('../utils/errors');

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    // Log the error
    logger.error('Unhandled error', {
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString()
    });

    // Handle specific error types
    if (err.name === 'ValidationError') {
        const validationError = createError.validation('Validation Error', err.errors);
        return res.status(400).json(formatErrorResponse(validationError));
    }

    if (err.name === 'UnauthorizedError') {
        const unauthorizedError = createError.unauthorized('Unauthorized');
        return res.status(401).json(formatErrorResponse(unauthorizedError));
    }

    // Handle NASA API errors
    if (err.response && err.response.status) {
        const nasaError = createError.nasaAPI(
            `NASA API Error: ${err.message}`,
            err.response.status,
            err.response.data
        );
        return res.status(err.response.status).json(formatErrorResponse(nasaError));
    }

    // Handle axios timeout errors
    if (err.code === 'ECONNABORTED') {
        const timeoutError = createError.nasaAPI('NASA API request timeout', 408);
        return res.status(408).json(formatErrorResponse(timeoutError));
    }

    // Handle network errors
    if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
        const networkError = createError.nasaAPI('NASA API service unavailable', 503);
        return res.status(503).json(formatErrorResponse(networkError));
    }

    // Handle custom API errors
    if (err.statusCode) {
        return res.status(err.statusCode).json(formatErrorResponse(err));
    }

    // Default error response
    const internalError = createError.internal('Internal Server Error');
    res.status(500).json(formatErrorResponse(internalError));
};

module.exports = errorHandler; 