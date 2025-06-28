const NodeCache = require('node-cache');
const logger = require('./logger');

// Create cache instance with default TTL of 5 minutes
const cache = new NodeCache({ 
    stdTTL: 300, // 5 minutes
    checkperiod: 600, // Check for expired keys every 10 minutes
    useClones: false, // Better performance
});

// Cache event listeners
cache.on('expired', (key, value) => {
    logger.debug(`Cache key expired: ${key}`);
});

cache.on('flush', () => {
    logger.info('Cache flushed');
});

// Cache middleware
const withCache = (key, ttl = 300) => {
    return (req, res, next) => {
        const cacheKey = `${key}:${JSON.stringify(req.query)}`;
        const cached = cache.get(cacheKey);
        
        if (cached) {
            logger.debug(`Cache hit for key: ${cacheKey}`);
            return res.json(cached);
        }
        
        logger.debug(`Cache miss for key: ${cacheKey}`);
        
        // Store original send method
        const originalJson = res.json;
        res.json = function(data) {
            cache.set(cacheKey, data, ttl);
            return originalJson.call(this, data);
        };
        
        next();
    };
};

// Cache utility functions
const cacheUtils = {
    get: (key) => cache.get(key),
    set: (key, value, ttl) => cache.set(key, value, ttl),
    del: (key) => cache.del(key),
    flush: () => cache.flushAll(),
    stats: () => cache.getStats(),
};

module.exports = { cache, withCache, cacheUtils }; 