import React from 'react';

const SpaceWeatherStats = ({ notificationsData }) => {
    // Define all known event types
    const knownEventTypes = ['CME', 'FLR', 'GST', 'SEP', 'IPS', 'MPC', 'RBE', 'HSS'];

    // Calculate counts from the filtered notifications data for all event types
    const eventCounts = {
        CME: notificationsData?.filter(event => event.messageType === 'CME').length || 0,
        FLR: notificationsData?.filter(event => event.messageType === 'FLR').length || 0,
        GST: notificationsData?.filter(event => event.messageType === 'GST').length || 0,
        SEP: notificationsData?.filter(event => event.messageType === 'SEP').length || 0,
        IPS: notificationsData?.filter(event => event.messageType === 'IPS').length || 0,
        MPC: notificationsData?.filter(event => event.messageType === 'MPC').length || 0,
        RBE: notificationsData?.filter(event => event.messageType === 'RBE').length || 0,
        HSS: notificationsData?.filter(event => event.messageType === 'HSS').length || 0,
    };

    // Calculate "Other" events (events with unknown messageType)
    const otherCount = notificationsData?.filter(event =>
        !knownEventTypes.includes(event.messageType)
    ).length || 0;

    // Calculate total from sum of all individual counts
    const calculatedTotal = Object.values(eventCounts).reduce((sum, count) => sum + count, 0) + otherCount;

    const eventTypes = [
        { key: 'CME', name: 'CMEs', icon: '☄️', color: 'from-orange-500 to-red-600' },
        { key: 'FLR', name: 'Solar Flares', icon: '🔥', color: 'from-yellow-500 to-orange-600' },
        { key: 'GST', name: 'Geomagnetic Storms', icon: '⚡', color: 'from-purple-500 to-indigo-600' },
        { key: 'SEP', name: 'Solar Particles', icon: '🌊', color: 'from-blue-500 to-cyan-600' },
        { key: 'IPS', name: 'Interplanetary Shocks', icon: '💥', color: 'from-red-500 to-pink-600' },
        { key: 'MPC', name: 'Magnetopause Crossings', icon: '🔄', color: 'from-green-500 to-teal-600' },
        { key: 'RBE', name: 'Radiation Belt', icon: '☢️', color: 'from-yellow-400 to-orange-500' },
        { key: 'HSS', name: 'High Speed Streams', icon: '💨', color: 'from-indigo-500 to-purple-600' },
    ];

    // Add "Report Event" category if there are unknown event types
    if (otherCount > 0) {
        eventTypes.push({
            key: 'OTHER',
            name: 'Report Event',
            icon: '🌌',
            color: 'from-gray-500 to-gray-600'
        });
    }

    return (
        <div className="mb-8">
            {/* Total Events Card */}
            <div className="mb-6">
                <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-lg font-semibold text-gray-600">Total Space Weather Events</p>
                                <p className="text-4xl font-bold text-gray-900">{calculatedTotal}</p>
                                {otherCount > 0 && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        ({otherCount} report events)
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Type Cards - Compact Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {eventTypes.map((eventType) => (
                    <div key={eventType.key} className="group relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${eventType.color} rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                        <div className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-3 border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="text-center">
                                <div className="text-2xl mb-1 drop-shadow-lg">{eventType.icon}</div>
                                <p className="text-xs font-semibold text-gray-600 mb-1">{eventType.name}</p>
                                <p className="text-lg font-bold text-gray-900">
                                    {eventType.key === 'OTHER' ? otherCount : eventCounts[eventType.key]}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpaceWeatherStats; 