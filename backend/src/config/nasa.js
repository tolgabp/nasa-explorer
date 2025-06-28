// NASA API configuration
const NASA_CONFIG = {
    BASE_URL: 'https://api.nasa.gov',
    API_KEY: process.env.NASA_API_KEY,
    ENDPOINTS: {
        APOD: '/planetary/apod',
        INSIGHT_WEATHER: '/insight_weather/',
        // EONET endpoints (Earth events)
        EONET_EVENTS: 'https://eonet.gsfc.nasa.gov/api/v2.1/events',
        EONET_CATEGORIES: 'https://eonet.gsfc.nasa.gov/api/v2.1/categories',
        // DONKI endpoints (Space weather)
        DONKI_CME: '/DONKI/CME',
        DONKI_FLR: '/DONKI/FLR',
        DONKI_GST: '/DONKI/GST',
        DONKI_NOTIFICATIONS: '/DONKI/notifications'
    },
    TIMEOUT: 10000 // 10 seconds
};

// Validate API key
if (!NASA_CONFIG.API_KEY) {
    console.error('NASA_API_KEY is not set in environment variables');
    process.exit(1);
}

module.exports = NASA_CONFIG; 