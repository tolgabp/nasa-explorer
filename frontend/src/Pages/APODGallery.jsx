import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { API_BASE_URL } from '../config/api';
import { APODImageCard, APODModal, APODFilters } from '../Components/APOD';

const APODGallery = () => {
    const [count, setCount] = useState(10);
    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const [selectedImage, setSelectedImage] = useState(null);
    const [isRandomMode, setIsRandomMode] = useState(false);

    // Fetch APOD data
    const { data: apodData, isLoading, error } = useQuery({
        queryKey: ['apod', count, isRandomMode],
        queryFn: async () => {
            const params = new URLSearchParams();
            
            if (isRandomMode) {
                // Use native APOD random feature
                params.append('count', count.toString());
            } else {
                // Default to today's image
                params.append('count', '1');
            }
            
            const response = await fetch(`${API_BASE_URL}/api/apod?${params}`);
            if (!response.ok) throw new Error('Failed to fetch APOD data');
            return response.json();
        },
        staleTime: 60 * 60 * 1000, // 1 hour
    });

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const handleShareImage = async (image) => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: image.title,
                    text: image.explanation,
                    url: image.hdurl || image.url
                });
            } else {
                await navigator.clipboard.writeText(image.hdurl || image.url);
                toast.success('Image URL copied to clipboard!');
            }
        } catch (error) {
            toast.error('Failed to share image');
        }
    };

    const handleRandomMode = () => {
        setIsRandomMode(true);
        toast.success('Loading random APOD images...');
    };

    const handleTodayMode = () => {
        setIsRandomMode(false);
    };

    if (error) {
        toast.error('Failed to load APOD images');
    }

    // Handle both single objects and arrays
    const images = Array.isArray(apodData) ? apodData : (apodData ? [apodData] : []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        🌌 Astronomy Picture of the Day Gallery
                    </h1>
                    <p className="text-xl text-gray-300">
                        Explore stunning cosmic imagery from NASA's APOD collection
                    </p>
                </div>

                {/* Filters */}
                <APODFilters
                    isRandomMode={isRandomMode}
                    onTodayMode={handleTodayMode}
                    onRandomMode={handleRandomMode}
                    count={count}
                    onCountChange={setCount}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                />

                {/* Images */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
                    </div>
                ) : (
                    <div className={isRandomMode && viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
                        {images?.map((image, index) => (
                            <APODImageCard
                                key={index}
                                image={image}
                                onImageClick={handleImageClick}
                                onShareImage={handleShareImage}
                                viewMode={viewMode}
                                isRandomMode={isRandomMode}
                            />
                        ))}
                    </div>
                )}

                {images?.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🌌</div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            No images found
                        </h3>
                        <p className="text-gray-400">
                            Try adjusting your filters to see more images.
                        </p>
                    </div>
                )}

                {/* Modal */}
                <APODModal
                    image={selectedImage}
                    onClose={handleCloseModal}
                    onShareImage={handleShareImage}
                />
            </div>
        </div>
    );
};

export default APODGallery; 