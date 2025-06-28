import React from 'react';

const APODFilters = ({ 
    isRandomMode, 
    onTodayMode, 
    onRandomMode, 
    count, 
    onCountChange, 
    viewMode, 
    onViewModeChange 
}) => {
    return (
        <>
            {/* Mode Selection */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8">
                <div className="flex justify-center mb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1">
                        <button
                            onClick={onTodayMode}
                            className={`px-6 py-3 rounded-md transition-colors ${
                                !isRandomMode
                                    ? 'bg-purple-600 text-white' 
                                    : 'text-gray-300 hover:text-white'
                            }`}
                        >
                            🌟 Today's Image
                        </button>
                        <button
                            onClick={onRandomMode}
                            className={`px-6 py-3 rounded-md transition-colors ${
                                isRandomMode 
                                    ? 'bg-purple-600 text-white' 
                                    : 'text-gray-300 hover:text-white'
                            }`}
                        >
                            🎲 Random Images
                        </button>
                    </div>
                </div>

                {/* Random mode controls */}
                {isRandomMode && (
                    <div className="text-center">
                        <label htmlFor="randomCountSelect" className="block text-sm font-medium text-gray-200 mb-2">
                            Number of Random Images
                        </label>
                        <select
                            id="randomCountSelect"
                            value={count}
                            onChange={(e) => onCountChange(Number(e.target.value))}
                            className="px-4 py-2 bg-white/20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        >
                            <option value={5}>5 Images</option>
                            <option value={10}>10 Images</option>
                            <option value={20}>20 Images</option>
                            <option value={50}>50 Images</option>
                            <option value={100}>100 Images (Max)</option>
                        </select>
                        <p className="text-sm text-gray-400 mt-2">
                            Get truly random images from NASA's APOD collection
                        </p>
                    </div>
                )}

                {!isRandomMode && (
                    <div className="text-center">
                        <p className="text-sm text-gray-400">
                            Showing today's Astronomy Picture of the Day
                        </p>
                    </div>
                )}
            </div>

            {/* View Mode Toggle - Only show for Random Images */}
            {isRandomMode && (
                <div className="flex justify-center mb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1">
                        <button
                            onClick={() => onViewModeChange('grid')}
                            className={`px-4 py-2 rounded-md transition-colors ${
                                viewMode === 'grid' 
                                    ? 'bg-purple-600 text-white' 
                                    : 'text-gray-300 hover:text-white'
                            }`}
                            title="Grid View"
                        >
                            ⊞
                        </button>
                        <button
                            onClick={() => onViewModeChange('list')}
                            className={`px-4 py-2 rounded-md transition-colors ${
                                viewMode === 'list' 
                                    ? 'bg-purple-600 text-white' 
                                    : 'text-gray-300 hover:text-white'
                            }`}
                            title="List View"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default APODFilters; 