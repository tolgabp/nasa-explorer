import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import OnboardingModal from './Components/OnboardingModal';
// Lazy load pages
const MarsWeather = lazy(() => import('./Pages/MarsWeather'));
const EarthEvents = lazy(() => import('./Pages/EarthEvents'));
const SpaceWeather = lazy(() => import('./Pages/SpaceWeather'));
const APODGallery = lazy(() => import('./Pages/APODGallery'));

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 3,
            retryDelay: 1000,
        },
    },
});

const App = () => {
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        const onboardingDone = localStorage.getItem('onboardingComplete');
        if (!onboardingDone) {
            setShowOnboarding(true);
        }
    }, []);

    const handleOnboardingComplete = () => {
        localStorage.setItem('onboardingComplete', 'true');
        setShowOnboarding(false);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black">
                <Navigation />
                {showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} />}
                <Suspense fallback={<div className="flex justify-center items-center min-h-[40vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/mars-weather" element={<MarsWeather />} />
                        <Route path="/earth-events" element={<EarthEvents />} />
                        <Route path="/space-weather" element={<SpaceWeather />} />
                        <Route path="/apod-gallery" element={<APODGallery />} />
                    </Routes>
                </Suspense>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: '#1f2937',
                            color: '#f9fafb',
                            border: '1px solid #374151',
                        },
                    }}
                />
            </div>
        </QueryClientProvider>
    );
};

const Navigation = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const navItems = [
        { path: '/', label: 'Home', icon: '🚀', color: 'from-blue-500 to-indigo-600' },
        { path: '/mars-weather', label: 'Mars Weather', icon: '☄️', color: 'from-orange-500 to-red-600' },
        { path: '/earth-events', label: 'Earth Events', icon: '🌍', color: 'from-green-500 to-teal-600' },
        { path: '/space-weather', label: 'Space Weather', icon: '🌠', color: 'from-purple-500 to-pink-600' },
        { path: '/apod-gallery', label: 'APOD Gallery', icon: '🌌', color: 'from-gray-800 to-black' },
    ];

    return (
        <nav className="bg-black/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-indigo-800 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-200">
                            🛰️
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                                NASA Explorer
                            </h1>
                            <p className="text-xs text-gray-400">Mission Control Center</p>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${isActive(item.path)
                                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                    }`}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            className="text-gray-300 hover:text-white p-2"
                            onClick={() => setIsMenuOpen((open) => !open)}
                            aria-label="Open menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden flex flex-col space-y-2 pb-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.path)
                                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

const HomePage = () => {
    const features = [
        {
            path: '/mars-weather',
            title: 'Mars Weather',
            description: 'Real-time weather data from NASA\'s InSight lander on the Red Planet',
            icon: '☄️',
            color: 'from-orange-500 to-red-600',
            gradient: 'from-orange-500/20 to-red-600/20',
            features: ['Live telemetry', 'Sol timeline', 'Earth comparison', 'Weather postcards']
        },
        {
            path: '/earth-events',
            title: 'Earth Events',
            description: 'Track wildfires, storms, earthquakes, and other natural phenomena',
            icon: '🌍',
            color: 'from-green-500 to-teal-600',
            gradient: 'from-green-500/20 to-teal-600/20',
            features: ['Real-time events', 'Category filtering', 'Interactive maps', 'Event sharing']
        },
        {
            path: '/space-weather',
            title: 'Space Weather',
            description: 'Monitor solar flares, CMEs, and geomagnetic storms from the Sun',
            icon: '🌠',
            color: 'from-purple-500 to-pink-600',
            gradient: 'from-purple-500/20 to-pink-600/20',
            features: ['Solar activity', 'CME tracking', 'Geomagnetic storms', 'Space weather alerts']
        },
        {
            path: '/apod-gallery',
            title: 'APOD Gallery',
            description: 'Stunning cosmic imagery from NASA\'s Astronomy Picture of the Day',
            icon: '🌌',
            color: 'from-gray-800 to-black',
            gradient: 'from-gray-800/20 to-black/20',
            features: ['Daily images', 'Random gallery', 'High resolution', 'Image sharing']
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-20">
                    <div className="text-center space-y-6">
                        <div className="text-6xl mb-6">🚀</div>
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            NASA Explorer Hub
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                            Your mission control center for exploring the universe with real-time NASA data
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>Live Data</span>
                            </div>
                            <span>•</span>
                            <span>Real-time Updates</span>
                            <span>•</span>
                            <span>NASA APIs</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature) => (
                        <Link
                            key={feature.path}
                            to={feature.path}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            <div className="relative p-8">
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`text-4xl p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                                        {feature.icon}
                                    </div>
                                    <div className="text-gray-400 group-hover:text-white transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                                    {feature.description}
                                </p>

                                <div className="space-y-2">
                                    {feature.features.map((feat, index) => (
                                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                                            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 p-8">
                    <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Mission Statistics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400 mb-2">4</div>
                            <div className="text-gray-400">Active Missions</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
                            <div className="text-gray-400">Data Stream</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-2">NASA</div>
                            <div className="text-gray-400">API Sources</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-400 mb-2">Real-time</div>
                            <div className="text-gray-400">Updates</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-800 mt-20">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="text-center text-gray-400">
                        <p>🚀 Powered by NASA APIs • Built for Space Exploration</p>
                        <p className="text-sm mt-2">Mission Control Center • NASA Explorer Hub</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;