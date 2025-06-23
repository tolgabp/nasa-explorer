// API Configuration
export const API_CONFIG = {
    // Backend API endpoints - use relative URL in production for same-domain requests
    BACKEND_BASE_URL: process.env.NODE_ENV === 'production' 
        ? '' 
        : (process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'),
    
    // NASA API endpoints (via backend)
    NASA_ENDPOINTS: {
        INSIGHT_WEATHER: '/api/insight_weather',
        APOD: '/api/apod',
        MARS_PHOTOS: '/api/mars_photos',
        // EONET endpoints (Earth events)
        EONET_EVENTS: '/api/eonet/events',
        EONET_CATEGORIES: '/api/eonet/categories',
        // DONKI endpoints (Space weather)
        DONKI_CME: '/api/donki/cme',
        DONKI_SOLAR_FLARES: '/api/donki/solar-flares',
        DONKI_GEOMAGNETIC_STORMS: '/api/donki/geomagnetic-storms',
        DONKI_NOTIFICATIONS: '/api/donki/notifications'
    },
    
    // Earth weather API (OpenWeatherMap)
    EARTH_WEATHER: {
        API_KEY: process.env.REACT_APP_OPENWEATHERMAP_API_KEY || 'YOUR_OPENWEATHERMAP_API_KEY',
        BASE_URL: 'https://api.openweathermap.org/data/2.5/weather',
        UNITS: 'metric'
    }
};

// Export API_BASE_URL for backward compatibility
export const API_BASE_URL = API_CONFIG.BACKEND_BASE_URL;

// Helper function to get full backend URL
export const getBackendUrl = (endpoint) => {
    return `${API_CONFIG.BACKEND_BASE_URL}${endpoint}`;
};

// Helper function to get Earth weather URL
export const getEarthWeatherUrl = (lat, lon) => {
    return `${API_CONFIG.EARTH_WEATHER.BASE_URL}?lat=${lat}&lon=${lon}&units=${API_CONFIG.EARTH_WEATHER.UNITS}&appid=${API_CONFIG.EARTH_WEATHER.API_KEY}`;
}; 