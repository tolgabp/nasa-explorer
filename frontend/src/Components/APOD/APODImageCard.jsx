import React from 'react';

const APODImageCard = ({ image, onImageClick, onShareImage, viewMode, isRandomMode }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className={`bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
            !isRandomMode ? 'max-w-4xl mx-auto' : ''
        }`}>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => onImageClick(image)}
                    className="block w-full p-0 border-0 bg-transparent text-left"
                    aria-label={`View ${image.title}`}
                >
                    <img
                        src={image.url}
                        alt={image.title}
                        className={`w-full object-cover transition-transform duration-300 hover:scale-105 ${
                            viewMode === 'grid' ? 'h-64' : 'h-96'
                        }`}
                        loading="lazy"
                    />
                </button>
                
                <button
                    onClick={() => onShareImage(image)}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                    aria-label="Share image"
                >
                    📤
                </button>
            </div>
            
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {image.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4">
                    {formatDate(image.date)}
                </p>
                
                {image.copyright && (
                    <p className="text-gray-400 text-sm mb-4">
                        © {image.copyright}
                    </p>
                )}
                
                <p className="text-gray-300 text-sm line-clamp-3">
                    {image.explanation}
                </p>
                
                {image.media_type === 'video' && (
                    <div className="mt-4 p-3 bg-purple-500/20 rounded-lg">
                        <p className="text-purple-300 text-sm">
                            🎥 This is a video - click to view
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default APODImageCard; 