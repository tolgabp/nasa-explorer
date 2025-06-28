import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

test('renders children when there is no error', () => {
  render(
    <ErrorBoundary>
      <ThrowError shouldThrow={false} />
    </ErrorBoundary>
  );
  
  expect(screen.getByText('No error')).toBeInTheDocument();
});

test('renders error UI when there is an error', () => {
  // Suppress console.error for this test since we expect an error
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
  render(
    <ErrorBoundary>
      <ThrowError shouldThrow={true} />
    </ErrorBoundary>
  );
  
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  expect(screen.getByText(/An unexpected error occurred/)).toBeInTheDocument();
  
  consoleSpy.mockRestore();
}); 