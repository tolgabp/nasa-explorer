import { getWeatherIcon } from '../../marsWeatherUtils';

export const SolTimeline = ({ weatherData, selectedSol, onSolSelect }) => {
    return (
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-red-900/50">
            <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-gray-800">
                {weatherData.map((sol) => (
                    <div
                        key={sol.sol}
                        onClick={() => onSolSelect(sol)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSolSelect(sol)}
                        className={`
              min-w-[200px] p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105
              ${selectedSol.sol === sol.sol
                            ? 'bg-gradient-to-br from-orange-500/30 to-red-600/30 border-2 border-orange-500 shadow-lg shadow-orange-500/20'
                            : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-orange-500/50'
                        }
            `}
                    >
                        <div className="text-center space-y-2">
                            <div className="text-2xl">{getWeatherIcon(sol.condition)}</div>
                            <div className="font-bold text-lg">Sol {sol.sol}</div>
                            <div className="text-sm text-gray-400">{sol.earthDate}</div>
                            <div className="flex justify-between text-xs">
                                <span className="text-blue-300">{sol.minTemp?.toFixed(0) || 'N/A'}°C</span>
                                <span className="text-red-400">{sol.maxTemp?.toFixed(0) || 'N/A'}°C</span>
                            </div>
                            <div className="text-xs text-gray-300">{sol.condition}</div>
                            <div className="text-xs text-orange-300">
                                {sol.windSpeed?.toFixed(1) || 'N/A'} m/s {sol.windDirection}
                            </div>
                            {sol.sampleCount && (
                                <div className="text-xs text-gray-500">
                                    📊 {sol.sampleCount.temperature?.toLocaleString() || 0} samples
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};