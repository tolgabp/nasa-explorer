import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { API_BASE_URL } from '../config/api';
import { EarthEventCard, EarthEventFilters } from '../Components/EarthEvents';

const EarthEvents = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('open');
    const [limit, setLimit] = useState(20);

    // Fetch EONET events
    const { data: eventsData, isLoading: eventsLoading, error: eventsError } = useQuery({
        queryKey: ['eonet-events', selectedCategory, selectedStatus, limit],
        queryFn: async () => {
            const params = new URLSearchParams({
                limit: limit.toString(),
                status: selectedStatus
            });
            
            if (selectedCategory !== 'all') {
                params.append('category', selectedCategory);
            }
            
            const response = await fetch(`${API_BASE_URL}/api/eonet/events?${params}`);
            if (!response.ok) throw new Error('Failed to fetch events');
            return response.json();
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Fetch EONET categories
    const { data: categoriesData } = useQuery({
        queryKey: ['eonet-categories'],
        queryFn: async () => {
            const response = await fetch(`${API_BASE_URL}/api/eonet/categories`);
            if (!response.ok) throw new Error('Failed to fetch categories');
            return response.json();
        },
        staleTime: 60 * 60 * 1000, // 1 hour
    });

    const handleShareEvent = async (event) => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: event.title,
                    text: event.description || 'Check out this Earth event!',
                    url: event.link
                });
            } else {
                await navigator.clipboard.writeText(event.link);
                toast.success('Event link copied to clipboard!');
            }
        } catch (error) {
            toast.error('Failed to share event');
        }
    };

    if (eventsError) {
        toast.error('Failed to load earth events');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-green-200 to-cyan-800">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-green-500 rounded-full mb-6 shadow-lg">
                        <span className="text-4xl">🌍</span>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-700 bg-clip-text text-transparent mb-4">
                        Earth Events Dashboard
                    </h1>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                        Real-time Earth events and natural phenomena from NASA's EONET
                    </p>
                </div>

                {/* Filters */}
                <EarthEventFilters
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                    limit={limit}
                    onLimitChange={setLimit}
                    categoriesData={categoriesData}
                />

                {/* Events Grid */}
                {eventsLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl">🌍</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {eventsData?.events?.map((event) => (
                            <EarthEventCard
                                key={event.id}
                                event={event}
                                onShareEvent={handleShareEvent}
                            />
                        ))}
                    </div>
                )}

                {eventsData?.events?.length === 0 && !eventsLoading && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-green-200 rounded-full mb-6">
                            <span className="text-6xl">🌍</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            No events found
                        </h3>
                        <p className="text-gray-600 text-lg">
                            Try adjusting your filters to see more events.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EarthEvents; 