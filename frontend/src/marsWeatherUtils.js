/**
 * Mars Weather Utility Functions
 * Provides helpers for interpreting and displaying Mars weather data.
 * All data is expected to come from the NASA InSight API.
 */

/**
 * Returns a weather icon based on Mars wind condition.
 * @param {string} condition - The Mars wind condition (e.g., 'low wind', 'dust storm').
 * @returns {string} Emoji icon.
 */
export function getWeatherIcon(condition) {
    if (!condition) return '🌍';
    switch (condition.toLowerCase()) {
        case 'low wind': return '🌍';
        case 'moderate wind': return '💨';
        case 'high wind': return '🌪️';
        case 'dust storm': return '🌪️';
        default: return '🌍';
    }
}

/**
 * Returns the wind direction angle in degrees for a given compass point.
 * @param {string} direction - Compass direction (e.g., 'N', 'SW').
 * @returns {number} Angle in degrees (0-360).
 */
export function getWindAngle(direction) {
    const angles = {
        'N': 0, 'NNE': 22.5, 'NE': 45, 'ENE': 67.5,
        'E': 90, 'ESE': 112.5, 'SE': 135, 'SSE': 157.5,
        'S': 180, 'SSW': 202.5, 'SW': 225, 'WSW': 247.5,
        'W': 270, 'WNW': 292.5, 'NW': 315, 'NNW': 337.5
    };
    return angles[direction] || 0;
}

/**
 * Determines a Mars-appropriate wind condition label based on wind speed.
 * @param {number|null|undefined} windSpeed - Average wind speed (m/s).
 * @returns {string} Condition label.
 */
export function getMarsCondition(windSpeed) {
    if (windSpeed == null || isNaN(windSpeed)) return 'No Data';
    if (windSpeed < 5) return 'Low Wind';
    if (windSpeed < 10) return 'Moderate Wind';
    if (windSpeed < 15) return 'High Wind';
    return 'Dust Storm';
}

/**
 * Returns a human-readable Mars weather description string.
 * @param {number|null|undefined} windSpeed - Wind speed (m/s).
 * @param {number|null|undefined} pressure - Atmospheric pressure (Pa).
 * @param {number|null|undefined} temperature - Average temperature (°C).
 * @returns {string} Description string.
 */
export function getMarsWeatherDescription(windSpeed, pressure, temperature) {
    if (windSpeed == null && pressure == null && temperature == null) return 'No sensor data available';
    const parts = [];
    if (typeof temperature === 'number') {
        parts.push(`${temperature.toFixed(1)}°C`);
    }
    if (typeof windSpeed === 'number') {
        parts.push(`${windSpeed.toFixed(1)} m/s wind`);
    }
    if (typeof pressure === 'number') {
        parts.push(`${pressure.toFixed(0)} Pa pressure`);
    }
    return parts.join(' • ') || 'Sensor data available';
} 