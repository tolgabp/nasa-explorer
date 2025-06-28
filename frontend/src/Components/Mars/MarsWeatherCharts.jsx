import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar
} from 'recharts';

// Simple helper functions
const formatValue = (value, unit) => {
    if (value === null || value === undefined) return 'N/A';
    return `${value.toFixed(1)}${unit}`;
};

const getChartData = (weatherData) => {
    return weatherData
        .slice(0, 10)
        .reverse()
        .map(sol => ({
            sol: `Sol ${sol.sol}`,
            maxTemp: sol.maxTemp,
            minTemp: sol.minTemp,
            avgTemp: sol.avgTemp,
            pressure: sol.pressure,
            windSpeed: sol.windSpeed
        }))
        .filter(item => item.maxTemp !== null);
};

const getSummaryStats = (data) => {
    const validData = data.filter(d => d.maxTemp !== null);
    if (validData.length === 0) return {};

    return {
        highestTemp: Math.max(...validData.map(d => d.maxTemp)),
        lowestTemp: Math.min(...validData.map(d => d.minTemp)),
        avgPressure: validData.reduce((sum, d) => sum + (d.pressure || 0), 0) / validData.filter(d => d.pressure).length,
        maxWind: Math.max(...validData.map(d => d.windSpeed || 0))
    };
};

// Simple chart components
const TemperatureChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="sol" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="maxTemp" stroke="#EF4444" strokeWidth={2} name="Max Temp" />
            <Line type="monotone" dataKey="minTemp" stroke="#3B82F6" strokeWidth={2} name="Min Temp" />
            <Line type="monotone" dataKey="avgTemp" stroke="#F59E0B" strokeWidth={2} name="Avg Temp" />
        </LineChart>
    </ResponsiveContainer>
);

const PressureChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="sol" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip />
            <Area type="monotone" dataKey="pressure" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.3} />
        </AreaChart>
    </ResponsiveContainer>
);

const WindChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="sol" stroke="#9CA3AF" fontSize={12} />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip />
            <Bar dataKey="windSpeed" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
);

const StatCard = ({ label, value, unit, color }) => (
    <div className="text-center">
        <p className="text-sm text-gray-400">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>
            {formatValue(value, unit)}
        </p>
    </div>
);

export const MarsWeatherCharts = ({ weatherData }) => {
    const chartData = getChartData(weatherData);
    const stats = getSummaryStats(chartData);

    if (chartData.length === 0) {
        return (
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center">
                <p className="text-gray-400">No weather data available for visualization</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Temperature Chart */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">🌡️ Temperature Trends</h3>
                <TemperatureChart data={chartData} />
            </div>

            {/* Pressure and Wind Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-4">🌀 Atmospheric Pressure</h3>
                    <PressureChart data={chartData} />
                </div>
                <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-4">💨 Wind Speed</h3>
                    <WindChart data={chartData} />
                </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm rounded-xl p-6 border border-orange-500/50">
                <h3 className="text-xl font-semibold text-white mb-4">📊 Weather Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard label="Highest Temp" value={stats.highestTemp} unit="°C" color="text-red-400" />
                    <StatCard label="Lowest Temp" value={stats.lowestTemp} unit="°C" color="text-blue-400" />
                    <StatCard label="Avg Pressure" value={stats.avgPressure} unit=" Pa" color="text-cyan-400" />
                    <StatCard label="Max Wind" value={stats.maxWind} unit=" m/s" color="text-green-400" />
                </div>
            </div>
        </div>
    );
}; 