import React from 'react';

const APODModal = ({ image, onClose, onShareImage }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!image) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                    
                    <button
                        onClick={() => onShareImage(image)}
                        className="absolute top-4 right-16 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                        aria-label="Share image"
                    >
                        📤
                    </button>
                    
                    {image.media_type === 'video' ? (
                        <iframe
                            src={image.url}
                            title={image.title}
                            className="w-full h-96 rounded-t-2xl"
                            frameBorder="0"
                            allowFullScreen
                        />
                    ) : (
                        <img
                            src={image.hdurl || image.url}
                            alt={image.title}
                            className="w-full h-auto rounded-t-2xl"
                        />
                    )}
                </div>
                
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {image.title}
                    </h2>
                    
                    <p className="text-gray-300 text-lg mb-6">
                        {formatDate(image.date)}
                    </p>
                    
                    {image.copyright && (
                        <p className="text-gray-400 text-lg mb-6">
                            © {image.copyright}
                        </p>
                    )}
                    
                    <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                        {image.explanation}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default APODModal; 