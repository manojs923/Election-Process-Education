import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { describe, it, expect, vi } from 'vitest';
import { LanguageProvider } from '../contexts/LanguageContext';

vi.mock('../utils/demoState', () => ({
  useDemoState: () => [{ phase: 'Pre-Match', isEmergency: false }, vi.fn()],
  getDemoState: vi.fn(),
  demoStateSubscribers: new Set(),
  notifySubscribers: vi.fn(),
  updateDemoState: vi.fn(),
}));

describe('App Component', () => {
  it('renders the header correctly', () => {
    render(
      <LanguageProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </LanguageProvider>
    );
    expect(screen.getByText('Voter Education AI')).toBeInTheDocument();
  });

  it('renders the main navigation links', () => {
    render(
      <LanguageProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </LanguageProvider>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByText('Timeline')).toBeInTheDocument();
  });
});

