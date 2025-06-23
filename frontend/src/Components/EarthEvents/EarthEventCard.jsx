import React from 'react';

const EarthEventCard = ({ event, onShareEvent }) => {
    const getEventIcon = (categories) => {
        if (!categories || categories.length === 0) return '🌍';
        
        const category = categories[0];
        const iconMap = {
            'wildfires': '🔥',
            'volcanoes': '🌋',
            'severe-storms': '⛈️',
            'floods': '🌊',
            'drought': '🏜️',
            'earthquakes': '🌋',
            'landslides': '🏔️',
            'snow': '❄️',
            'ice': '🧊',
            'temperature-extremes': '🌡️',
            'dust-haze': '🌫️',
            'manmade': '🏭'
        };
        
        return iconMap[category.id] || '🌍';
    };

    const getCategoryColor = (categories) => {
        if (!categories || categories.length === 0) return 'from-blue-400 to-green-500';
        
        const category = categories[0];
        const colorMap = {
            'wildfires': 'from-red-500 to-orange-600',
            'volcanoes': 'from-red-600 to-pink-600',
            'severe-storms': 'from-blue-500 to-indigo-600',
            'floods': 'from-blue-600 to-cyan-600',
            'drought': 'from-yellow-500 to-orange-500',
            'earthquakes': 'from-red-700 to-red-800',
            'landslides': 'from-gray-600 to-gray-700',
            'snow': 'from-blue-300 to-blue-400',
            'ice': 'from-cyan-400 to-blue-500',
            'temperature-extremes': 'from-red-400 to-pink-500',
            'dust-haze': 'from-gray-400 to-gray-500',
            'manmade': 'from-purple-500 to-indigo-600'
        };
        
        return colorMap[category.id] || 'from-blue-400 to-green-500';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="group relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(event.categories)} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/30">
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl drop-shadow-lg">
                            {getEventIcon(event.categories)}
                        </div>
                        <button
                            onClick={() => onShareEvent(event)}
                            className="text-gray-400 hover:text-blue-600 transition-colors duration-200 p-2 hover:bg-blue-50 rounded-full"
                            aria-label="Share event"
                        >
                            📤
                        </button>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                        {event.title}
                    </h3>
                    
                    {event.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {event.description}
                        </p>
                    )}
                    
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center bg-blue-50/70 rounded-lg p-3">
                            <span className="font-semibold text-blue-700">📅 Date:</span>
                            <span className="ml-2 text-gray-700">
                                {formatDate(event.geometries?.[0]?.date || event.date)}
                            </span>
                        </div>
                        
                        {event.categories && event.categories.length > 0 && (
                            <div className="flex items-center bg-green-50/70 rounded-lg p-3">
                                <span className="font-semibold text-green-700">🏷️ Category:</span>
                                <span className="ml-2 text-gray-700">
                                    {event.categories[0].title}
                                </span>
                            </div>
                        )}
                        
                        {event.closed && (
                            <div className="flex items-center bg-orange-50/70 rounded-lg p-3">
                                <span className="font-semibold text-orange-700">🔒 Closed:</span>
                                <span className="ml-2 text-gray-700">
                                    {formatDate(event.closed)}
                                </span>
                            </div>
                        )}
                    </div>
                    
                    {event.geometries && event.geometries.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="text-xs text-gray-500 bg-gray-50/70 rounded-lg p-3">
                                <span className="font-semibold">📍 Location:</span>
                                <span className="ml-2">
                                    {event.geometries[0].coordinates?.[1]?.toFixed(2)}°N, 
                                    {event.geometries[0].coordinates?.[0]?.toFixed(2)}°E
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EarthEventCard; 