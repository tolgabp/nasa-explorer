const { body, query, validationResult } = require('express-validator');
const logger = require('../config/logger');

// Validation result handler
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.warn('Validation failed', { 
            path: req.path, 
            errors: errors.array() 
        });
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array(),
            status: 400,
            timestamp: new Date().toISOString()
        });
    }
    next();
};

// APOD validation
const validateAPOD = [
    query('count').optional().isInt({ min: 1, max: 100 }).withMessage('Count must be between 1 and 100'),
    query('date').optional().isISO8601().withMessage('Date must be in ISO 8601 format (YYYY-MM-DD)'),
    query('start_date').optional().isISO8601().withMessage('Start date must be in ISO 8601 format'),
    query('end_date').optional().isISO8601().withMessage('End date must be in ISO 8601 format'),
    query('thumbs').optional().isBoolean().withMessage('Thumbs must be true or false'),
    handleValidationErrors
];

// Mars InSight Weather validation
const validateInSightWeather = [
    query('feedtype').optional().isIn(['json', 'csv']).withMessage('Feedtype must be json or csv'),
    query('ver').optional().isIn(['1.0', '1.1']).withMessage('Version must be 1.0 or 1.1'),
    handleValidationErrors
];

// Mars Photos validation
const validateMarsPhotos = [
    query('sol').optional().isInt({ min: 0 }).withMessage('Sol must be a positive integer'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('camera').optional().isString().withMessage('Camera must be a string'),
    handleValidationErrors
];

// EONET Events validation
const validateEONETEvents = [
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('days').optional().isInt({ min: 1, max: 365 }).withMessage('Days must be between 1 and 365'),
    query('status').optional().isIn(['open', 'closed']).withMessage('Status must be open or closed'),
    query('category').optional().isString().withMessage('Category must be a string'),
    handleValidationErrors
];

// DONKI validation
const validateDONKI = [
    query('startDate').optional().isISO8601().withMessage('Start date must be in ISO 8601 format'),
    query('endDate').optional().isISO8601().withMessage('End date must be in ISO 8601 format'),
    query('type').optional().isString().withMessage('Type must be a string'),
    handleValidationErrors
];

// Date range validation helper
const validateDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 365) {
        throw new Error('Date range cannot exceed 365 days');
    }
    
    if (start > end) {
        throw new Error('Start date must be before end date');
    }
    
    return true;
};

module.exports = {
    validateAPOD,
    validateInSightWeather,
    validateMarsPhotos,
    validateEONETEvents,
    validateDONKI,
    validateDateRange,
    handleValidationErrors
}; 