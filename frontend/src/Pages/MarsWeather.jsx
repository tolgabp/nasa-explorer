import { useState, useEffect } from 'react';
import { WeatherDashboard } from '../Components/Mars/WeatherDashboard';
import { SolTimeline } from '../Components/Mars/SolTimeline';
import { MarsPostcard } from '../Components/Mars/MarsPostcard';
import { ComparisonWidget } from '../Components/Mars/ComparisonWidget';
import { MarsWeatherCharts } from '../Components/Mars/MarsWeatherCharts';
import { useQuery } from '@tanstack/react-query';
import { toast } from '../Hooks/use-toast';
import { getBackendUrl, API_CONFIG } from '../config/api';
import { getMarsCondition, getMarsWeatherDescription } from '../marsWeatherUtils';

const MarsWeather = () => {
    const [selectedSol, setSelectedSol] = useState(null);
    const [showPostcard, setShowPostcard] = useState(false);

    // Fetch real Mars weather data from NASA's InSight API via backend
    const { data: marsWeatherData, isLoading, error } = useQuery({
        queryKey: ['marsWeather'],
        queryFn: async () => {
            const response = await fetch(getBackendUrl(API_CONFIG.NASA_ENDPOINTS.INSIGHT_WEATHER));
            if (!response.ok) {
                throw new Error('Failed to fetch Mars weather data');
            }
            const data = await response.json();
            
            // Transform NASA API data to match our component expectations
            if (data.sol_keys && data.sol_keys.length > 0) {
                const transformedData = data.sol_keys.map(solKey => {
                    const solData = data[solKey];
                    
                    // Helper function to safely get sensor data
                    const getSensorData = (sensorKey, field) => {
                        return solData[sensorKey] && solData[sensorKey][field] !== undefined 
                            ? solData[sensorKey][field] 
                            : null;
                    };
                    
                    // Get wind direction data
                    const windDirection = solData.WD?.most_common?.compass_point || 'Unknown';
                    const windDegrees = solData.WD?.most_common?.compass_degrees || 0;
                    
                    // Get sensor data
                    const windSpeed = getSensorData('HWS', 'av');
                    const pressure = getSensorData('PRE', 'av');
                    const avgTemp = getSensorData('AT', 'av');
                    
                    // Determine Mars-appropriate condition based on actual data
                    const condition = getMarsCondition(windSpeed, pressure);
                    
                    return {
                        sol: parseInt(solKey),
                        earthDate: solData.First_UTC ? new Date(solData.First_UTC).toLocaleDateString() : 'Unknown',
                        season: solData.Season || 'Unknown',
                        minTemp: getSensorData('AT', 'mn'),
                        maxTemp: getSensorData('AT', 'mx'),
                        avgTemp: avgTemp,
                        pressure: pressure,
                        minPressure: getSensorData('PRE', 'mn'),
                        maxPressure: getSensorData('PRE', 'mx'),
                        windSpeed: windSpeed,
                        minWindSpeed: getSensorData('HWS', 'mn'),
                        maxWindSpeed: getSensorData('HWS', 'mx'),
                        windDirection: windDirection,
                        windDegrees: windDegrees,
                        condition: condition,
                        weatherDescription: getMarsWeatherDescription(windSpeed, pressure, avgTemp),
                        // Additional metadata
                        firstUTC: solData.First_UTC,
                        lastUTC: solData.Last_UTC,
                        sampleCount: {
                            temperature: getSensorData('AT', 'ct'),
                            pressure: getSensorData('PRE', 'ct'),
                            windSpeed: getSensorData('HWS', 'ct'),
                            windDirection: solData.WD?.most_common?.ct || 0
                        }
                    };
                });
                
                // Sort by sol number (most recent first)
                return transformedData.sort((a, b) => b.sol - a.sol);
            }
            
            throw new Error('No Mars weather data available');
        },
        retry: 3,
        retryDelay: 1000,
    });

    // Set the first sol as selected when data loads
    useEffect(() => {
        if (marsWeatherData && marsWeatherData.length > 0 && !selectedSol) {
            setSelectedSol(marsWeatherData[0]);
        }
    }, [marsWeatherData, selectedSol]);

    useEffect(() => {
        if (marsWeatherData) {
            toast({
                title: "Mission Control Online",
                description: "Connected to Mars InSight Lander. Welcome, Mission Scientist!",
            });
        }
    }, [marsWeatherData]);

    // Show error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-950 to-black flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">🚫</div>
                    <h2 className="text-xl text-white font-medium">Connection Failed</h2>
                    <p className="text-gray-400">Unable to connect to Mars InSight Lander</p>
                    <p className="text-red-400 text-sm">{error.message}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                    >
                        Retry Connection
                    </button>
                </div>
            </div>
        );
    }

    if (isLoading || !marsWeatherData || !selectedSol) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-950 to-black flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <h2 className="text-xl text-white font-medium">Establishing Connection to Mars...</h2>
                    <p className="text-gray-400">Receiving telemetry from InSight Lander</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-950 to-black text-white">
            {/* Header */}
            <header className="border-b border-red-900/50 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="w-full px-4 py-4 max-w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center font-bold text-xl">
                                M
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                                    Mars Weather Mission Control
                                </h1>
                                <p className="text-gray-400 text-sm">InSight Lander • Sol {selectedSol.sol}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="flex items-center space-x-2 text-green-400">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm">LIVE</span>
                            </div>
                            <button
                                onClick={() => setShowPostcard(true)}
                                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 min-w-[120px]"
                            >
                                Create Postcard
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="w-full px-2 py-6 sm:px-4 sm:py-8 space-y-8 max-w-full">
                {/* Sol Timeline */}
                <section>
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
                        <span>🌍</span>
                        <span>Mars Sol Timeline</span>
                    </h2>
                    <SolTimeline
                        weatherData={marsWeatherData}
                        selectedSol={selectedSol}
                        onSolSelect={setSelectedSol}
                    />
                </section>

                {/* Weather Dashboard */}
                <section>
                    <WeatherDashboard weatherData={selectedSol} />
                </section>

                {/* Weather Charts */}
                <section>
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
                        <span>📊</span>
                        <span>Weather Analytics</span>
                    </h2>
                    <MarsWeatherCharts weatherData={marsWeatherData} />
                </section>

                {/* Earth Comparison */}
                <section>
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
                        <span>🌍</span>
                        <span>Earth vs Mars Comparison</span>
                    </h2>
                    <ComparisonWidget marsData={selectedSol} />
                </section>
            </main>

            {/* Mars Postcard Modal */}
            {showPostcard && (
                <MarsPostcard
                    weatherData={selectedSol}
                    onClose={() => setShowPostcard(false)}
                />
            )}
        </div>
    );
};

export default MarsWeather;