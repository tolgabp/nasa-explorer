const express = require('express');
const nasaService = require('../services/nasaService');
const { 
    validateAPOD, 
    validateInSightWeather, 
    validateEONETEvents, 
    validateDONKI 
} = require('../middleware/validation');
const { nasaApiLimiter, healthCheckLimiter } = require('../middleware/rateLimiter');
const { withCache } = require('../config/cache');
const logger = require('../config/logger');
const router = express.Router();

// Get Astronomy Picture of the Day
router.get('/apod', nasaApiLimiter, validateAPOD, withCache('apod', 600), async (req, res, next) => {
    try {
        logger.info('APOD request', { query: req.query });
        const data = await nasaService.getAPOD(req.query);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Get Mars InSight weather data
router.get('/insight_weather', nasaApiLimiter, validateInSightWeather, withCache('insight_weather', 300), async (req, res, next) => {
    try {
        logger.info('InSight weather request', { query: req.query });
        const data = await nasaService.getInSightWeather(req.query);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Get EONET events (Earth events)
router.get('/eonet/events', nasaApiLimiter, validateEONETEvents, withCache('eonet_events', 300), async (req, res, next) => {
    try {
        logger.info('EONET events request', { query: req.query });
        const data = await nasaService.getEONETEvents(req.query);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Get EONET categories
router.get('/eonet/categories', nasaApiLimiter, withCache('eonet_categories', 3600), async (req, res, next) => {
    try {
        logger.info('EONET categories request');
        const data = await nasaService.getEONETCategories();
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Get DONKI CME data
router.get('/donki/cme', nasaApiLimiter, validateDONKI, withCache('donki_cme', 600), async (req, res, next) => {
    try {
        logger.info('DONKI CME request', { query: req.query });
        const data = await nasaService.getDONKICME(req.query);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Get DONKI Solar Flares
router.get('/donki/solar-flares', nasaApiLimiter, validateDONKI, withCache('donki_solar_flares', 600), async (req, res, next) => {
    try {
        logger.info('DONKI Solar Flares request', { query: req.query });
        const data = await nasaService.getDONKISolarFlares(req.query);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Get DONKI Geomagnetic Storms
router.get('/donki/geomagnetic-storms', nasaApiLimiter, validateDONKI, withCache('donki_geomagnetic_storms', 600), async (req, res, next) => {
    try {
        logger.info('DONKI Geomagnetic Storms request', { query: req.query });
        const data = await nasaService.getDONKIGeomagneticStorms(req.query);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Get DONKI notifications
router.get('/donki/notifications', nasaApiLimiter, validateDONKI, withCache('donki_notifications', 300), async (req, res, next) => {
    try {
        logger.info('DONKI notifications request', { query: req.query });
        const data = await nasaService.getDONKINotifications(req.query);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

// Cache management endpoints
router.post('/cache/clear', nasaApiLimiter, async (req, res, next) => {
    try {
        logger.info('Cache clear request');
        nasaService.clearCache();
        res.json({
            message: 'Cache cleared successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
});

router.get('/cache/stats', nasaApiLimiter, async (req, res, next) => {
    try {
        logger.info('Cache stats request');
        const stats = nasaService.getCacheStats();
        res.json({
            cache: stats,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
});

// Health check endpoint
router.get('/health', healthCheckLimiter, (req, res) => {
    const healthData = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0',
        memory: process.memoryUsage(),
        cache: nasaService.getCacheStats()
    };
    
    logger.info('Health check', healthData);
    res.json(healthData);
});

module.exports = router; 