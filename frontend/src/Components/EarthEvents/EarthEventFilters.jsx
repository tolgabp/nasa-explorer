import React from 'react';

const EarthEventFilters = ({ 
    selectedCategory, 
    onCategoryChange, 
    selectedStatus, 
    onStatusChange, 
    limit, 
    onLimitChange, 
    categoriesData 
}) => {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/30">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Filter Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label htmlFor="categorySelect" className="block text-sm font-semibold text-gray-700 mb-3">
                        Category
                    </label>
                    <select
                        id="categorySelect"
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/70 backdrop-blur-sm transition-all duration-200"
                    >
                        <option value="all">All Categories</option>
                        {categoriesData?.categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="statusSelect" className="block text-sm font-semibold text-gray-700 mb-3">
                        Status
                    </label>
                    <select
                        id="statusSelect"
                        value={selectedStatus}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/70 backdrop-blur-sm transition-all duration-200"
                    >
                        <option value="open">Open Events</option>
                        <option value="closed">Closed Events</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="limitSelect" className="block text-sm font-semibold text-gray-700 mb-3">
                        Limit
                    </label>
                    <select
                        id="limitSelect"
                        value={limit}
                        onChange={(e) => onLimitChange(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/70 backdrop-blur-sm transition-all duration-200"
                    >
                        <option value={10}>10 Events</option>
                        <option value={20}>20 Events</option>
                        <option value={50}>50 Events</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default EarthEventFilters; 