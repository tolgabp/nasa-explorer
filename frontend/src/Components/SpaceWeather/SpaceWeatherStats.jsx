import React from 'react';

const SpaceWeatherStats = ({ cmeData, solarFlaresData, geomagneticStormsData, notificationsData }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center">
                        <div className="text-4xl mr-4 drop-shadow-lg">☄️</div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600">CMEs</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {cmeData?.length || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center">
                        <div className="text-4xl mr-4 drop-shadow-lg">🔥</div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600">Solar Flares</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {solarFlaresData?.length || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center">
                        <div className="text-4xl mr-4 drop-shadow-lg">⚡</div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600">Geomagnetic Storms</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {geomagneticStormsData?.length || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center">
                        <div className="text-4xl mr-4 drop-shadow-lg">🌌</div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600">Total Events</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {notificationsData?.length || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpaceWeatherStats; 