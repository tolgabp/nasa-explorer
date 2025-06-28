import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import MarsWeather from './MarsWeather';

// Mock useQuery
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

const mockWeatherData = {
  sol_keys: [1000, 1001],
  validity_checks: {},
  1000: {
    terrestrial_date: '2023-01-01',
    sol: 1000,
    min_temp: -50,
    max_temp: 20,
    pressure: 700,
    wind_speed: 15,
    wind_direction: 'NE',
    atmo_opacity: 'Sunny'
  },
  1001: {
    terrestrial_date: '2023-01-02',
    sol: 1001,
    min_temp: -45,
    max_temp: 25,
    pressure: 720,
    wind_speed: 12,
    wind_direction: 'NW',
    atmo_opacity: 'Cloudy'
  }
};

test('renders MarsWeather page', () => {
  useQuery.mockReturnValue({
    data: mockWeatherData,
    isLoading: false,
    error: null
  });
  
  render(<MarsWeather />);
  
  expect(screen.getByText('Mars Weather')).toBeInTheDocument();
  expect(screen.getByText('Current Conditions on Mars')).toBeInTheDocument();
});

test('displays loading state initially', () => {
  useQuery.mockReturnValue({
    data: null,
    isLoading: true,
    error: null
  });
  
  render(<MarsWeather />);
  
  expect(screen.getByText('Loading Mars weather data...')).toBeInTheDocument();
});

test('displays error message when API fails', () => {
  useQuery.mockReturnValue({
    data: null,
    isLoading: false,
    error: new Error('API Error')
  });
  
  render(<MarsWeather />);
  
  expect(screen.getByText(/Error loading Mars weather data/)).toBeInTheDocument();
});

test('displays weather data when API succeeds', () => {
  useQuery.mockReturnValue({
    data: mockWeatherData,
    isLoading: false,
    error: null
  });
  
  render(<MarsWeather />);
  
  expect(screen.getByText('Sol 1000')).toBeInTheDocument();
  expect(screen.getByText('Sol 1001')).toBeInTheDocument();
}); 