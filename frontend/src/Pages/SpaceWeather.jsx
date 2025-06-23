import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config/api';
import { SpaceWeatherCard, SpaceWeatherStats, SpaceWeatherFilters } from '../Components/SpaceWeather';

const SpaceWeather = () => {
    const [selectedType, setSelectedType] = useState('all');
    const [dateRange, setDateRange] = useState(30);

    // Fetch DONKI notifications
    const { data: notificationsData, isLoading: notificationsLoading } = useQuery({
        queryKey: ['donki-notifications', dateRange, selectedType],
        queryFn: async () => {
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - dateRange * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            
            const params = new URLSearchParams({
                startDate,
                endDate,
                type: selectedType
            });
            
            const response = await fetch(`${API_BASE_URL}/api/donki/notifications?${params}`);
            if (!response.ok) throw new Error('Failed to fetch notifications');
            return response.json();
        },
        staleTime: 10 * 60 * 1000, // 10 minutes
    });

    // Fetch CME data
    const { data: cmeData, isLoading: cmeLoading } = useQuery({
        queryKey: ['donki-cme', dateRange],
        queryFn: async () => {
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - dateRange * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            
            const params = new URLSearchParams({
                startDate,
                endDate
            });
            
            const response = await fetch(`${API_BASE_URL}/api/donki/cme?${params}`);
            if (!response.ok) throw new Error('Failed to fetch CME data');
            return response.json();
        },
        staleTime: 10 * 60 * 1000, // 10 minutes
    });

    // Fetch Solar Flares
    const { data: solarFlaresData, isLoading: solarFlaresLoading } = useQuery({
        queryKey: ['donki-solar-flares', dateRange],
        queryFn: async () => {
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - dateRange * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            
            const params = new URLSearchParams({
                startDate,
                endDate
            });
            
            const response = await fetch(`${API_BASE_URL}/api/donki/solar-flares?${params}`);
            if (!response.ok) throw new Error('Failed to fetch solar flares');
            return response.json();
        },
        staleTime: 10 * 60 * 1000, // 10 minutes
    });

    // Fetch Geomagnetic Storms
    const { data: geomagneticStormsData, isLoading: geomagneticStormsLoading } = useQuery({
        queryKey: ['donki-geomagnetic-storms', dateRange],
        queryFn: async () => {
            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - dateRange * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            
            const params = new URLSearchParams({
                startDate,
                endDate
            });
            
            const response = await fetch(`${API_BASE_URL}/api/donki/geomagnetic-storms?${params}`);
            if (!response.ok) throw new Error('Failed to fetch geomagnetic storms');
            return response.json();
        },
        staleTime: 10 * 60 * 1000, // 10 minutes
    });

    const isLoading = notificationsLoading || cmeLoading || solarFlaresLoading || geomagneticStormsLoading;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 via-indigo-300 to-blue-500">
            <div className="w-full px-2 py-6 sm:px-4 sm:py-8 max-w-full mx-auto">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full mb-4 sm:mb-6 shadow-lg">
                        <span className="text-3xl sm:text-4xl">🌌</span>
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
                />

                {/* Statistics Cards */}
                <SpaceWeatherStats
                    cmeData={cmeData}
                    solarFlaresData={solarFlaresData}
                    geomagneticStormsData={geomagneticStormsData}
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
                        {notificationsData?.map((event, index) => (
                            <SpaceWeatherCard
                                key={index}
                                event={event}
                            />
                        ))}
                    </div>
                )}

                {notificationsData?.length === 0 && !isLoading && (
                    <div className="text-center py-12 sm:py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-100 to-indigo-200 rounded-full mb-4 sm:mb-6">
                            <span className="text-4xl sm:text-6xl">🌌</span>
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