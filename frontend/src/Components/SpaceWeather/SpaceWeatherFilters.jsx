import React from 'react';

const SpaceWeatherFilters = ({ 
    selectedType, 
    onTypeChange, 
    dateRange, 
    onDateRangeChange,
    notificationsData 
}) => {
    // Calculate counts for each event type
    const getEventCount = (type) => {
        if (!notificationsData) return 0;
        
        if (type === 'all') {
            return notificationsData.length;
        } else if (type === 'other') {
            const knownEventTypes = ['CME', 'FLR', 'GST', 'SEP', 'IPS', 'MPC', 'RBE', 'HSS'];
            return notificationsData.filter(event => 
                !knownEventTypes.includes(event.messageType)
            ).length;
        } else {
            return notificationsData.filter(event => 
                event.messageType === type
            ).length;
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Filter Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="eventTypeSelect" className="block text-sm font-semibold text-gray-700 mb-3">
                        Event Type
                    </label>
                    <select
                        id="eventTypeSelect"
                        value={selectedType}
                        onChange={(e) => onTypeChange(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                    >
                        <option value="all">All Events ({getEventCount('all')})</option>
                        <option value="CME">Coronal Mass Ejections ({getEventCount('CME')})</option>
                        <option value="FLR">Solar Flares ({getEventCount('FLR')})</option>
                        <option value="GST">Geomagnetic Storms ({getEventCount('GST')})</option>
                        <option value="SEP">Solar Energetic Particles ({getEventCount('SEP')})</option>
                        <option value="IPS">Interplanetary Shocks ({getEventCount('IPS')})</option>
                        <option value="MPC">Magnetopause Crossings ({getEventCount('MPC')})</option>
                        <option value="RBE">Radiation Belt Enhancements ({getEventCount('RBE')})</option>
                        <option value="HSS">High Speed Streams ({getEventCount('HSS')})</option>
                        <option value="other">Report Events ({getEventCount('other')})</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="dateRangeSelect" className="block text-sm font-semibold text-gray-700 mb-3">
                        Date Range (Days)
                    </label>
                    <select
                        id="dateRangeSelect"
                        value={dateRange}
                        onChange={(e) => onDateRangeChange(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                    >
                        <option value={7}>Last 7 Days</option>
                        <option value={14}>Last 14 Days</option>
                        <option value={30}>Last 30 Days</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SpaceWeatherFilters; 