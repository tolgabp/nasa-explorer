import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EarthEventCard from './EarthEventCard';

const mockEvent = {
  id: 'EONET_123',
  title: 'Test Wildfire',
  description: 'A test wildfire event',
  categories: [{ id: 'wildfires', title: 'Wildfires' }],
  sources: [{ id: 'test-source', url: 'https://test.com' }],
  geometry: [{
    date: '2023-01-01T00:00:00Z',
    coordinates: [0, 0]
  }],
  closed: null
};

test('renders EarthEventCard with event details', () => {
  render(<EarthEventCard event={mockEvent} />);
  
  expect(screen.getByText('Test Wildfire')).toBeInTheDocument();
  expect(screen.getByText('A test wildfire event')).toBeInTheDocument();
  expect(screen.getByText('Wildfires')).toBeInTheDocument();
});

test('displays closed date when event is closed', () => {
  const closedEvent = { ...mockEvent, closed: '2023-01-02T00:00:00Z' };
  render(<EarthEventCard event={closedEvent} />);
  
  expect(screen.getByText('Jan 2, 2023, 12:00 AM')).toBeInTheDocument();
});

test('displays share button', () => {
  render(<EarthEventCard event={mockEvent} />);
  
  const shareButton = screen.getByRole('button', { name: /share event/i });
  expect(shareButton).toBeInTheDocument();
}); 