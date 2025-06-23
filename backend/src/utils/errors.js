const logger = require('../config/logger');

// Base API Error class
class APIError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.timestamp = new Date().toISOString();
        
        Error.captureStackTrace(this, this.constructor);
    }
}

// NASA API specific errors
class NASAAPIError extends APIError {
    constructor(message, statusCode, nasaError = null) {
        super(message, statusCode);
        this.nasaError = nasaError;
        this.type = 'NASA_API_ERROR';
        
        logger.error('NASA API Error', {
            message,
            statusCode,
            nasaError,
            timestamp: this.timestamp
        });
    }
}

// Validation Error
class ValidationError extends APIError {
    constructor(message, details = []) {
        super(message, 400);
        this.details = details;
        this.type = 'VALIDATION_ERROR';
        
        logger.warn('Validation Error', {
            message,
            details,
            timestamp: this.timestamp
        });
    }
}

// Rate Limit Error
class RateLimitError extends APIError {
    constructor(message, retryAfter = null) {
        super(message, 429);
        this.retryAfter = retryAfter;
        this.type = 'RATE_LIMIT_ERROR';
        
        logger.warn('Rate Limit Error', {
            message,
            retryAfter,
            timestamp: this.timestamp
        });
    }
}

// Cache Error
class CacheError extends APIError {
    constructor(message) {
        super(message, 500);
        this.type = 'CACHE_ERROR';
        
        logger.error('Cache Error', {
            message,
            timestamp: this.timestamp
        });
    }
}

// Error factory for creating specific error types
const createError = {
    nasaAPI: (message, statusCode, nasaError) => new NASAAPIError(message, statusCode, nasaError),
    validation: (message, details) => new ValidationError(message, details),
    rateLimit: (message, retryAfter) => new RateLimitError(message, retryAfter),
    cache: (message) => new CacheError(message),
    notFound: (message = 'Resource not found') => new APIError(message, 404),
    unauthorized: (message = 'Unauthorized') => new APIError(message, 401),
    forbidden: (message = 'Forbidden') => new APIError(message, 403),
    internal: (message = 'Internal server error') => new APIError(message, 500)
};

// Error response formatter
const formatErrorResponse = (error) => {
    const response = {
        error: error.message,
        status: error.statusCode,
        timestamp: error.timestamp,
        type: error.type || 'API_ERROR'
    };
    
    if (error.details) {
        response.details = error.details;
    }
    
    if (error.retryAfter) {
        response.retryAfter = error.retryAfter;
    }
    
    return response;
};

module.exports = {
    APIError,
    NASAAPIError,
    ValidationError,
    RateLimitError,
    CacheError,
    createError,
    formatErrorResponse
}; 