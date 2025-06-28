import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config/api';
import { SpaceWeatherCard, SpaceWeatherFilters } from '../Components/SpaceWeather';

const SpaceWeather = () => {
    const [selectedType, setSelectedType] = useState('all');
    const [dateRange, setDateRange] = useState(7);

    // Fetch DONKI notifications
    const { data: notificationsData, isLoading: notificationsLoading } = useQuery({
        queryKey: ['donki-notifications', dateRange, selectedType],
        queryFn: async () => {
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - dateRange * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            
            // Only send type parameter if it's not 'all' or 'other'
            const params = new URLSearchParams({
                startDate,
                endDate
            });
            
            // Add type parameter only if a specific type is selected (not 'all' or 'other')
            if (selectedType !== 'all' && selectedType !== 'other') {
                params.append('type', selectedType);
            }
            
            const response = await fetch(`${API_BASE_URL}/api/donki/notifications?${params}`);
            if (!response.ok) throw new Error('Failed to fetch notifications');
            return response.json();
        },
        staleTime: 10 * 60 * 1000, // 10 minutes
    });

    // Filter data based on selected type
    const filteredData = React.useMemo(() => {
        if (!notificationsData) return [];
        
        // Define known event types inside useMemo to avoid dependency issues
        const knownEventTypes = ['CME', 'FLR', 'GST', 'SEP', 'IPS', 'MPC', 'RBE', 'HSS'];
        
        if (selectedType === 'all') {
            return notificationsData;
        } else if (selectedType === 'other') {
            // Show only unknown event types
            return notificationsData.filter(event => 
                !knownEventTypes.includes(event.messageType)
            );
        } else {
            // Show only the selected event type
            return notificationsData.filter(event => 
                event.messageType === selectedType
            );
        }
    }, [notificationsData, selectedType]);

    const isLoading = notificationsLoading;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 via-indigo-300 to-blue-500">
            <div className="w-full px-2 py-6 sm:px-4 sm:py-8 max-w-full mx-auto">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 via-indigo-300 to-purple-200 rounded-full mb-4 sm:mb-6 shadow-lg">
                        <span className="text-3xl sm:text-4xl">🌠</span>
                    </div>
                    <h1 className="text-2xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent mb-2 sm:mb-4">
                        Space Weather Hub
                    </h1>
                    <p className="text-base sm:text-xl text-gray-700 max-w-2xl mx-auto">
                        Real-time space weather events and solar activity from NASA's DONKI
                    </p>
                </div>

                {/* Filters */}
                <SpaceWeatherFilters
                    selectedType={selectedType}
                    onTypeChange={setSelectedType}
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                    notificationsData={notificationsData}
                />

                {/* Events List */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-purple-200 border-t-purple-600"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl sm:text-2xl">🌌</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 sm:space-y-8">
                        {filteredData?.map((event, index) => (
                            <SpaceWeatherCard
                                key={index}
                                event={event}
                            />
                        ))}
                    </div>
                )}

                {filteredData?.length === 0 && !isLoading && (
                    <div className="text-center py-12 sm:py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-100 to-indigo-200 rounded-full mb-4 sm:mb-6">
                            <span className="text-4xl sm:text-6xl">🤖</span>
                        </div>
                        <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                            No space weather events found
                        </h3>
                        <p className="text-gray-600 text-base sm:text-lg">
                            Try adjusting your filters or date range to see more events.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpaceWeather; 