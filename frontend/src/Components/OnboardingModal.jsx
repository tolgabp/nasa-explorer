import React, { useState } from 'react';

const steps = [
  {
    title: "Welcome, Explorer!",
    text: "Ready for your first NASA mission? Let's take a quick tour of the app.",
    emoji: "🚀"
  },
  {
    title: "Mars Weather",
    text: "See the latest weather from Mars, straight from NASA's InSight lander.",
    emoji: "🪐"
  },
  {
    title: "Earth Events",
    text: "Track wildfires, storms, and more happening on Earth in real time.",
    emoji: "🌍"
  },
  {
    title: "Space Weather",
    text: "See what's happening in space—solar flares, geomagnetic storms, and more.",
    emoji: "⚡"
  },
  {
    title: "APOD",
    text: "Enjoy NASA's Astronomy Picture of the Day.",
    emoji: "📸"
  },
  {
    title: "Mission Accomplished!",
    text: "You're ready to explore. Have fun!",
    emoji: "✅"
  }
];

export default function OnboardingModal({ onComplete, variant = 'full' }) {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  if (variant === 'page') {
    return (
      <div className="fixed top-4 right-4 z-50 animate-fade-in">
        <div className="bg-white rounded-xl shadow-xl p-4 max-w-xs text-center relative border border-gray-200">
          {/* Progress Dots */}
          <div className="flex justify-center mb-3 gap-1">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`inline-block w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === step ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`}
                aria-label={i === step ? 'Current step' : undefined}
              />
            ))}
          </div>
          {/* Emoji/Icon */}
          <div className="text-3xl mb-2" aria-hidden="true">{steps[step].emoji}</div>
          {/* Title */}
          <h3 className="text-lg font-bold mb-1 text-gray-900">{steps[step].title}</h3>
          {/* Text */}
          <p className="mb-4 text-gray-700 text-sm">{steps[step].text}</p>
          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              className="text-gray-500 hover:text-gray-700 text-xs px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded"
              onClick={handleSkip}
              tabIndex={0}
            >
              Skip
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-1.5 rounded font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all text-sm"
              onClick={handleNext}
              tabIndex={0}
            >
              {step === steps.length - 1 ? 'Done' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center relative">
        {/* Progress Dots */}
        <div className="flex justify-center mb-4 gap-1">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`inline-block w-2 h-2 rounded-full transition-all duration-200 ${i === step ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`}
              aria-label={i === step ? 'Current step' : undefined}
            />
          ))}
        </div>
        {/* Emoji/Icon */}
        <div className="text-5xl mb-4" aria-hidden="true">{steps[step].emoji}</div>
        {/* Title */}
        <h2 className="text-2xl font-extrabold mb-2 text-gray-900">{steps[step].title}</h2>
        {/* Text */}
        <p className="mb-8 text-gray-700 text-base sm:text-lg">{steps[step].text}</p>
        {/* Buttons */}
        <div className="flex justify-between items-center mt-2">
          <button
            className="text-gray-500 hover:text-gray-700 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            onClick={handleSkip}
            tabIndex={0}
          >
            Skip
          </button>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            onClick={handleNext}
            tabIndex={0}
          >
            {step === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
      {/* Fade-in animation */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
} 