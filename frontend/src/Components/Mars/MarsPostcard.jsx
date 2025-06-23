import { useState, useRef } from 'react';
import { X, Download, Share2 } from 'lucide-react';
import { toast } from '../../Hooks/use-toast';
import { getWeatherIcon } from '../../marsWeatherUtils';
import * as html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const MarsPostcard = ({ weatherData, onClose }) => {
    const [message, setMessage] = useState("Greetings from Mars! The weather today is quite extraordinary...");
    const [recipientName, setRecipientName] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const postcardRef = useRef(null);

    const handleDownload = async () => {
        if (!postcardRef.current) {
            console.error('Postcard ref is null');
            return;
        }
        
        setIsGenerating(true);
        
        try {
            console.log('Starting PDF generation...');
            
            // Show loading toast
            toast({
                title: "Generating Postcard...",
                description: "Creating your Mars postcard PDF...",
            });

            // Small delay to ensure DOM is fully rendered
            await new Promise(resolve => setTimeout(resolve, 100));

            // Capture the postcard content
            console.log('Capturing canvas...');
            const canvas = await html2canvas.default(postcardRef.current, {
                scale: 2, // Higher quality
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#fef3c7', // Light background
                logging: true, // Enable logging for debugging
            });

            console.log('Canvas captured, creating PDF...');

            // Create PDF
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            // Calculate dimensions to fit on A4
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            console.log('Adding image to PDF...');
            
            // Add the image to PDF
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            
            // If image is taller than page, add new page
            if (imgHeight >= pageHeight) {
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, -(pageHeight), imgWidth, imgHeight);
            }

            // Generate filename
            const filename = `mars-postcard-sol-${weatherData.sol}-${new Date().toISOString().split('T')[0]}.pdf`;
            
            console.log('Saving PDF as:', filename);
            
            // Download the PDF
            pdf.save(filename);
            
            toast({
                title: "Postcard Downloaded!",
                description: `Your Mars postcard has been saved as ${filename}`,
            });
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast({
                title: "Download Failed",
                description: `Unable to generate PDF: ${error.message}`,
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Mars Weather Report - Sol ${weatherData.sol}`,
                    text: `Check out today's weather on Mars: ${weatherData.condition}, ${weatherData.maxTemp}°C high, ${weatherData.minTemp}°C low!`,
                    url: window.location.href,
                });
                // Share was successful
                toast({
                    title: "Shared Successfully!",
                    description: "Your Mars weather report has been shared.",
                });
            } catch (error) {
                // Share was canceled or failed - fall back to clipboard
                if (error.name === 'AbortError') {
                    // User canceled the share dialog - this is normal, no need to show error
                    return;
                }
                
                // Other error occurred, fall back to clipboard
                try {
                    await navigator.clipboard.writeText(
                        `Mars Weather Report - Sol ${weatherData.sol}: ${weatherData.condition}, High: ${weatherData.maxTemp}°C, Low: ${weatherData.minTemp}°C`
                    );
                    toast({
                        title: "Copied to Clipboard!",
                        description: "Weather report copied for sharing.",
                    });
                } catch (clipboardError) {
                    toast({
                        title: "Share Failed",
                        description: "Unable to share or copy to clipboard.",
                    });
                }
            }
        } else {
            // Fallback for browsers that don't support navigator.share
            try {
                await navigator.clipboard.writeText(
                    `Mars Weather Report - Sol ${weatherData.sol}: ${weatherData.condition}, High: ${weatherData.maxTemp}°C, Low: ${weatherData.minTemp}°C`
                );
                toast({
                    title: "Copied to Clipboard!",
                    description: "Weather report copied for sharing.",
                });
            } catch (error) {
                toast({
                    title: "Share Failed",
                    description: "Unable to copy to clipboard.",
                });
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Postcard Header */}
                <div className="relative bg-gradient-to-r from-red-600 to-orange-500 p-6 rounded-t-2xl">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-2">📮 Postcard from Mars</h2>
                        <p className="text-orange-100">Sol {weatherData.sol} • {weatherData.earthDate}</p>
                    </div>
                </div>

                {/* Postcard Content - This is what gets captured for PDF */}
                <div 
                    ref={postcardRef}
                    className="p-6 bg-gradient-to-br from-orange-50 to-red-50 text-gray-800"
                    style={{ minHeight: '600px' }}
                >
                    {/* Mars Scene */}
                    <div className="bg-gradient-to-b from-orange-300 via-red-400 to-red-600 rounded-xl p-8 mb-6 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-300 rounded-full"></div>
                            <div className="absolute bottom-6 right-6 w-12 h-6 bg-red-800 rounded-full"></div>
                            <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-orange-700 rounded-full"></div>
                        </div>
                        <div className="relative z-10">
                            <div className="text-8xl mb-4">{getWeatherIcon(weatherData.condition)}</div>
                            <h3 className="text-2xl font-bold text-white mb-2">{weatherData.condition} on Mars</h3>
                            <div className="flex justify-center space-x-8 text-white">
                                <div>
                                    <p className="text-sm opacity-80">High</p>
                                    <p className="text-xl font-bold">{weatherData.maxTemp?.toFixed(1) || 'N/A'}°C</p>
                                </div>
                                <div>
                                    <p className="text-sm opacity-80">Low</p>
                                    <p className="text-xl font-bold">{weatherData.minTemp?.toFixed(1) || 'N/A'}°C</p>
                                </div>
                                <div>
                                    <p className="text-sm opacity-80">Wind</p>
                                    <p className="text-xl font-bold">{weatherData.windSpeed?.toFixed(1) || 'N/A'} m/s</p>
                                </div>
                            </div>
                            {weatherData.weatherDescription && (
                                <p className="text-sm text-white opacity-80 mt-2">{weatherData.weatherDescription}</p>
                            )}
                        </div>
                    </div>

                    {/* Message Section */}
                    <div className="space-y-4 mb-6">
                        <div>
                            <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-2">
                                To:
                            </label>
                            <input
                                id="recipientName"
                                type="text"
                                value={recipientName}
                                onChange={(e) => setRecipientName(e.target.value)}
                                placeholder="Recipient name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="marsMessage" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Message:
                            </label>
                            <textarea
                                id="marsMessage"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                                placeholder="Write your message from Mars..."
                            />
                        </div>
                    </div>

                    {/* Weather Details */}
                    <div className="bg-white/80 rounded-lg p-4 mb-6">
                        <h4 className="font-semibold text-gray-800 mb-2">Mars Weather Details:</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-600">Season:</span>
                                <span className="ml-2 font-medium">{weatherData.season}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Pressure:</span>
                                <span className="ml-2 font-medium">{weatherData.pressure?.toFixed(1) || 'N/A'} Pa</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Wind Direction:</span>
                                <span className="ml-2 font-medium">{weatherData.windDirection}</span>
                            </div>
                            <div>
                                <span className="text-gray-600">Sol:</span>
                                <span className="ml-2 font-medium">{weatherData.sol}</span>
                            </div>
                            {weatherData.avgTemp && (
                                <div>
                                    <span className="text-gray-600">Avg Temp:</span>
                                    <span className="ml-2 font-medium">{weatherData.avgTemp.toFixed(1)}°C</span>
                                </div>
                            )}
                            {weatherData.sampleCount && (
                                <div>
                                    <span className="text-gray-600">Samples:</span>
                                    <span className="ml-2 font-medium">{weatherData.sampleCount.temperature?.toLocaleString() || 0}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-sm text-gray-600 mt-6 pt-4 border-t border-gray-300">
                        <p>Generated from NASA's InSight Mars Lander data</p>
                        <p>Sol {weatherData.sol} • {weatherData.earthDate}</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 bg-gradient-to-r from-red-600 to-orange-500 rounded-b-2xl">
                    <div className="flex space-x-4">
                        <button
                            onClick={handleDownload}
                            disabled={isGenerating}
                            className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download className="w-5 h-5" />
                            <span>{isGenerating ? 'Generating...' : 'Download Postcard'}</span>
                        </button>
                        <button
                            onClick={handleShare}
                            className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                        >
                            <Share2 className="w-5 h-5" />
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};