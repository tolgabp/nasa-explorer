import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import SpaceWeather from './SpaceWeather';

// Mock useQuery
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

const mockSpaceWeatherData = {
  timeTag: '2023-01-01T12:00:00Z',
  message: 'Test space weather message',
  solarWindSpeed: 400,
  solarWindDensity: 5.2,
  bt: 2.1,
  kpIndex: 3,
  dstIndex: -15
};

test('renders SpaceWeather page', () => {
  useQuery.mockReturnValue({
    data: mockSpaceWeatherData,
    isLoading: false,
    error: null
  });
  
  render(<SpaceWeather />);
  
  expect(screen.getByText('Space Weather')).toBeInTheDocument();
  expect(screen.getByText('Solar and Geomagnetic Activity')).toBeInTheDocument();
});

test('displays loading state initially', () => {
  useQuery.mockReturnValue({
    data: null,
    isLoading: true,
    error: null
  });
  
  render(<SpaceWeather />);
  
  expect(screen.getByText('Loading space weather data...')).toBeInTheDocument();
});

test('displays error message when API fails', () => {
  useQuery.mockReturnValue({
    data: null,
    isLoading: false,
    error: new Error('API Error')
  });
  
  render(<SpaceWeather />);
  
  expect(screen.getByText(/Error loading space weather data/)).toBeInTheDocument();
});

test('displays space weather data when API succeeds', () => {
  useQuery.mockReturnValue({
    data: mockSpaceWeatherData,
    isLoading: false,
    error: null
  });
  
  render(<SpaceWeather />);
  
  expect(screen.getByText('Space Weather Report')).toBeInTheDocument();
  expect(screen.getByText('Test space weather message')).toBeInTheDocument();
}); 