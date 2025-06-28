import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEarthWeatherUrl } from '../../config/api';

export const ComparisonWidget = ({ marsData }) => {
    const [userLocation, setUserLocation] = useState(null);

    // Get user's location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    console.log('Geolocation error:', error);
                    // Default to a location if geolocation fails
                    setUserLocation({ lat: 40.7128, lon: -74.0060 }); // New York
                }
            );
        } else {
            // Default to a location if geolocation is not supported
            setUserLocation({ lat: 40.7128, lon: -74.0060 }); // New York
        }
    }, []);

    // Fetch real Earth weather data
    const { data: earthData, isLoading: earthLoading } = useQuery({
        queryKey: ['earthWeather', userLocation],
        queryFn: async () => {
            if (!userLocation) return null;
            
            const response = await fetch(getEarthWeatherUrl(userLocation.lat, userLocation.lon));
            
            if (!response.ok) {
                throw new Error('Failed to fetch Earth weather data');
            }
            
            const data = await response.json();
            return {
                temperature: data.main.temp,
                pressure: data.main.pressure * 100, // Convert hPa to Pa
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                location: data.name || 'Your Location'
            };
        },
        enabled: !!userLocation,
        retry: 3,
        retryDelay: 1000,
        // Fallback to mock data if API fails
        onError: () => {
            console.log('Using fallback Earth weather data');
        }
    });

    // Fallback data if API fails or is not configured
    const fallbackEarthData = {
        temperature: 22,
        pressure: 101300,
        humidity: 65,
        windSpeed: 3.2,
        location: "Your Location"
    };

    const currentEarthData = earthData || fallbackEarthData;

    const ComparisonItem = ({
                                icon,
                                label,
                                earthValue,
                                marsValue,
                                unit,
                                earthColor = "text-green-400",
                                marsColor = "text-orange-400"
                            }) => (
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div className="text-center mb-3">
                <div className="text-2xl mb-1">{icon}</div>
                <h4 className="text-sm font-medium text-gray-300">{label}</h4>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-300">🌍 Earth</span>
                    <span className={`font-bold ${earthColor}`}>
                        {earthLoading ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            `${typeof earthValue === 'number' ? earthValue.toFixed(1) : earthValue}${unit}`
                        )}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-red-300">🔴 Mars</span>
                    <span className={`font-bold ${marsColor}`}>
                        {typeof marsValue === 'number' ? marsValue.toFixed(1) : marsValue}{unit}
                    </span>
                </div>
                <div className="text-xs text-center text-gray-400 mt-2">
                    Δ {Math.abs(earthValue - marsValue).toFixed(1)}{unit}
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-blue-900/20 to-red-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ComparisonItem
                    icon="🌡️"
                    label="Temperature"
                    earthValue={currentEarthData.temperature}
                    marsValue={marsData.maxTemp}
                    unit="°C"
                    earthColor="text-green-400"
                    marsColor="text-red-400"
                />

                <ComparisonItem
                    icon="🌀"
                    label="Pressure"
                    earthValue={currentEarthData.pressure}
                    marsValue={marsData.pressure}
                    unit=" Pa"
                    earthColor="text-blue-400"
                    marsColor="text-cyan-400"
                />

                <ComparisonItem
                    icon="💨"
                    label="Wind Speed"
                    earthValue={currentEarthData.windSpeed}
                    marsValue={marsData.windSpeed}
                    unit=" m/s"
                    earthColor="text-emerald-400"
                    marsColor="text-green-400"
                />

                <ComparisonItem
                    icon="💧"
                    label="Humidity"
                    earthValue={currentEarthData.humidity}
                    marsValue={0.03}
                    unit="%"
                    earthColor="text-sky-400"
                    marsColor="text-yellow-600"
                />
            </div>

            <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
                    Climate Comparison: Earth vs Mars
                </h3>
                <p className="text-sm text-gray-400">
                    {earthLoading ? (
                        "Loading Earth weather data..."
                    ) : (
                        `Mars is currently ${Math.abs(currentEarthData.temperature - marsData.maxTemp).toFixed(0)}°C
                        ${currentEarthData.temperature > marsData.maxTemp ? 'colder' : 'warmer'} than ${currentEarthData.location} on Earth`
                    )}
                </p>
            </div>
        </div>
    );
};