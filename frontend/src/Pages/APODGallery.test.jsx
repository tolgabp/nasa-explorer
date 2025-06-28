import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import APODGallery from './APODGallery';

// Mock useQuery
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

const mockAPODData = [
  {
    date: '2023-01-01',
    title: 'Test Image 1',
    explanation: 'Test explanation 1',
    url: 'https://test1.jpg',
    media_type: 'image'
  },
  {
    date: '2023-01-02',
    title: 'Test Image 2',
    explanation: 'Test explanation 2',
    url: 'https://test2.jpg',
    media_type: 'image'
  }
];

test('renders APODGallery page', () => {
  useQuery.mockReturnValue({
    data: mockAPODData,
    isLoading: false,
    error: null
  });
  
  render(<APODGallery />);
  
  expect(screen.getByText('Astronomy Picture of the Day')).toBeInTheDocument();
  expect(screen.getByText('Gallery')).toBeInTheDocument();
});

test('displays loading state initially', () => {
  useQuery.mockReturnValue({
    data: null,
    isLoading: true,
    error: null
  });
  
  render(<APODGallery />);
  
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('displays error message when API fails', () => {
  useQuery.mockReturnValue({
    data: null,
    isLoading: false,
    error: new Error('API Error')
  });
  
  render(<APODGallery />);
  
  expect(screen.getByText(/Error loading APOD data/)).toBeInTheDocument();
});

test('displays APOD images when data loads successfully', () => {
  useQuery.mockReturnValue({
    data: mockAPODData,
    isLoading: false,
    error: null
  });
  
  render(<APODGallery />);
  
  expect(screen.getByText('Test Image 1')).toBeInTheDocument();
  expect(screen.getByText('Test Image 2')).toBeInTheDocument();
}); 