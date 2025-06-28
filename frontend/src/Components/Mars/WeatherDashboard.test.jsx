import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { WeatherDashboard } from './WeatherDashboard';

const mockWeatherData = {
  sol: 1000,
  earthDate: 'Jan 1, 2023',
  season: 'Spring',
  condition: 'Sunny',
  maxTemp: 20,
  minTemp: -50,
  avgTemp: -15,
  pressure: 700,
  windSpeed: 15,
  windDirection: 'NE',
  weatherDescription: 'Clear skies'
};

test('renders WeatherDashboard with weather data', () => {
  render(<WeatherDashboard weatherData={mockWeatherData} />);
  
  expect(screen.getByText('Sol 1000')).toBeInTheDocument();
  expect(screen.getByText('Jan 1, 2023')).toBeInTheDocument();
});

test('displays temperature information', () => {
  render(<WeatherDashboard weatherData={mockWeatherData} />);
  
  expect(screen.getByText('High')).toBeInTheDocument();
  expect(screen.getByText('20.0°C')).toBeInTheDocument();
  expect(screen.getByText('Low')).toBeInTheDocument();
  expect(screen.getByText('-50.0°C')).toBeInTheDocument();
});

test('displays pressure information', () => {
  render(<WeatherDashboard weatherData={mockWeatherData} />);
  
  expect(screen.getByText('Atmospheric Pressure')).toBeInTheDocument();
  expect(screen.getByText('700.0')).toBeInTheDocument();
  expect(screen.getByText('Pascals')).toBeInTheDocument();
});

test('displays wind information', () => {
  render(<WeatherDashboard weatherData={mockWeatherData} />);
  
  expect(screen.getByText('Wind Direction')).toBeInTheDocument();
  expect(screen.getByText('15.0')).toBeInTheDocument();
  expect(screen.getByText('m/s NE')).toBeInTheDocument();
});

test('displays weather condition', () => {
  render(<WeatherDashboard weatherData={mockWeatherData} />);
  
  expect(screen.getByText('Sunny')).toBeInTheDocument();
}); 