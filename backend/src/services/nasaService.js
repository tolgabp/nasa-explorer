const axios = require('axios');
const NASA_CONFIG = require('../config/nasa');
const logger = require('../config/logger');
const { createError } = require('../utils/errors');
const { cacheUtils } = require('../config/cache');

// Create axios instance with default config
const nasaApi = axios.create({
    baseURL: NASA_CONFIG.BASE_URL,
    timeout: NASA_CONFIG.TIMEOUT,
    params: {
        api_key: NASA_CONFIG.API_KEY
    }
});

// Create separate axios instance for EONET (no API key required)
const eonetApi = axios.create({
    timeout: NASA_CONFIG.TIMEOUT
});

// Add request/response interceptors for logging
nasaApi.interceptors.request.use(
    (config) => {
        logger.debug('NASA API request', {
            method: config.method,
            url: config.url,
            params: config.params
        });
        return config;
    },
    (error) => {
        logger.error('NASA API request error', { error: error.message });
        return Promise.reject(error);
    }
);

nasaApi.interceptors.response.use(
    (response) => {
        logger.debug('NASA API response', {
            status: response.status,
            url: response.config.url,
            dataSize: JSON.stringify(response.data).length
        });
        return response;
    },
    (error) => {
        logger.error('NASA API response error', {
            status: error.response?.status,
            message: error.message,
            url: error.config?.url
        });
        return Promise.reject(error);
    }
);

// Helper function to build URL with parameters
const buildUrl = (endpoint, params = {}) => {
    const url = new URL(endpoint, NASA_CONFIG.BASE_URL);
    
    // Add custom parameters
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
    });
    
    return url.toString();
};

// Helper function to build EONET URL with parameters
const buildEonetUrl = (endpoint, params = {}) => {
    const url = new URL(endpoint);
    
    // Add custom parameters
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
    });
    
    return url.toString();
};

// Helper function to get cached data or fetch from API
const getCachedOrFetch = async (cacheKey, fetchFunction, ttl = 300) => {
    try {
        // Try to get from cache first
        const cached = cacheUtils.get(cacheKey);
        if (cached) {
            logger.debug(`Cache hit for key: ${cacheKey}`);
            return cached;
        }

        logger.debug(`Cache miss for key: ${cacheKey}`);
        
        // Fetch from API
        const data = await fetchFunction();
        
        // Cache the result
        cacheUtils.set(cacheKey, data, ttl);
        
        return data;
    } catch (error) {
        logger.error(`Error in getCachedOrFetch for key: ${cacheKey}`, { error: error.message });
        throw error;
    }
};

// NASA API service methods
const nasaService = {
    // Get Astronomy Picture of the Day
    async getAPOD(params = {}) {
        const cacheKey = `apod:${JSON.stringify(params)}`;
        
        return getCachedOrFetch(cacheKey, async () => {
            try {
                // Add default parameters for APOD
                const defaultParams = { count: 1, ...params };
                const url = buildUrl(NASA_CONFIG.ENDPOINTS.APOD, defaultParams);
                const response = await nasaApi.get(url);
                return response.data;
            } catch (error) {
                throw createError.nasaAPI('Failed to fetch APOD', error.response?.status, error.response?.data);
            }
        }, 600); // Cache APOD for 10 minutes
    },

    // Get Mars InSight weather data
    async getInSightWeather(params = {}) {
        const cacheKey = `insight:${JSON.stringify(params)}`;
        
        return getCachedOrFetch(cacheKey, async () => {
            try {
                // Add default parameters for InSight weather
                const defaultParams = { feedtype: 'json', ver: '1.0', ...params };
                const url = buildUrl(NASA_CONFIG.ENDPOINTS.INSIGHT_WEATHER, defaultParams);
                const response = await nasaApi.get(url);
                return response.data;
            } catch (error) {
                throw createError.nasaAPI('Failed to fetch InSight weather', error.response?.status, error.response?.data);
            }
        }, 300); // Cache weather data for 5 minutes
    },

    // Get EONET events (Earth events)
    async getEONETEvents(params = {}) {
        const cacheKey = `eonet_events:${JSON.stringify(params)}`;
        
        return getCachedOrFetch(cacheKey, async () => {
            try {
                const defaultParams = { limit: 20, days: 30, status: 'open', ...params };
                const url = buildEonetUrl(NASA_CONFIG.ENDPOINTS.EONET_EVENTS, defaultParams);
                const response = await eonetApi.get(url);
                let data = response.data;

                // Backend-side category filtering
                if (params.category && params.category !== 'all') {
                    const categoryParam = params.category.toLowerCase();
                    data.events = data.events.filter(event =>
                        event.categories && event.categories.some(cat =>
                            cat.id?.toString().toLowerCase() === categoryParam ||
                            cat.title?.toLowerCase() === categoryParam
                        )
                    );
                }
                return data;
            } catch (error) {
                throw createError.nasaAPI('Failed to fetch EONET events', error.response?.status, error.response?.data);
            }
        }, 300); // Cache events for 5 minutes
    },

    // Get EONET categories
    async getEONETCategories() {
        const cacheKey = 'eonet_categories';
        
        return getCachedOrFetch(cacheKey, async () => {
            try {
                const url = buildEonetUrl(NASA_CONFIG.ENDPOINTS.EONET_CATEGORIES);
                const response = await eonetApi.get(url);
                return response.data;
            } catch (error) {
                throw createError.nasaAPI('Failed to fetch EONET categories', error.response?.status, error.response?.data);
            }
        }, 3600); // Cache categories for 1 hour
    },

    // Get DONKI CME (Coronal Mass Ejection) data
    async getDONKICME(params = {}) {
        const cacheKey = `donki_cme:${JSON.stringify(params)}`;
        
        return getCachedOrFetch(cacheKey, async () => {
            try {
                const defaultParams = { 
                    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    endDate: new Date().toISOString().split('T')[0],
                    ...params 
                };
                const url = buildUrl(NASA_CONFIG.ENDPOINTS.DONKI_CME, defaultParams);
                const response = await nasaApi.get(url);
                return response.data;
            } catch (error) {
                throw createError.nasaAPI('Failed to fetch DONKI CME data', error.response?.status, error.response?.data);
            }
        }, 600); // Cache CME data for 10 minutes
    },

    // Get DONKI Solar Flares
    async getDONKISolarFlares(params = {}) {
        const cacheKey = `donki_flr:${JSON.stringify(params)}`;
        
        return getCachedOrFetch(cacheKey, async () => {
            try {
                const defaultParams = { 
                    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    endDate: new Date().toISOString().split('T')[0],
                    ...params 
                };
                const url = buildUrl(NASA_CONFIG.ENDPOINTS.DONKI_FLR, defaultParams);
                const response = await nasaApi.get(url);
                return response.data;
            } catch (error) {
                throw createError.nasaAPI('Failed to fetch DONKI Solar Flares', error.response?.status, error.response?.data);
            }
        }, 600); // Cache solar flares for 10 minutes
    },

    // Get DONKI Geomagnetic Storms
    async getDONKIGeomagneticStorms(params = {}) {
        const cacheKey = `donki_gst:${JSON.stringify(params)}`;
        
        return getCachedOrFetch(cacheKey, async () => {
            try {
                const defaultParams = { 
                    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    endDate: new Date().toISOString().split('T')[0],
                    ...params 
                };
                const url = buildUrl(NASA_CONFIG.ENDPOINTS.DONKI_GST, defaultParams);
                const response = await nasaApi.get(url);
                return response.data;
            } catch (error) {
                throw createError.nasaAPI('Failed to fetch DONKI Geomagnetic Storms', error.response?.status, error.response?.data);
            }
        }, 600); // Cache geomagnetic storms for 10 minutes
    },

    // Get DONKI notifications
    async getDONKINotifications(params = {}) {
        const cacheKey = `donki_notifications:${JSON.stringify(params)}`;
        
        return getCachedOrFetch(cacheKey, async () => {
            try {
                const defaultParams = { 
                    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    endDate: new Date().toISOString().split('T')[0],
                    type: 'all',
                    ...params 
                };
                const url = buildUrl(NASA_CONFIG.ENDPOINTS.DONKI_NOTIFICATIONS, defaultParams);
                const response = await nasaApi.get(url);
                return response.data;
            } catch (error) {
                throw createError.nasaAPI('Failed to fetch DONKI notifications', error.response?.status, error.response?.data);
            }
        }, 300); // Cache notifications for 5 minutes
    },

    // Cache management methods
    clearCache: () => {
        cacheUtils.flush();
        logger.info('Cache cleared');
    },

    getCacheStats: () => {
        return cacheUtils.stats();
    }
};

module.exports = nasaService; 