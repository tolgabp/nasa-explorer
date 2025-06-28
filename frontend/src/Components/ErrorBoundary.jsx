import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // Optionally log error to an external service
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-black text-white">
          <div className="text-6xl mb-4">🚨</div>
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="mb-4">An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.</p>
          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <details className="bg-gray-800 rounded p-4 text-left w-full max-w-xl overflow-auto">
              <summary className="cursor-pointer">Error Details</summary>
              <pre className="text-xs whitespace-pre-wrap">{this.state.error && this.state.error.toString()}</pre>
              <pre className="text-xs whitespace-pre-wrap">{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 