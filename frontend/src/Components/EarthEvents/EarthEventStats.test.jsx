import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import EarthEventStats from './EarthEventStats';

const mockEvents = [
  {
    id: '1',
    categories: [{ id: 'wildfires', title: 'Wildfires' }],
    closed: null
  },
  {
    id: '2',
    categories: [{ id: 'wildfires', title: 'Wildfires' }],
    closed: '2023-01-02T00:00:00Z'
  },
  {
    id: '3',
    categories: [{ id: 'severe-storms', title: 'Severe Storms' }],
    closed: null
  }
];

test('renders EarthEventStats with category breakdown', () => {
  render(<EarthEventStats events={mockEvents} />);
  
  expect(screen.getByText('Wildfires')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument(); // Wildfires count
  expect(screen.getByText('Severe Storms')).toBeInTheDocument();
  expect(screen.getByText('1')).toBeInTheDocument(); // Severe Storms count
});

test('handles empty events array', () => {
  render(<EarthEventStats events={[]} />);
  
  // Component should render but with no category cards
  expect(screen.queryByText('Wildfires')).not.toBeInTheDocument();
  expect(screen.queryByText('Severe Storms')).not.toBeInTheDocument();
}); 