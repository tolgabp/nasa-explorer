import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import APODImageCard from './APODImageCard';

const mockImage = {
  url: 'https://apod.nasa.gov/apod/image/1901/IC405_Abolfath_3952.jpg',
  title: 'Flaming Star Nebula',
  date: '2023-01-01',
  explanation: 'A beautiful nebula in the night sky.',
  media_type: 'image',
};

test('renders APODImageCard with image and title', () => {
  render(
    <APODImageCard 
      image={mockImage} 
      onImageClick={() => {}} 
      onShareImage={() => {}} 
      viewMode="grid" 
      isRandomMode={false} 
    />
  );
  // Check image is rendered
  const img = screen.getByAltText(/Flaming Star Nebula/i);
  expect(img).toBeInTheDocument();
  // Check title is rendered
  expect(screen.getByText(/Flaming Star Nebula/i)).toBeInTheDocument();
  // Check explanation is rendered
  expect(screen.getByText(/A beautiful nebula/i)).toBeInTheDocument();
});

test('calls onImageClick when image is clicked', () => {
  const handleImageClick = jest.fn();
  render(
    <APODImageCard 
      image={mockImage} 
      onImageClick={handleImageClick} 
      onShareImage={() => {}} 
      viewMode="grid" 
      isRandomMode={false} 
    />
  );
  fireEvent.click(screen.getByRole('button', { name: /view flaming star nebula/i }));
  expect(handleImageClick).toHaveBeenCalledWith(mockImage);
}); 