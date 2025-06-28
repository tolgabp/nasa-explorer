import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import EarthEvents from './EarthEvents';

// Mock useQuery
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

const mockEventsData = [
  {
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
  },
  {
    id: 'EONET_124',
    title: 'Test Storm',
    description: 'A test storm event',
    categories: [{ id: 'severe-storms', title: 'Severe Storms' }],
    sources: [{ id: 'test-source2', url: 'https://test2.com' }],
    geometry: [{
      date: '2023-01-02T00:00:00Z',
      coordinates: [1, 1]
    }],
    closed: '2023-01-03T00:00:00Z'
  }
];

test('renders EarthEvents page', () => {
  useQuery.mockReturnValue({
    data: mockEventsData,
    isLoading: false,
    error: null
  });
  
  render(<EarthEvents />);
  
  expect(screen.getByText('Earth Events')).toBeInTheDocument();
  expect(screen.getByText('Natural Events Around the World')).toBeInTheDocument();
});

test('displays loading state initially', () => {
  useQuery.mockReturnValue({
    data: null,
    isLoading: true,
    error: null
  });
  
  render(<EarthEvents />);
  
  expect(screen.getByText('Loading Earth events...')).toBeInTheDocument();
});

test('displays error message when API fails', () => {
  useQuery.mockReturnValue({
    data: null,
    isLoading: false,
    error: new Error('API Error')
  });
  
  render(<EarthEvents />);
  
  expect(screen.getByText(/Error loading Earth events/)).toBeInTheDocument();
});

test('displays events when API succeeds', () => {
  useQuery.mockReturnValue({
    data: mockEventsData,
    isLoading: false,
    error: null
  });
  
  render(<EarthEvents />);
  
  expect(screen.getByText('Test Wildfire')).toBeInTheDocument();
  expect(screen.getByText('Test Storm')).toBeInTheDocument();
}); 