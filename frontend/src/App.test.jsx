import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the pages to avoid API calls during testing
jest.mock('./Pages/APODGallery', () => () => <div>APOD Gallery Page</div>);
jest.mock('./Pages/MarsWeather', () => () => <div>Mars Weather Page</div>);
jest.mock('./Pages/EarthEvents', () => () => <div>Earth Events Page</div>);
jest.mock('./Pages/SpaceWeather', () => () => <div>Space Weather Page</div>);

test('renders App with navigation', () => {
  render(<App />);
  
  // Check if navigation elements are present
  expect(screen.getByText('NASA Explorer')).toBeInTheDocument();
  expect(screen.getByText('APOD')).toBeInTheDocument();
  expect(screen.getByText('Mars Weather')).toBeInTheDocument();
  expect(screen.getByText('Earth Events')).toBeInTheDocument();
  expect(screen.getByText('Space Weather')).toBeInTheDocument();
});

test('renders APOD page by default', () => {
  render(<App />);
  
  expect(screen.getByText('APOD Gallery Page')).toBeInTheDocument();
});

test('displays mobile menu toggle button', () => {
  render(<App />);
  
  // Look for the hamburger menu button (usually has aria-label or specific class)
  const menuButton = screen.getByRole('button', { name: /menu/i });
  expect(menuButton).toBeInTheDocument();
}); 