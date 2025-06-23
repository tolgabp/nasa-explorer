# API Setup Guide

This guide will help you set up the API keys needed to use real data instead of dummy data in your NASA Explorer app.

## Required API Keys

### 1. NASA API Key (Backend)
You already have this set up in your backend! The NASA API key is used to fetch:
- Mars weather data from InSight Lander
- Astronomy Picture of the Day (APOD)
- Mars Rover photos

**Status**: ✅ Already configured in backend

### 2. OpenWeatherMap API Key (Frontend)
This is needed for the Earth vs Mars comparison feature to show real Earth weather data.

**Status**: ⚠️ Needs to be configured

## Setup Instructions

### Step 1: Get OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to "API keys" section
4. Copy your API key

### Step 2: Configure Environment Variables

Create a `.env` file in your `frontend` directory:

```bash
# Frontend .env file
REACT_APP_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
REACT_APP_BACKEND_URL=http://localhost:3001
```

### Step 3: Update API Configuration

The API configuration is already set up in `frontend/src/config/api.js`. The system will:
- Use your OpenWeatherMap API key for Earth weather data
- Fall back to mock data if the API key is not configured
- Show loading states while fetching data

## Features Now Using Real Data

### ✅ Mars Weather Data (Enhanced)
- **Source**: NASA InSight Lander API (via your backend)
- **Components**: SolTimeline, WeatherDashboard, MarsPostcard
- **Data Available**:
  - Temperature: min, max, average (°C)
  - Pressure: min, max, average (Pa)
  - Wind Speed: min, max, average (m/s)
  - Wind Direction: compass point and degrees
  - Weather conditions (derived from wind speed)
  - Sample counts for data quality
  - UTC timestamps and Martian seasons

### ✅ Earth Weather Data (with API key)
- **Source**: OpenWeatherMap API
- **Component**: ComparisonWidget
- **Data**: Real-time Earth weather for user's location
- **Fallback**: Mock data if API key not configured

### ✅ Enhanced Features
- **Smart Weather Detection**: Automatically determines weather conditions based on wind speed
- **Data Quality Indicators**: Shows sample counts for data reliability
- **Precise Wind Direction**: Uses actual degrees from NASA API
- **Comprehensive Data**: Min/max/average values for all measurements
- **Null Safety**: Graceful handling of missing sensor data

### ✅ Error Handling
- Graceful fallbacks to mock data
- Loading states for all API calls
- Error messages with retry options
- Geolocation fallback to New York if location access denied
- Proper null checking for missing sensor data

## NASA InSight API Integration

The app now properly integrates with NASA's InSight Weather API:

- **Data Structure**: Correctly maps NASA's JSON structure to component format
- **Sensor Data**: Handles AT (temperature), PRE (pressure), HWS (wind speed), WD (wind direction)
- **Missing Data**: Gracefully handles cases where sensors are offline
- **Mars-Appropriate Conditions**: Uses meaningful wind-based conditions instead of arbitrary weather labels
- **Sample Counts**: Shows data quality indicators

### Mars Weather Conditions

Instead of arbitrary Earth-like weather labels, the app now uses Mars-appropriate conditions based on actual sensor data:

- **Low Wind**: < 5 m/s wind speed
- **Moderate Wind**: 5-10 m/s wind speed  
- **High Wind**: 10-15 m/s wind speed
- **Dust Storm**: > 15 m/s wind speed
- **No Data**: When sensors are offline or data is unavailable

### Weather Descriptions

The app provides meaningful descriptions that combine actual measurements:
- Example: "22.5°C • 8.2 m/s wind • 761 Pa pressure"
- Shows real sensor data instead of subjective weather labels
- Handles missing data gracefully with "N/A" indicators

## Testing

1. **Start your backend**: `cd backend && npm start`
2. **Start your frontend**: `cd frontend && npm start`
3. **Test Mars data**: Should load real Mars weather from NASA API with enhanced data
4. **Test Earth data**: 
   - With API key: Shows real Earth weather for your location
   - Without API key: Shows mock Earth weather data

## Troubleshooting

### Mars Data Not Loading
- Check if backend is running on port 3001
- Verify NASA API key in backend `.env` file
- Check browser console for errors
- Note: Some sensors may be offline, app will show "N/A" for missing data

### Earth Data Not Loading
- Verify OpenWeatherMap API key in frontend `.env` file
- Check if geolocation is enabled in browser
- Look for fallback to mock data in console

### API Rate Limits
- NASA API: 2000 requests per IP per hour (free tier)
- OpenWeatherMap: 60 calls per minute (free tier)

## Data Quality Notes

- **Sensor Reliability**: Some InSight sensors may be offline due to hardware issues
- **Data Gaps**: The app handles missing data gracefully with "N/A" indicators
- **Sample Counts**: Higher sample counts indicate more reliable data
- **Mars-Appropriate Conditions**: Based on actual wind speed measurements, not subjective weather labels

## Next Steps

Once you have the API keys configured:
1. The app will automatically use real data from both planets
2. All components will show comprehensive Mars weather data with meaningful conditions
3. The comparison will be between real-time data from both planets
4. Enhanced data quality indicators will help users understand data reliability
5. Error handling will gracefully fall back to mock data if APIs fail