import React from 'react';

const categoryColors = {
  Wildfires: 'bg-red-100 text-red-800',
  'Severe Storms': 'bg-blue-100 text-blue-800',
  Volcanoes: 'bg-yellow-100 text-yellow-800',
  Earthquakes: 'bg-purple-100 text-purple-800',
  Drought: 'bg-orange-100 text-orange-800',
  Floods: 'bg-cyan-100 text-cyan-800',
  // Add more as needed
};

export default function EarthEventStats({ events }) {
  if (!Array.isArray(events) || events.length === 0) {
    return null; // Or: return <div className="text-center text-gray-500">No events to summarize.</div>;
  }

  // Count events per category
  const counts = {};
  events.forEach(event => {
    if (Array.isArray(event.categories)) {
      event.categories.forEach(cat => {
        if (cat && cat.title) {
          counts[cat.title] = (counts[cat.title] || 0) + 1;
        }
      });
    }
  });

  if (Object.keys(counts).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-4 my-4">
      {Object.entries(counts).map(([category, count]) => (
        <div
          key={category}
          className={`rounded-lg px-4 py-2 shadow ${categoryColors[category] || 'bg-gray-100 text-gray-800'}`}
        >
          <div className="font-bold text-lg">{category}</div>
          <div className="text-2xl">{count}</div>
        </div>
      ))}
    </div>
  );
} 