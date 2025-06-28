import { getWeatherIcon, getWindAngle } from '../../marsWeatherUtils';

export const WeatherDashboard = ({ weatherData }) => {
    const tempPercent = ((weatherData.maxTemp + 80) / 160) * 100; // Rough Mars temp range

    // Use actual wind degrees if available, otherwise fall back to compass point
    const windAngle = weatherData.windDegrees || getWindAngle(weatherData.windDirection);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Main Weather Card */}
            <div className="md:col-span-2 bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm rounded-xl p-6 border border-orange-500/50">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-2xl font-bold">Sol {weatherData.sol}</h3>
                        <p className="text-gray-300">{weatherData.earthDate}</p>
                        <p className="text-sm text-orange-300">{weatherData.season}</p>
                    </div>
                    <div className="text-6xl">{getWeatherIcon(weatherData.condition)}</div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-end space-x-4">
                        <div>
                            <p className="text-sm text-gray-400">High</p>
                            <p className="text-3xl font-bold text-red-400">{weatherData.maxTemp?.toFixed(1) || 'N/A'}°C</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Low</p>
                            <p className="text-2xl font-semibold text-blue-300">{weatherData.minTemp?.toFixed(1) || 'N/A'}°C</p>
                        </div>
                        {weatherData.avgTemp && (
                            <div>
                                <p className="text-sm text-gray-400">Avg</p>
                                <p className="text-xl font-medium text-gray-200">{weatherData.avgTemp.toFixed(1)}°C</p>
                            </div>
                        )}
                    </div>

                    {/* Temperature Range Bar */}
                    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-400 via-orange-400 to-red-500 rounded-full transition-all duration-500"
                            style={{ width: `${tempPercent}%` }}
                        ></div>
                    </div>

                    <div className="text-center">
                        <span className="text-lg font-medium text-white">{weatherData.condition}</span>
                        {weatherData.weatherDescription && (
                            <p className="text-sm text-gray-400 mt-1">{weatherData.weatherDescription}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Pressure Card */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="text-center">
                    <div className="text-3xl mb-2">🌀</div>
                    <h4 className="text-lg font-semibold text-gray-300 mb-2">Atmospheric Pressure</h4>
                    <p className="text-2xl font-bold text-cyan-400">{weatherData.pressure?.toFixed(1) || 'N/A'}</p>
                    <p className="text-sm text-gray-400">Pascals</p>
                    {weatherData.minPressure && weatherData.maxPressure && (
                        <div className="mt-2 text-xs text-gray-400">
                            <p>Min: {weatherData.minPressure.toFixed(1)} Pa</p>
                            <p>Max: {weatherData.maxPressure.toFixed(1)} Pa</p>
                        </div>
                    )}
                    <div className="mt-4 w-full bg-gray-800 rounded-full h-2">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((weatherData.pressure / 10) * 100, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Wind Card */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="text-center">
                    <div className="text-3xl mb-2">💨</div>
                    <h4 className="text-lg font-semibold text-gray-300 mb-2">Wind Direction</h4>
                    <p className="text-2xl font-bold text-green-400">{weatherData.windSpeed?.toFixed(1) || 'N/A'}</p>
                    <p className="text-sm text-gray-400">m/s {weatherData.windDirection}</p>
                    {weatherData.minWindSpeed && weatherData.maxWindSpeed && (
                        <div className="mt-2 text-xs text-gray-400">
                            <p>Min: {weatherData.minWindSpeed.toFixed(1)} m/s</p>
                            <p>Max: {weatherData.maxWindSpeed.toFixed(1)} m/s</p>
                        </div>
                    )}
                    <div className="mt-4">
                        <div className="w-16 h-16 mx-auto relative">
                            <div className="absolute inset-0 border-2 border-gray-600 rounded-full"></div>
                            <div
                                className="absolute top-1/2 left-1/2 w-1 h-6 bg-green-400 origin-bottom transform -translate-x-1/2 -translate-y-full transition-transform duration-500"
                                style={{
                                    transform: `translate(-50%, -100%) rotate(${windAngle}deg)`
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};