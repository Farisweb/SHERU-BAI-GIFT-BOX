import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Sheru Bai App Crash:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#FFF9F0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: "'Cinzel', Georgia, serif",
          color: '#30251F',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '500px',
            backgroundColor: '#FFFDF9',
            padding: '36px',
            borderRadius: '24px',
            border: '2px solid #C6A15B',
            boxShadow: '0 20px 40px rgba(48,37,31,0.1)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🦁</div>
            <h2 style={{ fontSize: '24px', color: '#681C32', marginBottom: '8px' }}>
              SHERU BAI GIFT BOX
            </h2>
            <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '14px', color: '#5B4A40', marginBottom: '24px' }}>
              Something unexpected occurred while loading the boutique. Please reload the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#681C32',
                color: '#FFF9F0',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '999px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'system-ui, sans-serif'
              }}
            >
              Reload Boutique
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
