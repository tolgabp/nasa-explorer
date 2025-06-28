import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import SpaceWeatherCard from './SpaceWeatherCard';

const mockEvent = {
  messageType: 'FLR',
  messageIssueTime: '2023-01-01T12:00:00Z',
  messageBody: 'Test space weather message with solar flare activity',
  messageURL: 'https://test-nasa.gov/space-weather'
};

test('renders SpaceWeatherCard with event data', () => {
  render(<SpaceWeatherCard event={mockEvent} />);
  
  expect(screen.getByText('FLR Event')).toBeInTheDocument();
  expect(screen.getByText('Test space weather message with solar flare activity')).toBeInTheDocument();
});

test('displays event type badge', () => {
  render(<SpaceWeatherCard event={mockEvent} />);
  
  expect(screen.getByText('FLR')).toBeInTheDocument();
});

test('displays formatted date', () => {
  render(<SpaceWeatherCard event={mockEvent} />);
  
  expect(screen.getByText(/Jan 1, 2023/)).toBeInTheDocument();
});

test('displays URL information', () => {
  render(<SpaceWeatherCard event={mockEvent} />);
  
  expect(screen.getByText('URL:')).toBeInTheDocument();
  expect(screen.getByText('https://test-nasa.gov/space-weather')).toBeInTheDocument();
});

test('displays event icon', () => {
  render(<SpaceWeatherCard event={mockEvent} />);
  
  // The icon should be present (🔥 for FLR type)
  expect(screen.getByText('🔥')).toBeInTheDocument();
}); 