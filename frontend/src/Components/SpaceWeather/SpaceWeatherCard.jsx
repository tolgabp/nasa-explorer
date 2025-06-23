import React from 'react';

const SpaceWeatherCard = ({ event }) => {
    const getEventIcon = (type) => {
        const iconMap = {
            'CME': '☄️',
            'FLR': '🔥',
            'GST': '⚡',
            'SEP': '💫',
            'IPS': '🌊',
            'MPC': '🛡️',
            'RBE': '☢️',
            'HSS': '💨'
        };
        return iconMap[type] || '🌌';
    };

    const getSeverityColor = (type, intensity) => {
        if (type === 'FLR' && intensity) {
            if (intensity.includes('X')) return 'text-red-600 bg-red-100 border-red-200';
            if (intensity.includes('M')) return 'text-orange-600 bg-orange-100 border-orange-200';
            if (intensity.includes('C')) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
        }
        if (type === 'GST' && intensity) {
            if (intensity.includes('G5')) return 'text-red-600 bg-red-100 border-red-200';
            if (intensity.includes('G4')) return 'text-orange-600 bg-orange-100 border-orange-200';
            if (intensity.includes('G3')) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
        }
        return 'text-purple-600 bg-purple-100 border-purple-200';
    };

    const getEventTypeColor = (type) => {
        const colorMap = {
            'CME': 'from-orange-500 to-red-600',
            'FLR': 'from-yellow-500 to-orange-600',
            'GST': 'from-purple-500 to-indigo-600',
            'SEP': 'from-blue-500 to-cyan-600',
            'IPS': 'from-indigo-500 to-purple-600',
            'MPC': 'from-gray-500 to-gray-600',
            'RBE': 'from-red-600 to-pink-600',
            'HSS': 'from-cyan-500 to-blue-600'
        };
        return colorMap[type] || 'from-purple-500 to-indigo-600';
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
            <div className={`absolute inset-0 bg-gradient-to-br ${getEventTypeColor(event.messageType)} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
                <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center">
                            <div className="text-4xl mr-6 drop-shadow-lg">
                                {getEventIcon(event.messageType)}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-200">
                                    {event.messageType} Event
                                </h3>
                                <p className="text-lg text-gray-600">
                                    {formatDate(event.messageIssueTime)}
                                </p>
                            </div>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getSeverityColor(event.messageType, event.messageBody)}`}>
                            {event.messageType}
                        </span>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-6 border border-purple-100">
                        <p className="text-gray-800 whitespace-pre-wrap text-lg leading-relaxed">
                            {event.messageBody}
                        </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                        <div className="bg-gray-100/50 rounded-lg px-4 py-2">
                            <span className="font-semibold text-gray-700">ID:</span>
                            <span className="ml-2 text-gray-600">{event.messageID}</span>
                        </div>
                        <div className="bg-gray-100/50 rounded-lg px-4 py-2">
                            <span className="font-semibold text-gray-700">URL:</span>
                            <span className="ml-2 text-gray-600">{event.messageURL}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpaceWeatherCard; 